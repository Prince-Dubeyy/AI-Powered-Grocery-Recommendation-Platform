from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import uvicorn
import logging
from typing import List
import os

from config import *
from core.recommendation import recommend_products, recommend_for_user, recommend_similar_products
from core.ai_assistant import explain_recommendation, generate_grocery_basket

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Instacart API", description="API for Grocery Recommendations and Analytics")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ai-powered-grocery-recommendation-p-snowy.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ProductRequest(BaseModel):
    product_name: str

class UserRequest(BaseModel):
    user_id: int

class AIExplanationRequest(BaseModel):
    target_product: str
    recommended_products: List[str]

class AIBasketRequest(BaseModel):
    basket_type: str

# Endpoints

@app.get("/")
def read_root():
    return {"message": "Welcome to the Instacart AI Recommendation API"}

@app.get("/analytics")
def get_analytics():
    try:
        # Load orders and calculate basic KPIs
        orders_df = pd.read_parquet(PROCESSED_ORDERS)
        prior_df = pd.read_parquet(PROCESSED_ORDER_PRODUCTS)
        products_df = pd.read_parquet(PROCESSED_PRODUCTS)
        
        total_orders = int(orders_df['order_id'].nunique())
        total_customers = int(orders_df['user_id'].nunique())
        total_products = int(products_df['product_id'].nunique())
        
        reorder_rate = float(prior_df['reordered'].mean())
        avg_basket_size = float(prior_df.groupby('order_id')['add_to_cart_order'].max().mean())
        
        return {
            "total_orders": total_orders,
            "total_customers": total_customers,
            "total_products": total_products,
            "reorder_rate": reorder_rate,
            "avg_basket_size": avg_basket_size
        }
    except Exception as e:
        logger.error(f"Error fetching analytics: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommend/product")
def get_product_recommendation(req: ProductRequest):
    try:
        recs = recommend_products(req.product_name, top_n=10)
        return {"recommendations": recs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommend/user")
def get_user_recommendation(req: UserRequest):
    try:
        recs = recommend_for_user(req.user_id, top_n=10)
        return {"recommendations": recs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommend/similar")
def get_similar_products(req: ProductRequest):
    try:
        recs = recommend_similar_products(req.product_name, top_n=10)
        return {"recommendations": recs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ai/explain")
def get_ai_explanation(req: AIExplanationRequest):
    try:
        explanation = explain_recommendation(req.target_product, req.recommended_products)
        return {"explanation": explanation}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ai/assistant")
def get_ai_assistant(req: AIBasketRequest):
    try:
        basket = generate_grocery_basket(req.basket_type)
        return {"basket": basket}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
