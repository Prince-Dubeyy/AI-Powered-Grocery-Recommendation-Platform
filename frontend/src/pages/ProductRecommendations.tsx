import React, { useState } from 'react';
import api from '../api';
import { Search, ShoppingCart, Sparkles } from 'lucide-react';

const ProductRecommendations = () => {
  const [productName, setProductName] = useState('Organic Hass Avocado');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/recommend/product', { product_name: productName });
      setRecommendations(response.data.recommendations);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md mb-4 text-xs font-medium border border-white/20">
            <Sparkles size={14} /> Step 1 & 4
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Frequently Bought Together</h1>
          <p className="text-blue-100 max-w-2xl text-base sm:text-lg">
            Discover what products customers typically buy together using Market Basket Analysis and the Apriori Algorithm.
          </p>
        </div>
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 rounded-full bg-white opacity-5 blur-2xl"></div>
      </div>

      <div className="glass p-6 sm:p-8 rounded-2xl shadow-lg border border-white/50 relative z-10">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all shadow-inner"
              placeholder="Enter a grocery item (e.g., Organic Hass Avocado)..."
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 w-full sm:w-auto hover-lift disabled:opacity-70 disabled:hover-lift-none shadow-md"
          >
            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Analyze Basket'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3 animate-slide-up">
          <div className="bg-red-100 p-2 rounded-full"><span className="text-xl">⚠️</span></div>
          <p className="font-medium">{error}</p>
        </div>
      )}

      {recommendations.length > 0 && !error && (
        <div className="space-y-6 animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="h-8 w-2 bg-blue-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">Generated Recommendations</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center gap-4 hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl group-hover:bg-blue-100 transition-colors relative z-10 shadow-inner">
                  <ShoppingCart size={28} />
                </div>
                <h3 className="font-medium text-gray-800 relative z-10 leading-snug">{rec}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductRecommendations;
