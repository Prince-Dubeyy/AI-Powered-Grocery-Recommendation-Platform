import pandas as pd
import numpy as np
from mlxtend.frequent_patterns import apriori, association_rules
import logging
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import *

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def perform_market_basket_analysis():
    """
    Performs Market Basket Analysis using the Apriori algorithm.
    Saves the resulting association rules to a parquet file.
    """
    logger.info("Loading order products for Market Basket Analysis...")
    
    # Load products map
    products_df = pd.read_parquet(PROCESSED_PRODUCTS)
    product_map = dict(zip(products_df['product_id'], products_df['product_name']))
    
    # Load order products (prior)
    # To avoid memory issues and long computation time on local machines, 
    # we will sample the dataset for Market Basket Analysis.
    # We select top 50,000 orders
    
    prior_df = pd.read_parquet(PROCESSED_ORDER_PRODUCTS)
    sampled_order_ids = prior_df['order_id'].drop_duplicates().sample(n=50000, random_state=42)
    basket_df = prior_df[prior_df['order_id'].isin(sampled_order_ids)]
    
    logger.info("Creating basket matrix...")
    
    # Group by order_id and product_id
    # We want a matrix where rows are orders and columns are product IDs
    # Since there are 50k products, we filter to top 1000 most frequent products to keep matrix size manageable
    top_products = basket_df['product_id'].value_counts().head(1000).index
    basket_df = basket_df[basket_df['product_id'].isin(top_products)]
    
    basket = basket_df.groupby(['order_id', 'product_id'])['add_to_cart_order'] \
        .count().unstack().reset_index().fillna(0).set_index('order_id')
    
    # Convert values to 0 or 1
    def encode_units(x):
        if x <= 0: return 0
        if x >= 1: return 1
        
    basket_sets = basket.map(encode_units)
    
    logger.info("Running Apriori Algorithm...")
    # Generate frequent itemsets
    frequent_itemsets = apriori(basket_sets, min_support=0.01, use_colnames=True)
    
    if frequent_itemsets.empty:
        logger.warning("No frequent itemsets found with min_support=0.01. Lowering min_support to 0.005.")
        frequent_itemsets = apriori(basket_sets, min_support=0.005, use_colnames=True)
    
    logger.info("Generating Association Rules...")
    # Generate rules
    rules = association_rules(frequent_itemsets, metric="lift", min_threshold=1.0)
    
    # Map product IDs back to Names
    def get_product_names(frozen_set_ids):
        return [product_map.get(pid, 'Unknown') for pid in frozen_set_ids]
    
    rules['antecedents_names'] = rules['antecedents'].apply(get_product_names)
    rules['consequents_names'] = rules['consequents'].apply(get_product_names)
    
    # Convert frozen sets to lists for saving
    rules['antecedents'] = rules['antecedents'].apply(list)
    rules['consequents'] = rules['consequents'].apply(list)
    
    logger.info(f"Found {len(rules)} association rules.")
    
    # Save rules
    rules_path = PROCESSED_DATA_DIR / "association_rules.parquet"
    # Parquet cannot handle mixed objects easily, so converting lists to string representation for storage
    rules_to_save = rules.copy()
    rules_to_save['antecedents'] = rules_to_save['antecedents'].astype(str)
    rules_to_save['consequents'] = rules_to_save['consequents'].astype(str)
    rules_to_save['antecedents_names'] = rules_to_save['antecedents_names'].astype(str)
    rules_to_save['consequents_names'] = rules_to_save['consequents_names'].astype(str)
    
    rules_to_save.to_parquet(rules_path, engine='fastparquet')
    logger.info(f"Association rules saved to {rules_path}")

if __name__ == "__main__":
    perform_market_basket_analysis()
