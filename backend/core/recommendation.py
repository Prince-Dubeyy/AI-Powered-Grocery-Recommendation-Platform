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
_user_top_products = None

def load_data():
    global _rules, _products, _user_top_products
    if _rules is None:
        try:
            _rules = pd.read_parquet(PROCESSED_DATA_DIR / "association_rules.parquet")
        except:
            _rules = pd.DataFrame()
            
    if _products is None:
        _products = pd.read_parquet(PROCESSED_PRODUCTS)
        
    if _user_top_products is None:
        try:
            _user_top_products = pd.read_parquet(PROCESSED_DATA_DIR / "user_top_products.parquet")
            _user_top_products.set_index('user_id', inplace=True)
        except Exception as e:
            logger.error(f"Could not load user_top_products: {e}")
            _user_top_products = pd.DataFrame()

def recommend_products(product_name, top_n=5):
    """
    Market Basket recommendations (Frequently Bought Together).
    """
    load_data()
    if _rules.empty:
        raise ValueError("No rules generated yet.")
        
    matching_rules = _rules[_rules['antecedents_names'].str.contains(product_name, case=False, na=False)]
    
    if matching_rules.empty:
        raise ValueError(f"No frequent associations found for '{product_name}'.")
        
    matching_rules = matching_rules.sort_values(by=['lift', 'confidence'], ascending=[False, False])
    
    recommendations = set()
    for row in matching_rules['consequents_names'].head(10):
        clean_str = row.replace("[", "").replace("]", "").replace("'", "")
        items = [i.strip() for i in clean_str.split(",")]
        for item in items:
            if item.lower() != product_name.lower():
                recommendations.add(item)
                
    return list(recommendations)[:top_n]

def recommend_similar_products(product_name, top_n=5):
    """
    Item-based Recommendation: Similar products based on Department and Aisle.
    """
    load_data()
    
    prod_match = _products[_products['product_name'].str.contains(product_name, case=False, na=False)]
    if prod_match.empty:
        raise ValueError(f"Product '{product_name}' not found.")
        
    prod = prod_match.iloc[0]
    aisle_id = prod['aisle_id']
    
    similar_prods = _products[
        (_products['aisle_id'] == aisle_id) & 
        (_products['product_id'] != prod['product_id'])
    ]
    return similar_prods['product_name'].head(top_n).tolist()

def recommend_for_user(user_id, top_n=5):
    """
    User-based Recommendation: O(1) lookup of top products, then map to association rules.
    """
    load_data()
    
    if _user_top_products.empty or user_id not in _user_top_products.index:
        raise ValueError(f"User '{user_id}' not found or has no history in the model.")
        
    top_user_product_ids = _user_top_products.loc[user_id, 'top_products']
    if not isinstance(top_user_product_ids, list) and not isinstance(top_user_product_ids, np.ndarray):
        top_user_product_ids = [top_user_product_ids]
        
    top_user_products = _products[_products['product_id'].isin(top_user_product_ids)]['product_name'].tolist()
    
    recommendations = set()
    
    for product in top_user_products:
        try:
            recs = recommend_products(product, top_n=2)
            for r in recs:
                recommendations.add(r)
        except ValueError:
            pass
                
    if not recommendations:
        for product in top_user_products:
            try:
                recs = recommend_similar_products(product, top_n=2)
                for r in recs:
                    recommendations.add(r)
            except ValueError:
                pass
                
    if not recommendations:
        raise ValueError(f"Could not generate recommendations for user '{user_id}'.")
        
    return list(recommendations)[:top_n]
