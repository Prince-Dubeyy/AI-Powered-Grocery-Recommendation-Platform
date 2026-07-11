import React, { useState } from 'react';
import api from '../api';
import { Bot, ShoppingCart, Loader2, Sparkles } from 'lucide-react';

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
      setError(err.response?.data?.detail || err.message || 'Failed to generate basket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md mb-4 text-xs font-medium border border-white/20">
            <Bot size={14} /> AI Feature
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Grocery Shopping Assistant</h1>
          <p className="text-teal-50 max-w-2xl text-base sm:text-lg">
            Choose a lifestyle and let our Groq-powered AI curate a specialized grocery list tailored just for you.
          </p>
        </div>
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 rounded-full bg-white opacity-5 blur-2xl"></div>
      </div>

      <div className="glass p-6 sm:p-8 rounded-2xl shadow-lg border border-white/50 relative z-10">
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <select
              className="block w-full py-4 px-5 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 transition-all shadow-inner font-medium appearance-none"
              value={basketType}
              onChange={(e) => setBasketType(e.target.value)}
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 w-full sm:w-auto hover-lift disabled:opacity-70 disabled:hover-lift-none shadow-md"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <><Sparkles size={18}/> Generate Basket</>}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3 animate-slide-up">
          <div className="bg-red-100 p-2 rounded-full"><span className="text-xl">⚠️</span></div>
          <p className="font-medium">{error}</p>
        </div>
      )}

      {basket && !error && (
        <div className="animate-slide-up">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 opacity-5 blur-2xl rounded-full"></div>
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-teal-100 p-5 flex items-center gap-3">
              <div className="bg-teal-600 text-white p-2 rounded-lg shadow-sm">
                <ShoppingCart size={20} />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-teal-900">Your "{basketType}" Custom List</h2>
            </div>
            <div className="p-6 sm:p-8 relative z-10">
              <div className="prose prose-teal max-w-none text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                {basket}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
