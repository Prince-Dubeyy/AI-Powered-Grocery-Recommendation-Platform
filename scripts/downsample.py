import pandas as pd
from pathlib import Path
import os

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_ROOT / "data" / "processed"
SAMPLE_DIR = PROJECT_ROOT / "data_sample"

SAMPLE_DIR.mkdir(parents=True, exist_ok=True)

print("Downsampling data to fit in GitHub (< 50MB)...")

# 1. Products (keep all, it's 1.5MB)
products = pd.read_parquet(DATA_DIR / "products.parquet")
products.to_parquet(SAMPLE_DIR / "products.parquet")
print(f"Products: {len(products)} rows")

# 2. Departments & Aisles (keep all, very small)
pd.read_parquet(DATA_DIR / "departments.parquet").to_parquet(SAMPLE_DIR / "departments.parquet")
pd.read_parquet(DATA_DIR / "aisles.parquet").to_parquet(SAMPLE_DIR / "aisles.parquet")

# 3. Orders (Sample 100,000 orders to save space)
orders = pd.read_parquet(DATA_DIR / "orders.parquet")
orders_sample = orders.sample(n=100000, random_state=42)
orders_sample.to_parquet(SAMPLE_DIR / "orders.parquet")
print(f"Orders: {len(orders_sample)} rows")

# 4. Order Products (Only keep products for the sampled orders)
order_products = pd.read_parquet(DATA_DIR / "order_products.parquet")
order_products_sample = order_products[order_products['order_id'].isin(orders_sample['order_id'])]
order_products_sample.to_parquet(SAMPLE_DIR / "order_products.parquet")
print(f"Order Products: {len(order_products_sample)} rows")

print("Downsampling complete. Data is saved in 'data_sample/'")
