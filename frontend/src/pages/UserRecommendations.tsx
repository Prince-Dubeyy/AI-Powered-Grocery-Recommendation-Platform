import React, { useState } from 'react';
import api from '../api';
import { User, Search } from 'lucide-react';

const UserRecommendations = () => {
  const [userId, setUserId] = useState('1');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/recommend/user', { user_id: parseInt(userId, 10) });
      setRecommendations(response.data.recommendations);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">👤 Personalized Recommendations</h1>
        <p className="text-gray-600 mt-2">Collaborative Filtering concepts based on a user's past purchase history.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              min="1"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="Enter User ID..."
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
          >
            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Get Personalized Picks'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700">
          <p>{error}</p>
        </div>
      )}

      {recommendations.length > 0 && !error && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Top Picks for User {userId}:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center gap-3 transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-full">
                  <User size={24} />
                </div>
                <h3 className="font-medium text-gray-800">{rec}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRecommendations;
