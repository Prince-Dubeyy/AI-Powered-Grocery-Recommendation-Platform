# System Architecture & Technical Documentation

## 1. Project Architecture Overview

This platform uses a modern decoupled architecture to process raw data, train/calculate rules, and serve them via a REST API to a separate frontend.

### Data Tier
- **Storage**: Raw data is stored in `CSV` formats. To optimize memory footprint, datasets are compressed and stored in `.parquet` format using `fastparquet`.
- **Pre-processing Engine**: Pandas is used to automatically shrink integer floats (e.g., `int64` to `int16`) reducing total RAM requirements by >70%.

### Backend Tier (FastAPI)
- **REST API**: Python-based `FastAPI` framework handles incoming HTTP requests from the client.
- **Market Basket Engine**: Utilizes the Apriori algorithm from the `mlxtend` package. It calculates Support, Confidence, and Lift for combinations of items in shopping carts to extract frequent itemsets.
- **Collaborative Filtering**: Simulates user-based and item-based similarities.
- **Generative AI Engine**: Interacts with the `Google Gemini 1.5 Flash` API to provide semantic explanations of recommendations and create grocery lists.

### Presentation Tier (React + Vite)
- **UI Framework**: A Single Page Application (SPA) built with `React` and `TypeScript`.
- **Routing**: `react-router-dom` is used for client-side routing.
- **Styling**: `Tailwind CSS` provides utility-first, responsive, and modern aesthetics.
- **Visualizations**: `Recharts` is used to build dynamic interactive dashboards.

## 2. Workflow Diagram

1. **Ingestion**: Read `products.csv`, `orders.csv`, etc.
2. **ETL (Extract, Transform, Load)**: `core/data_processing.py` optimizes data types and writes `data/processed/*.parquet`.
3. **Training**: `core/market_basket.py` runs Apriori on top 50,000 orders to generate association rules and writes `association_rules.parquet`.
4. **Serving**: The `FastAPI` server loads Parquet files into memory. 
5. **Client**: The `React` frontend makes `axios` requests to the FastAPI endpoints (`/recommend/product`, `/ai/explain`, etc.) and renders the response on the screen.

## 3. Business Impact
- **Increased AOV (Average Order Value)**: Recommending complementary products immediately influences the user's basket size.
- **Improved Customer Retention**: Personalized user-based recommendations streamline reordering processes, enhancing User Experience (UX).
- **Reduced Bounce Rates**: Generative AI suggestions give the platform a modern, premium feel that encourages users to interact with features longer.
