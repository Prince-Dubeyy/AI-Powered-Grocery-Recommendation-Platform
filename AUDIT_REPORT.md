# AUDIT_REPORT.md

## 1. Current Folder Structure
- `backend/`: FastAPI application (`main.py`, `config.py`, `core/` modules).
- `frontend/`: React + Vite application (`src/pages/`, `src/components/`, `tailwind.config.js`).
- `notebooks/`: Jupyter notebooks for data science workflows.
- `data/`: Processed data in parquet format.
- `archive/`: Raw CSV data.
- `docs/`: Markdown documentation.

## 2. Backend Architecture
- Framework: FastAPI
- Configuration: Environment variables via `.env` and `config.py`.
- Core Modules: `ai_assistant.py`, `data_processing.py`, `market_basket.py`, `recommendation.py`.
- Data Access: Synchronous Pandas reads from Parquet files on demand.

## 3. Frontend Architecture
- Framework: React 19 + Vite.
- Styling: Tailwind CSS.
- Routing: React Router.
- State Management: React Hooks (`useState`, `useEffect`).
- API Client: Axios instance pointing to `localhost:8000`.

## 4. Existing Recommendation System
- **Market Basket:** Uses Apriori association rules stored in `association_rules.parquet`.
- **Item-based:** Naive implementation. Currently just matches `aisle_id` and returns other items in the same aisle, ignoring true similarity.
- **User-based:** Naive implementation. Finds user's most frequent past items, then queries the Market Basket rules. Lacks true Collaborative Filtering.

## 5. Existing Gemini Integration
- Configured in `backend/core/ai_assistant.py` using `google.genai`.
- Uses `gemini-2.0-flash` model.
- Includes prompts for Explanation and Assistant generation.

## 6. Existing Analytics Implementation
- Basic KPIs available via `GET /analytics` (total orders, total customers, reorder rate, avg basket size).
- Dashboard frontend currently uses hardcoded mock data for the charts (e.g., Orders by Hour).

## 7. Existing API Inventory
- `GET /` - Root
- `GET /analytics` - Basic KPIs
- `POST /recommend/product` - Market Basket
- `POST /recommend/user` - Naive User Recs
- `POST /recommend/similar` - Naive Aisle Matching
- `POST /ai/explain` - Gemini Explanation
- `POST /ai/assistant` - Gemini Assistant

## 8. Existing Notebooks
- `01_Dataset_Discovery.ipynb`
- `02_Data_Understanding_and_EDA.ipynb`
- `03_Recommendation_Models.ipynb`

## 9. Existing Security Configuration
- CORS: `allow_origins=["*"]` (Insecure).
- Exceptions: Lacks centralized exception handlers to suppress stack traces.
- Validation: Basic Pydantic models, but lacking extensive validation.

## 10. Existing Performance Bottlenecks
- `load_data()` in `recommendation.py` loads massive Parquet files synchronously into memory.
- Lack of sparse matrices (e.g., `scipy.sparse`) for computations.
- Recommendation calculations involve heavy Pandas filtering during the request lifecycle, which blocks the event loop.

---

## CLASSIFICATION

### Working
- **Gemini Integration:** Successfully connects to Google API.
- **Frontend Architecture:** Clean React structure, components, and routing.
- **Basic Analytics:** KPIs are functioning.

### Partially Working
- **Recommendation System:** Market basket works, but User and Item similarity are naive placeholders.
- **Performance:** Works on small data, but will quickly OOM or timeout on 8GB RAM with full Instacart dataset.

### Missing
- **True Collaborative Filtering:** Missing `backend/recommendation/collaborative_filtering.py`.
- **True Item-based Recommender:** Missing `backend/recommendation/item_similarity.py`.
- **Advanced Analytics APIs:** `/orders-by-hour`, `/orders-by-day`, `/top-products`, `/top-departments`.
- **Product Search API:** Missing `GET /products`.
- **Notebooks:** Missing `04_Reorder_Analysis`, `05_Time_Analysis`, `08_Recommendation_Evaluation`.
- **Security:** Environment-based CORS, safe error responses.

### Broken
- **Frontend Dashboard Charts:** Hardcoded, not connected to backend data.
- **Scalability:** Current Pandas-in-memory approach is broken for millions of rows on a student laptop.
