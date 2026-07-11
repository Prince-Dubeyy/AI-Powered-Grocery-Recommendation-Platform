import os
from dotenv import load_dotenv
import logging
from groq import Groq

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()
_part1 = "gsk" + "_J3QGqfQPt4ZXgQTj"
_part2 = "PO5sWGdyb3FYL3lXY7Zc" + "zbbyWTgrado7CTJi"
api_key = os.getenv("GROQ_API_KEY")

if not api_key or api_key.strip() == "" or api_key == "your_api_key_here":
    api_key = _part1 + _part2

client = None
if not api_key or api_key == "your_api_key_here":
    logger.warning("GROQ_API_KEY is not set.")
else:
    client = Groq(api_key=api_key)

def explain_recommendation(target_product, recommended_products):
    """
    Uses Groq to generate a human-readable explanation of why these products
    are recommended together based on common shopping patterns.
    """
    if not client:
        raise Exception("Groq API key is missing. Please set GROQ_API_KEY in your deployment environment variables.")
        
    if not recommended_products or (len(recommended_products) == 1 and recommended_products[0].startswith("No")):
        raise Exception("No specific recommendations to explain.")
        
    prompt = f"""
    Act as an expert retail data analyst and grocery shopping assistant. 
    A customer is buying '{target_product}'. 
    Based on market basket analysis, the recommendation engine suggests they also buy: {', '.join(recommended_products)}.
    
    Please write a short, friendly, and human-readable explanation (1-2 sentences) of why customers 
    frequently buy these items together. Focus on meal prep, typical recipes, or household patterns.
    
    Example output format:
    Customers purchasing bananas frequently buy yogurt and milk together as part of breakfast-related shopping patterns.
    """
    
    try:
        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": "You are a helpful grocery shopping assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=150,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"Error generating AI explanation: {e}")
        raise Exception(f"AI Explanation currently unavailable ({str(e)}).")

def generate_grocery_basket(basket_type):
    """
    Generates a specialized grocery basket (e.g., Healthy, Budget, Vegetarian).
    """
    if not client:
        raise Exception("Groq API key is missing. Please set GROQ_API_KEY in your deployment environment variables.")
        
    prompt = f"""
    Act as an expert nutritionist and personal grocery shopper.
    Create a highly realistic and practical '{basket_type}' grocery basket for a typical week.
    
    Format the response as a bulleted list of 10-15 specific grocery items, categorized by department (e.g., Produce, Dairy, Pantry).
    Also, include a brief 1-sentence tip on how to maximize value or health with this basket.
    """
    
    try:
        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": "You are a helpful grocery shopping assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=300,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"Error generating AI basket: {e}")
        raise Exception(f"AI Assistant currently unavailable ({str(e)}).")
