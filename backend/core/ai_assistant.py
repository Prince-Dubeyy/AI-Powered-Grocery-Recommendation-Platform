import os
from dotenv import load_dotenv
import logging
from google import genai

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

client = None
if not api_key or api_key == "your_api_key_here":
    logger.warning("GEMINI_API_KEY is not set.")
else:
    client = genai.Client(api_key=api_key)

def explain_recommendation(target_product, recommended_products):
    """
    Uses Gemini to generate a human-readable explanation of why these products
    are recommended together based on common shopping patterns.
    """
    if not client:
        return "⚠️ Gemini API key is missing. Please add GEMINI_API_KEY to your .env file."
        
    if not recommended_products or (len(recommended_products) == 1 and recommended_products[0].startswith("No")):
        return "No specific recommendations to explain."
        
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
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents="You are a helpful grocery shopping assistant.\n" + prompt
        )
        return response.text.strip()
    except Exception as e:
        logger.error(f"Error generating AI explanation: {e}")
        return f"AI Explanation currently unavailable ({str(e)})."

def generate_grocery_basket(basket_type):
    """
    Generates a specialized grocery basket (e.g., Healthy, Budget, Vegetarian).
    """
    if not client:
        return "⚠️ Gemini API key is missing. Please add GEMINI_API_KEY to your .env file."
        
    prompt = f"""
    Act as an expert nutritionist and personal grocery shopper.
    Create a highly realistic and practical '{basket_type}' grocery basket for a typical week.
    
    Format the response as a bulleted list of 10-15 specific grocery items, categorized by department (e.g., Produce, Dairy, Pantry).
    Also, include a brief 1-sentence tip on how to maximize value or health with this basket.
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents="You are a helpful grocery shopping assistant.\n" + prompt
        )
        return response.text.strip()
    except Exception as e:
        logger.error(f"Error generating AI basket: {e}")
        return f"AI Assistant currently unavailable ({str(e)})."
