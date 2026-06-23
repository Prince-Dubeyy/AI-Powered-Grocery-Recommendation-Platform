import os
from pathlib import Path

# Project root directory
PROJECT_ROOT = Path(__file__).resolve().parent.parent

# Data directories
DATA_DIR = PROJECT_ROOT / "data"
RAW_DATA_DIR = PROJECT_ROOT / "archive" # the original unzipped archive
PROCESSED_DATA_DIR = DATA_DIR / "artifacts"

# Ensure directories exist
PROCESSED_DATA_DIR.mkdir(parents=True, exist_ok=True)

# File paths
RAW_PRODUCTS = RAW_DATA_DIR / "products.csv"
RAW_ORDERS = RAW_DATA_DIR / "orders.csv"
RAW_ORDER_PRODUCTS_PRIOR = RAW_DATA_DIR / "order_products__prior.csv"
RAW_AISLES = RAW_DATA_DIR / "aisles.csv"
RAW_DEPARTMENTS = RAW_DATA_DIR / "departments.csv"

# Processed paths
PROCESSED_PRODUCTS = PROCESSED_DATA_DIR / "products.parquet"
PROCESSED_ORDERS = PROCESSED_DATA_DIR / "orders.parquet"
PROCESSED_ORDER_PRODUCTS = PROCESSED_DATA_DIR / "order_products.parquet"
PROCESSED_AISLES = PROCESSED_DATA_DIR / "aisles.parquet"
PROCESSED_DEPARTMENTS = PROCESSED_DATA_DIR / "departments.parquet"
DATASET_INFO = PROCESSED_DATA_DIR / "dataset_info.json"
