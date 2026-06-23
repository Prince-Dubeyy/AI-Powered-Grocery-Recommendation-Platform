import pandas as pd
import numpy as np
import logging
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import *

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def optimize_dtypes(df):
    """
    Optimizes data types of a pandas DataFrame to reduce memory usage.
    """
    initial_mem = df.memory_usage(deep=True).sum() / 1024**2
    
    for col in df.columns:
        if pd.api.types.is_numeric_dtype(df[col]):
            c_min = df[col].min()
            c_max = df[col].max()
            if pd.api.types.is_integer_dtype(df[col]):
                if c_min > np.iinfo(np.int8).min and c_max < np.iinfo(np.int8).max:
                    df[col] = df[col].astype(np.int8)
                elif c_min > np.iinfo(np.int16).min and c_max < np.iinfo(np.int16).max:
                    df[col] = df[col].astype(np.int16)
                elif c_min > np.iinfo(np.int32).min and c_max < np.iinfo(np.int32).max:
                    df[col] = df[col].astype(np.int32)
                elif c_min > np.iinfo(np.int64).min and c_max < np.iinfo(np.int64).max:
                    df[col] = df[col].astype(np.int64)  
            elif pd.api.types.is_float_dtype(df[col]):
                if c_min > np.finfo(np.float16).min and c_max < np.finfo(np.float16).max:
                    df[col] = df[col].astype(np.float16)
                elif c_min > np.finfo(np.float32).min and c_max < np.finfo(np.float32).max:
                    df[col] = df[col].astype(np.float32)
                else:
                    df[col] = df[col].astype(np.float64)
        elif pd.api.types.is_object_dtype(df[col]) or pd.api.types.is_string_dtype(df[col]):
            # Convert object columns with low unique counts to category
            num_unique_values = len(df[col].unique())
            num_total_values = len(df[col])
            if num_unique_values / num_total_values < 0.5:
                df[col] = df[col].astype('category')
                
    final_mem = df.memory_usage(deep=True).sum() / 1024**2
    logger.info(f"Memory decreased from {initial_mem:.2f} MB to {final_mem:.2f} MB ({(100*(initial_mem-final_mem)/initial_mem):.1f}% reduction)")
    return df

def process_and_save_data():
    """
    Loads raw CSV data, optimizes dtypes, handles missing values/duplicates, and saves as Parquet.
    """
    logger.info("Starting data processing pipeline...")
    
    # 1. Departments
    logger.info("Processing Departments...")
    dept_df = pd.read_csv(RAW_DEPARTMENTS)
    dept_df.drop_duplicates(inplace=True)
    dept_df = optimize_dtypes(dept_df)
    dept_df.to_parquet(PROCESSED_DEPARTMENTS, engine='fastparquet')
    
    # 2. Aisles
    logger.info("Processing Aisles...")
    aisles_df = pd.read_csv(RAW_AISLES)
    aisles_df.drop_duplicates(inplace=True)
    aisles_df = optimize_dtypes(aisles_df)
    aisles_df.to_parquet(PROCESSED_AISLES, engine='fastparquet')
    
    # 3. Products
    logger.info("Processing Products...")
    products_df = pd.read_csv(RAW_PRODUCTS)
    products_df.drop_duplicates(inplace=True)
    # Fill any missing product names with 'Unknown'
    products_df['product_name'] = products_df['product_name'].fillna('Unknown')
    products_df = optimize_dtypes(products_df)
    products_df.to_parquet(PROCESSED_PRODUCTS, engine='fastparquet')
    
    # 4. Orders
    logger.info("Processing Orders...")
    orders_df = pd.read_csv(RAW_ORDERS)
    orders_df.drop_duplicates(inplace=True)
    # Handle missing values in 'days_since_prior_order' (first order of a user has NaN)
    # Since it's meaningful (first order), we will fill it with 0 or a special value (-1), let's use 0 for now
    orders_df['days_since_prior_order'] = orders_df['days_since_prior_order'].fillna(0)
    orders_df = optimize_dtypes(orders_df)
    orders_df.to_parquet(PROCESSED_ORDERS, engine='fastparquet')
    
    # 5. Order Products
    logger.info("Processing Order Products (Prior)... This might take a while.")
    # For large datasets, reading directly and optimizing memory
    # You might want to consider downsampling if running on very low RAM (e.g. 8GB), but optimize_dtypes handles it well.
    try:
        order_products_df = pd.read_csv(RAW_ORDER_PRODUCTS_PRIOR)
        order_products_df.drop_duplicates(inplace=True)
        order_products_df = optimize_dtypes(order_products_df)
        order_products_df.to_parquet(PROCESSED_ORDER_PRODUCTS, engine='fastparquet')
    except MemoryError:
        logger.warning("MemoryError encountered on entire Order Products file. Processing in chunks.")
        # Fallback to chunking
        chunk_size = 5000000
        first_chunk = True
        for chunk in pd.read_csv(RAW_ORDER_PRODUCTS_PRIOR, chunksize=chunk_size):
            chunk = optimize_dtypes(chunk)
            chunk.to_parquet(PROCESSED_ORDER_PRODUCTS, engine='fastparquet', append=not first_chunk)
            first_chunk = False
            
    logger.info("Data processing completed successfully. Parquet files saved to data/processed/")

if __name__ == "__main__":
    process_and_save_data()
