import nbformat as nbf

def create_rec_notebook():
    nb = nbf.v4.new_notebook()
    
    nb['cells'] = [
        nbf.v4.new_markdown_cell("# Steps 5, 6, 7, 8: Recommendation Engines Sandbox\nTest the outputs of our Market Basket and Collaborative Filtering engines."),
        nbf.v4.new_code_cell("""import sys
sys.path.append('..')
from src.recommendation import recommend_products, recommend_similar_products, recommend_for_user
"""),
        nbf.v4.new_markdown_cell("## 1. Product Recommendations (Market Basket Analysis)\nRecommend items frequently bought together based on Association Rules."),
        nbf.v4.new_code_cell("""target_product = "Organic Hass Avocado"
print(f"Top products frequently bought with '{target_product}':")
print(recommend_products(target_product, top_n=5))
"""),
        nbf.v4.new_markdown_cell("## 2. Similar Products (Item-Based)\nRecommend products from the same aisle to help customers discover variations."),
        nbf.v4.new_code_cell("""target_product = "Organic Hass Avocado"
print(f"Products similar to '{target_product}':")
print(recommend_similar_products(target_product, top_n=5))
"""),
        nbf.v4.new_markdown_cell("## 3. User Recommendations (User-Based)\nAnalyze a user's past purchases and recommend what they should buy next."),
        nbf.v4.new_code_cell("""user_id = 1
print(f"Personalized recommendations for User ID {user_id}:")
print(recommend_for_user(user_id, top_n=5))
""")
    ]
    
    with open('notebooks/03_Recommendation_Models.ipynb', 'w', encoding='utf-8') as f:
        nbf.write(nb, f)
    print("Created 03_Recommendation_Models.ipynb")

if __name__ == "__main__":
    create_rec_notebook()
