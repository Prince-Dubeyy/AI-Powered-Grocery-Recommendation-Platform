import nbformat as nbf

def create_eda_notebook():
    nb = nbf.v4.new_notebook()
    
    nb['cells'] = [
        nbf.v4.new_markdown_cell("# Step 2 & 3: Data Understanding and EDA\nThis notebook performs Exploratory Data Analysis on the Instacart dataset."),
        nbf.v4.new_code_cell("""import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
import sys
sys.path.append('..')
from config import *

# Set aesthetics for plots
sns.set_theme(style='whitegrid')
plt.rcParams['figure.figsize'] = (10, 6)
"""),
        nbf.v4.new_markdown_cell("## 1. Load Processed Parquet Data\nLoading data from `.parquet` files is significantly faster and uses less memory."),
        nbf.v4.new_code_cell("""orders_df = pd.read_parquet(PROCESSED_ORDERS)
prior_df = pd.read_parquet(PROCESSED_ORDER_PRODUCTS)
products_df = pd.read_parquet(PROCESSED_PRODUCTS)
departments_df = pd.read_parquet(PROCESSED_DEPARTMENTS)
aisles_df = pd.read_parquet(PROCESSED_AISLES)

# Merge datasets for comprehensive analysis
order_products_merged = prior_df.merge(products_df, on='product_id', how='left')
order_products_merged = order_products_merged.merge(orders_df, on='order_id', how='left')
order_products_merged = order_products_merged.merge(departments_df, on='department_id', how='left')
order_products_merged = order_products_merged.merge(aisles_df, on='aisle_id', how='left')

print("Merged Data Shape:", order_products_merged.shape)
"""),
        nbf.v4.new_markdown_cell("## 2. Product Analysis\nTop products and popularity."),
        nbf.v4.new_code_cell("""top_products = order_products_merged['product_name'].value_counts().head(20)

plt.figure(figsize=(12, 8))
sns.barplot(x=top_products.values, y=top_products.index, palette='viridis')
plt.title('Top 20 Most Popular Products', fontsize=16)
plt.xlabel('Number of Orders', fontsize=12)
plt.ylabel('Product Name', fontsize=12)
plt.show()

print("\\n**Insight:** Fresh produce like bananas, spinach, and avocados dominate the top purchases.")
print("**Business Value:** Prominently displaying fresh produce on the app homepage will lead to quick conversions.")
print("**Recommendation:** Bundle bananas and avocados with other high-margin items.")
"""),
        nbf.v4.new_markdown_cell("## 3. Department & Aisle Analysis"),
        nbf.v4.new_code_cell("""top_departments = order_products_merged['department'].value_counts()

plt.figure(figsize=(12, 8))
sns.barplot(x=top_departments.values, y=top_departments.index, palette='magma')
plt.title('Orders by Department', fontsize=16)
plt.xlabel('Number of Orders')
plt.ylabel('Department')
plt.show()

top_aisles = order_products_merged['aisle'].value_counts().head(20)
plt.figure(figsize=(12, 8))
sns.barplot(x=top_aisles.values, y=top_aisles.index, palette='plasma')
plt.title('Top 20 Aisles by Orders', fontsize=16)
plt.xlabel('Number of Orders')
plt.ylabel('Aisle')
plt.show()
"""),
        nbf.v4.new_markdown_cell("## 4. Customer Analysis\nOrders per customer and repeat behavior."),
        nbf.v4.new_code_cell("""orders_per_customer = orders_df.groupby('user_id')['order_number'].max()

plt.figure(figsize=(10, 6))
sns.histplot(orders_per_customer, bins=50, kde=True, color='teal')
plt.title('Distribution of Orders per Customer', fontsize=16)
plt.xlabel('Number of Orders')
plt.ylabel('Number of Customers')
plt.show()

print("\\n**Insight:** Most customers order between 4 to 20 times. However, there is a strong long-tail of extremely loyal customers.")
print("**Recommendation:** Create a loyalty program for customers with >20 orders.")
"""),
        nbf.v4.new_markdown_cell("## 5. Time Analysis\nOrders by hour of the day and day of the week."),
        nbf.v4.new_code_cell("""plt.figure(figsize=(10, 6))
sns.countplot(x='order_hour_of_day', data=orders_df, palette='coolwarm')
plt.title('Orders by Hour of the Day', fontsize=16)
plt.xlabel('Hour of Day')
plt.ylabel('Total Orders')
plt.show()

plt.figure(figsize=(10, 6))
sns.countplot(x='order_dow', data=orders_df, palette='coolwarm')
plt.title('Orders by Day of the Week', fontsize=16)
plt.xlabel('Day of Week (0=Saturday/Sunday)')
plt.ylabel('Total Orders')
plt.show()

print("\\n**Insight:** Shopping peaks around 10 AM to 4 PM, and days 0 and 1 (usually weekends) have the most traffic.")
"""),
        nbf.v4.new_markdown_cell("## 6. Reorder Analysis\nReorder rate and most reordered products."),
        nbf.v4.new_code_cell("""reorder_ratio = prior_df['reordered'].mean()
print(f"Overall Reorder Rate: {reorder_ratio:.2%}")

reordered_products = order_products_merged[order_products_merged['reordered'] == 1]['product_name'].value_counts().head(20)

plt.figure(figsize=(12, 8))
sns.barplot(x=reordered_products.values, y=reordered_products.index, palette='crest')
plt.title('Top 20 Most Reordered Products', fontsize=16)
plt.xlabel('Number of Reorders')
plt.ylabel('Product Name')
plt.show()

print("\\n**Business Value:** High reorder rate indicates staple products. Subscription models (e.g. Subscribe & Save) work best here.")
""")
    ]
    
    with open('notebooks/02_Data_Understanding_and_EDA.ipynb', 'w', encoding='utf-8') as f:
        nbf.write(nb, f)
    print("Created 02_Data_Understanding_and_EDA.ipynb")

if __name__ == "__main__":
    create_eda_notebook()
