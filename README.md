# 🩺 AI-Powered Disease Prediction System

This repository documents the evolution of a robust disease prediction system, starting from traditional ML with XGBoost to advanced neural networks and a hybrid deep learning model combining structured data and natural language understanding.

---

## 📊 Models Overview

### 🔰 1. XGBoost Model (Baseline)

- **Files:** `model_xgboost_v3.joblib`, `label_encoder_xgboost_v3.joblib`
- **Input:** Structured binary symptom indicators (0/1).
- **Technique:** Feature selection + XGBoost classification.
- **Accuracy:** ~75%
- **Limitation:** Required exact symptom matches; not flexible for natural language inputs.

---

### 🧠 2. Neural Network with SBERT

- **Files:** `disease_predictor_nn.h5`, `label_encoder_nn.json`
- **Input:** Natural language sentences like “burning in chest”, “head spinning”.
- **Technique:** 
  - Sentence embeddings using `all-MiniLM-L6-v2` from `sentence-transformers`.
  - Feedforward Keras model trained on these embeddings.
- **Advantage:** Accepts free-text input and handles synonyms/misspellings via embeddings.
- **Limitation:** Ignores structured 0/1 binary symptoms from the dataset.

---

### 🔗 3. Hybrid Model (Structured + SBERT)

- **Files:** `hybrid_nn_disease_predictor.h5`, `label_encoder_hybrid.joblib`
- **Input:** Both binary symptom indicators and sentence embeddings.
- **Technique:**
  - Combined binary features and SBERT embeddings into one vector.
  - Trained a deep neural network for classification.
- **Strength:** Best of both worlds—structured accuracy + NLP flexibility.
- **Use Case:** Handles precise inputs *and* user-reported symptoms robustly.

---
![Screenshot 2025-06-20 040132](https://github.com/user-attachments/assets/f448376e-d4c2-416e-89ed-6e948db415fe)
![Screenshot 2025-06-20 040151](https://github.com/user-attachments/assets/fd04da7e-693a-4929-a411-8ba90abfcd7f)

![Screenshot 2025-06-20 040224](https://github.com/user-attachments/assets/315f17ca-15aa-40f3-86b0-1ab58c304b66)

![Screenshot 2025-06-20 040302](https://github.com/user-attachments/assets/00e97acc-628f-4c88-9c87-7dca85e9566a)
![Screenshot 2025-06-19 072114](https://github.com/user-attachments/assets/227abe6a-9f3a-4a79-994b-34422b6040df)
![Screenshot 2025-06-20 020301](https://github.com/user-attachments/assets/d0863eaa-ddb0-4863-9edb-44bac854d9d9)
