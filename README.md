# CartMind AI: Smart Grocery Recommendation Platform 🛒🧠

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python)
![Gemini](https://img.shields.io/badge/Google_Gemini-2.0-orange?style=for-the-badge&logo=google)

CartMind AI is an intelligent, full-stack grocery recommendation and market basket analysis platform. Powered by **FastAPI**, **React**, and **Google's Gemini 2.0 AI**, this platform leverages real Instacart dataset patterns to generate highly relevant product associations, collaborative filtering recommendations, and dynamically generated AI shopping baskets.

## 🌟 Key Features

* **Market Basket Analysis**: Advanced association rules mining (Apriori) to discover frequent itemsets and generate "Frequently Bought Together" recommendations.
* **Collaborative Filtering** (In Progress): User-item matrix factorization to provide personalized recommendations based on historical purchase data.
* **Item-Based Similarity**: Smart product matching based on departmental and aisle-level categorization.
* **Generative AI Assistant**: Integrated with Google Gemini 2.0 to dynamically explain recommendations and generate specialized grocery baskets (e.g., Healthy, Budget, High Protein).
* **Interactive Dashboard**: Modern, responsive React dashboard visualizing real-time analytical KPIs (Reorder rates, Basket sizes).

## 🚀 Architecture

The application is split into two primary layers:
1. **Frontend**: A React 19 application built with Vite and Tailwind CSS.
2. **Backend**: A high-performance FastAPI server utilizing Pandas, NumPy, and Scikit-Learn for data processing, and `google-genai` for LLM interactions.

## 🛠️ Tech Stack

* **Frontend:** React, TypeScript, Tailwind CSS, Vite, Lucide Icons, Axios.
* **Backend:** FastAPI, Python, Pandas, Uvicorn, Google GenAI SDK.
* **Data Processing:** Jupyter Notebooks, Parquet storage format for memory-efficient loading.

## ⚙️ Quick Start

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:
```env
GEMINI_API_KEY="your_google_ai_studio_key"
```

Start the server:
```bash
python main.py
```

### 2. Frontend Setup
Open a new terminal and navigate to the frontend:
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to view the application!

## 📊 Data Source
This project utilizes the publicly available **Instacart Market Basket Analysis** dataset, encompassing millions of grocery orders to derive realistic and practical recommendation models.

---
*Developed by [Prince Dubey](https://github.com/Prince-Dubeyy).*
