import React, { useState } from 'react';
import api from '../api';
import { BrainCircuit, Search, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import LoadingOverlay from '../components/LoadingOverlay';

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

      // 2. Ask Groq for an explanation
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
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12 relative">
      <LoadingOverlay isVisible={loading} />
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md mb-4 text-xs font-medium border border-white/20">
            <Sparkles size={14} /> Step 5
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">AI Recommendation Explainer</h1>
          <p className="text-violet-100 max-w-2xl text-base sm:text-lg">
            Wondering why certain products are recommended together? Let our Groq AI explain the shopping patterns!
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
              className="block w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-900 transition-all shadow-inner"
              placeholder="Enter a product name (e.g., Organic Strawberries)..."
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 w-full sm:w-auto hover-lift disabled:opacity-70 disabled:hover-lift-none shadow-md"
          >
            Generate Explanation
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
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100 animate-slide-up relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500 opacity-5 blur-2xl rounded-full"></div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <div className="h-6 w-2 bg-violet-500 rounded-full"></div> Shopping Pattern
          </h2>
          
          <div className="flex flex-col md:flex-row items-center gap-6 bg-gray-50/50 p-6 rounded-2xl mb-8 border border-gray-100">
            <div className="flex-1 w-full text-center font-bold text-lg text-gray-700 border-2 border-dashed border-violet-200 p-6 rounded-xl bg-white shadow-sm">
              {productName}
            </div>
            <div className="bg-violet-100 p-3 rounded-full text-violet-600 shadow-sm">
              <ArrowRight className="transform rotate-90 md:rotate-0" size={24} />
            </div>
            <div className="flex-1 flex flex-wrap gap-2 justify-center w-full">
              {recommendations.slice(0, 5).map((rec, i) => (
                <span key={i} className="bg-violet-100/50 border border-violet-200 text-violet-800 text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
                  {rec}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-100 p-6 sm:p-8 rounded-2xl shadow-inner relative">
             <div className="absolute top-4 right-4 text-violet-200">
               <BrainCircuit size={64} className="opacity-50" />
             </div>
            <h3 className="flex items-center gap-2 text-violet-900 font-bold mb-4 text-lg relative z-10">
              <div className="bg-violet-600 text-white p-1.5 rounded-lg">
                <Lightbulb size={20} />
              </div>
              AI Insight
            </h3>
            {explanation ? (
              <p className="text-gray-800 text-lg leading-relaxed relative z-10 font-medium">
                {explanation}
              </p>
            ) : (
              <div className="flex flex-col gap-3 w-full relative z-10">
                <div className="animate-pulse flex space-x-2 w-full">
                  <div className="h-4 bg-violet-200 rounded w-full"></div>
                </div>
                <div className="animate-pulse flex space-x-2 w-full">
                  <div className="h-4 bg-violet-200 rounded w-5/6"></div>
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
