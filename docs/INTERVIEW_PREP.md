# Interview Preparation Guide

This document contains expected questions you might face during an interview when showcasing this portfolio project.

## General Data Science & ML Questions
**Q: How did you handle the sheer size of the Instacart dataset (~3M orders)?**
**A:** I implemented memory optimization techniques in Pandas. By downcasting 64-bit integers to 16/32-bit where applicable, and converting low-cardinality object strings to categorical types, I reduced the memory footprint by over 70%. Furthermore, I serialized the cleaned data into `.parquet` files which compress better and load exponentially faster than standard CSVs.

**Q: What is Market Basket Analysis?**
**A:** Market Basket Analysis is a data mining technique used by retailers to discover associations between items. It looks for combinations of items that occur together frequently in transactions.

## Recommendation Systems & Apriori Algorithm
**Q: Can you explain Support, Confidence, and Lift?**
**A:** 
- **Support:** The fraction of total transactions that contain both items A and B. It tells us how popular an itemset is.
- **Confidence:** Out of all transactions containing item A, what fraction also contained item B? It measures the reliability of the inference A => B.
- **Lift:** The ratio of the observed support to that expected if A and B were independent. A lift > 1 means A and B are bought together more frequently than would be expected by chance.

## Full-Stack & System Architecture
**Q: Why did you separate the frontend (React) and backend (FastAPI)?**
**A:** Decoupling the frontend from the backend provides a scalable, service-oriented architecture. React handles complex UI states efficiently on the client side, while FastAPI provides high-throughput API endpoints for the heavy Python machine learning processes.

**Q: How does the application communicate with the ML models?**
**A:** The frontend uses `Axios` to send RESTful HTTP POST requests with JSON payloads to the FastAPI backend. The backend processes the request using Pandas and the Apriori rules, then returns a JSON array of recommendations.

## Generative AI & Gemini API
**Q: Why incorporate Generative AI into a recommendation engine?**
**A:** Traditional recommendation engines are often "black boxes." By passing the output of the ML model into the Gemini API, I created an "Explainer" that gives users semantic reasoning for the recommendation (e.g., "Bananas and yogurt are bought together for breakfast prep"). This increases user trust and engagement.
