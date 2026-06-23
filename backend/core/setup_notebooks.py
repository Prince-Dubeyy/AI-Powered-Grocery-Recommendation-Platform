import nbformat as nbf
from pathlib import Path

def create_discovery_notebook():
    nb = nbf.v4.new_notebook()
    
    nb['cells'] = [
        nbf.v4.new_markdown_cell("# Step 1: Dataset Discovery\nAutomatically inspect products, orders, prior orders, aisles, and departments."),
        nbf.v4.new_code_cell("""import pandas as pd
import numpy as np
import sys
import os
sys.path.append('..')
from config import *

def analyze_df(name, path):
    print(f"--- Analyzing {name} ---")
    df = pd.read_csv(path)
    print(f"Shape: {df.shape}")
    print("\\nData Types:\\n", df.dtypes)
    print("\\nMissing Values:\\n", df.isnull().sum())
    print("\\nDuplicate Rows:", df.duplicated().sum())
    print(f"\\nMemory Usage: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
    print("\\nSample:\\n", df.head())
    print("\\n" + "="*50 + "\\n")
    return df
"""),
        nbf.v4.new_code_cell("""# 1. Departments
dept_df = analyze_df("Departments", RAW_DEPARTMENTS)"""),
        nbf.v4.new_code_cell("""# 2. Aisles
aisles_df = analyze_df("Aisles", RAW_AISLES)"""),
        nbf.v4.new_code_cell("""# 3. Products
products_df = analyze_df("Products", RAW_PRODUCTS)"""),
        nbf.v4.new_code_cell("""# 4. Orders
orders_df = analyze_df("Orders", RAW_ORDERS)"""),
        nbf.v4.new_code_cell("""# 5. Order Products (Prior) - NOTE: This is a large file.
# Using chunking or specifying dtypes might be needed later, but for discovery we will load a sample if it's too big, or just load it entirely if we have enough RAM.
try:
    prior_df = analyze_df("Order Products Prior", RAW_ORDER_PRODUCTS_PRIOR)
except MemoryError:
    print("Memory Error: Loading only a chunk")
    prior_df = pd.read_csv(RAW_ORDER_PRODUCTS_PRIOR, nrows=100000)
    print(f"Loaded a sample of 100,000 rows. Memory Usage: {prior_df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
"""),
        nbf.v4.new_markdown_cell("""## Data Dictionary & ER Diagram Explanation
- **departments.csv**: `department_id` (PK), `department` (Name)
- **aisles.csv**: `aisle_id` (PK), `aisle` (Name)
- **products.csv**: `product_id` (PK), `product_name`, `aisle_id` (FK), `department_id` (FK)
- **orders.csv**: `order_id` (PK), `user_id`, `eval_set`, `order_number`, `order_dow`, `order_hour_of_day`, `days_since_prior_order`
- **order_products__prior.csv**: Composite PK (`order_id`, `product_id`), `add_to_cart_order`, `reordered`
""")
    ]
    
    with open('notebooks/01_Dataset_Discovery.ipynb', 'w', encoding='utf-8') as f:
        nbf.write(nb, f)
    print("Created 01_Dataset_Discovery.ipynb")

if __name__ == "__main__":
    create_discovery_notebook()
