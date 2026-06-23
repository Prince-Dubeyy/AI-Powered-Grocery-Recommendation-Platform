import React, { useState } from 'react';
import api from '../api';
import { Bot, ShoppingCart, Loader2 } from 'lucide-react';

const AIAssistant = () => {
  const [basketType, setBasketType] = useState('Healthy/Clean Eating');
  const [basket, setBasket] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const options = [
    "Healthy/Clean Eating",
    "Budget-Friendly",
    "Family of 4",
    "Vegetarian",
    "High-Protein/Fitness",
    "Quick Meals"
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBasket('');
    
    try {
      const response = await api.post('/ai/assistant', { basket_type: basketType });
      setBasket(response.data.basket);
    } catch (err: any) {
      setError(err.message || 'Failed to generate basket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Bot className="text-teal-600" size={32} />
          AI Grocery Shopping Assistant
        </h1>
        <p className="text-gray-600 mt-2">Choose a lifestyle and let our Gemini-powered assistant curate a specialized grocery list.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4">
          <select
            className="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-gray-900 bg-white"
            value={basketType}
            onChange={(e) => setBasketType(e.target.value)}
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-lg transition-colors flex justify-center items-center gap-2 sm:w-auto w-full"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Generate Basket'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700">
          <p>{error}</p>
        </div>
      )}

      {basket && !error && (
        <div className="bg-white rounded-xl shadow-sm border border-teal-100 overflow-hidden">
          <div className="bg-teal-50 border-b border-teal-100 p-4 flex items-center gap-2">
            <ShoppingCart className="text-teal-600" />
            <h2 className="text-lg font-bold text-teal-800">Your "{basketType}" Custom List</h2>
          </div>
          <div className="p-6">
            <div className="prose prose-teal max-w-none whitespace-pre-wrap text-gray-700">
              {basket}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
