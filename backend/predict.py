# 📚 Imports
import numpy as np
import pandas as pd
import torch
import joblib
from transformers import AutoTokenizer, AutoModel
from tensorflow.keras.models import load_model
from fuzzywuzzy import process

# 🧠 Load SBERT
model_name = "sentence-transformers/all-MiniLM-L6-v2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
sbert_model = AutoModel.from_pretrained(model_name)

def sentence_to_embedding(text):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    with torch.no_grad():
        output = sbert_model(**inputs).last_hidden_state.mean(dim=1)
    return output.squeeze().numpy()

# 📦 Load trained model & encoder
model = load_model("models/hybrid_nn_disease_predictor.h5")
label_encoder = joblib.load("models/label_encoder_hybrid.joblib")

# 📖 Load precautions
precautions_df = pd.read_csv("data\precautions.csv")

# 🧪 Final prediction function
def predict_disease(text):
    emb = sentence_to_embedding(text).reshape(1, -1)

    # 🧠 Match embedding to expected shape
    expected_dim = model.input_shape[1]  # e.g., 761
    structured_dim = 10
    sbert_dim = emb.shape[1]

    if structured_dim + sbert_dim > expected_dim:
        emb = emb[:, :expected_dim - structured_dim]  # Truncate SBERT
    elif structured_dim + sbert_dim < expected_dim:
        pad_width = expected_dim - structured_dim - sbert_dim
        emb = np.pad(emb, ((0, 0), (0, pad_width)), mode='constant')

    structured_input = np.zeros((1, structured_dim))
    full_input = np.concatenate([structured_input, emb], axis=1)

    probs = model.predict(full_input)[0]
    top_indices = probs.argsort()[-3:][::-1]
    top_preds = [(label_encoder.inverse_transform([i])[0], float(probs[i])) for i in top_indices]
    top_disease = top_preds[0][0]

    # 🩺 Precaution match
    match = process.extractOne(top_disease, precautions_df["Disease"], score_cutoff=60)
    if match:
        row = precautions_df[precautions_df["Disease"] == match[0]]
        precautions = row.iloc[0, 1:].dropna().tolist()
    else:
        precautions = ["No specific precautions found."]

    return {
        "Predicted Disease": top_disease,
        "Confidence": float(probs[top_indices[0]]),
        "Top Predictions": top_preds,
        "Precautions": precautions
    }

# 🔍 Example
# print(predict_disease("not feeling thirsty"))
