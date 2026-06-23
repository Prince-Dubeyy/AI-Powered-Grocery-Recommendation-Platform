# 🛒 AI-Powered Grocery Recommendation Platform

An end-to-end AI-powered grocery recommendation system built using **FastAPI**, **React**, **TypeScript**, **Machine Learning**, **Association Rule Mining**, **Collaborative Filtering**, and **Google Gemini AI**.

The platform analyzes real grocery purchase patterns from the Instacart dataset and generates intelligent product recommendations, personalized suggestions, product similarity insights, and AI-generated explanations.

## 🚀 Live Demo

### Frontend

https://ai-powered-grocery-recommendation-p-snowy.vercel.app/

### Backend API

https://ai-powered-grocery-recommendation.onrender.com

### API Documentation

https://ai-powered-grocery-recommendation.onrender.com/docs

---

# 📌 Features

### 📊 Analytics Dashboard

* Dataset statistics
* User analytics
* Product analytics
* Order analytics
* Real-time visualizations

### 🛍 Product Recommendations

Uses Association Rule Mining (Apriori Algorithm) to recommend products frequently purchased together.

Example:

Bread → Butter, Jam

Milk → Cereal

### 👤 Personalized Recommendations

Uses Collaborative Filtering to generate user-specific recommendations based on historical purchasing behavior.

### 🔍 Similar Product Discovery

Finds products with similar purchase patterns using recommendation models.

### 🤖 AI Recommendation Explainer

Powered by Google Gemini AI.

Explains:

* Why a product was recommended
* Purchase pattern insights
* Shopping behavior interpretation

### 💬 AI Shopping Assistant

Conversational AI assistant capable of:

* Grocery planning
* Product suggestions
* Shopping guidance
* Recommendation explanations

---

# 🧠 Machine Learning Components

## Association Rule Mining

Implemented using:

* Apriori Algorithm
* Frequent Itemsets
* Confidence
* Lift
* Support

Used for:

* Product Recommendations
* Cross-Selling Insights

---

## Collaborative Filtering

Used for:

* Personalized User Recommendations

Techniques:

* User-Item Matrix
* Similarity Computation
* Recommendation Ranking

---

# 📂 Dataset

This project uses the Instacart Market Basket Analysis Dataset.

Dataset contains:

* 200,000+ Users
* 50,000+ Products
* Millions of Purchase Records

Files utilized:

* orders.csv
* products.csv
* aisles.csv
* departments.csv
* order_products__prior.csv
* order_products__train.csv

---

# 🏗 Architecture

Frontend (React + TypeScript)
⬇
REST API Calls
⬇
FastAPI Backend
⬇
ML Recommendation Engine
⬇
Instacart Dataset + Trained Models
⬇
Gemini AI Integration

---

# 🛠 Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* Recharts

## Backend

* FastAPI
* Python
* Pandas
* NumPy
* Scikit-Learn

## AI

* Google Gemini API

## Machine Learning

* Apriori
* Association Rules
* Collaborative Filtering

## Deployment

### Frontend

* Vercel

### Backend

* Render

---

# 📸 Application Modules

### Dashboard

Displays key grocery analytics and dataset insights.

### Product Recommendations

Recommends products frequently purchased together.

### User Recommendations

Personalized recommendations using collaborative filtering.

### Similar Products

Discovers related grocery items.

### AI Explainer

Explains recommendation logic using Gemini.

### AI Assistant

Interactive grocery assistant powered by Generative AI.

---

# 🔌 API Endpoints

## Analytics

GET /analytics

Returns platform analytics and dataset statistics.

---

## Product Recommendation

POST /recommend/product

Generate recommendations for a product.

---

## User Recommendation

POST /recommend/user

Generate personalized recommendations.

---

## Similar Products

POST /recommend/similar

Find similar grocery products.

---

## AI Explain

POST /ai/explain

Generate recommendation explanations.

---

## AI Assistant

POST /ai/assistant

Interact with the grocery AI assistant.

---

# 📈 Real-World Applications

* E-Commerce Recommendations
* Grocery Retail Analytics
* Customer Personalization
* Cross-Selling Systems
* Recommendation Engines
* AI-Powered Shopping Assistants

---

# 🔮 Future Improvements

* Hybrid Recommendation Systems
* Deep Learning Recommendations
* Vector Search
* Real-Time Recommendation Pipeline
* User Authentication
* Shopping Cart Integration
* Recommendation Feedback Loop
* MLOps Monitoring

---

# 👨‍💻 Author

Prince Dubey

BSc Data Science & Cyber Security

GitHub:
https://github.com/Prince-Dubeyy

Email:
[princeekjmar@gmail.com](mailto:princeekjmar@gmail.com)

---

# ⭐ Support

If you found this project useful:

⭐ Star the repository

🍴 Fork the project

📢 Share feedback and suggestions

