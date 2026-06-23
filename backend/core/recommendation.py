import pandas as pd
import numpy as np
import logging
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import *

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Cache for loaded data
_rules = None
_products = None
_orders = None
_prior = None

def load_data():
    global _rules, _products, _orders, _prior
    if _rules is None:
        try:
            _rules = pd.read_parquet(PROCESSED_DATA_DIR / "association_rules.parquet")
        except:
            _rules = pd.DataFrame()
            
    if _products is None:
        _products = pd.read_parquet(PROCESSED_PRODUCTS)
        
    if _orders is None:
        _orders = pd.read_parquet(PROCESSED_ORDERS)
        
    if _prior is None:
        _prior = pd.read_parquet(PROCESSED_ORDER_PRODUCTS)

def recommend_products(product_name, top_n=5):
    """
    Market Basket recommendations (Frequently Bought Together).
    """
    load_data()
    if _rules.empty:
        return ["No rules generated yet."]
        
    # Search for product in antecedents_names
    # Convert string representation of lists back to actual string search
    matching_rules = _rules[_rules['antecedents_names'].str.contains(product_name, case=False, na=False)]
    
    if matching_rules.empty:
        return [f"No frequent associations found for '{product_name}'."]
        
    # Sort by lift and confidence
    matching_rules = matching_rules.sort_values(by=['lift', 'confidence'], ascending=[False, False])
    
    recommendations = set()
    for row in matching_rules['consequents_names'].head(10):
        # Clean the string like "['Organic Banana', 'Milk']"
        clean_str = row.replace("[", "").replace("]", "").replace("'", "")
        items = [i.strip() for i in clean_str.split(",")]
        for item in items:
            if item.lower() != product_name.lower():
                recommendations.add(item)
                
    return list(recommendations)[:top_n]

def recommend_similar_products(product_name, top_n=5):
    """
    Item-based Recommendation: Similar products based on Department and Aisle.
    (Content-based fallback to avoid massive matrix operations)
    """
    load_data()
    
    # Find product details
    prod_match = _products[_products['product_name'].str.contains(product_name, case=False, na=False)]
    
    if prod_match.empty:
        return [f"Product '{product_name}' not found."]
        
    prod = prod_match.iloc[0]
    dept_id = prod['department_id']
    aisle_id = prod['aisle_id']
    
    # Find other products in the same aisle
    similar_prods = _products[
        (_products['aisle_id'] == aisle_id) & 
        (_products['product_id'] != prod['product_id'])
    ]
    
    # Sort by popularity (we calculate global popularity if we can, or just random)
    # Since we don't have popularity cached here instantly, we'll return the first N
    return similar_prods['product_name'].head(top_n).tolist()

def recommend_for_user(user_id, top_n=5):
    """
    User-based Recommendation: Find what user bought, then recommend associated products.
    """
    load_data()
    
    user_orders = _orders[_orders['user_id'] == user_id]
    if user_orders.empty:
        return [f"User '{user_id}' not found or has no orders."]
        
    user_order_ids = user_orders['order_id'].tolist()
    user_basket = _prior[_prior['order_id'].isin(user_order_ids)]
    
    if user_basket.empty:
        return [f"User '{user_id}' has no prior order details."]
        
    # Get top products bought by user
    top_user_product_ids = user_basket['product_id'].value_counts().head(3).index.tolist()
    top_user_products = _products[_products['product_id'].isin(top_user_product_ids)]['product_name'].tolist()
    
    recommendations = set()
    
    # Use association rules to recommend items based on top purchases
    for product in top_user_products:
        recs = recommend_products(product, top_n=2)
        if recs and not recs[0].startswith("No "):
            for r in recs:
                recommendations.add(r)
                
    if not recommendations:
        # Fallback to similar products
        for product in top_user_products:
            recs = recommend_similar_products(product, top_n=2)
            for r in recs:
                recommendations.add(r)
                
    return list(recommendations)[:top_n]
