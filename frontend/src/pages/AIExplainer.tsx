import React, { useState } from 'react';
import api from '../api';
import { BrainCircuit, Search, ArrowRight, Lightbulb } from 'lucide-react';

const AIExplainer = () => {
  const [productName, setProductName] = useState('Organic Strawberries');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setExplanation('');
    setRecommendations([]);

    try {
      // 1. Get Recommendations first
      const recResponse = await api.post('/recommend/product', { product_name: productName });
      const recs = recResponse.data.recommendations;
      
      if (!recs || recs.length === 0 || recs[0].startsWith('No ')) {
        setError(recs[0] || 'No recommendations found.');
        setLoading(false);
        return;
      }
      
      setRecommendations(recs);

      // 2. Ask Gemini for an explanation
      const aiResponse = await api.post('/ai/explain', {
        target_product: productName,
        recommended_products: recs.slice(0, 5) // Limit to top 5 for the prompt
      });
      
      setExplanation(aiResponse.data.explanation);
    } catch (err: any) {
      setError(err.message || 'Failed to generate explanation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
          <BrainCircuit className="text-purple-600" size={32} />
          AI Recommendation Explainer
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Wondering why certain products are recommended together? Let our Gemini AI explain the shopping patterns!</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-900"
              placeholder="Enter a product name..."
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px]"
          >
            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Generate Explanation'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700">
          <p>{error}</p>
        </div>
      )}

      {recommendations.length > 0 && !error && (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Shopping Pattern</h2>
          
          <div className="flex flex-col md:flex-row items-center gap-6 bg-gray-50 p-4 sm:p-6 rounded-lg mb-6">
            <div className="flex-1 w-full text-center font-semibold text-lg text-gray-700 border-2 border-dashed border-gray-300 p-4 rounded-lg bg-white">
              {productName}
            </div>
            <ArrowRight className="text-gray-400 transform rotate-90 md:rotate-0" size={32} />
            <div className="flex-1 flex flex-wrap gap-2 justify-center">
              {recommendations.slice(0, 5).map((rec, i) => (
                <span key={i} className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  {rec}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-4 sm:p-6 rounded-r-lg">
            <h3 className="flex items-center gap-2 text-purple-900 font-bold mb-2">
              <Lightbulb size={20} />
              AI Insight
            </h3>
            {explanation ? (
              <p className="text-purple-800 text-lg leading-relaxed">
                {explanation}
              </p>
            ) : (
              <div className="flex items-center gap-2 text-purple-600">
                <div className="animate-pulse flex space-x-2 w-full">
                  <div className="h-4 bg-purple-200 rounded w-3/4"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIExplainer;
