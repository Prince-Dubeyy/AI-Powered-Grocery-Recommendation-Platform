import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ProductRecommendations from './pages/ProductRecommendations';
import UserRecommendations from './pages/UserRecommendations';
import SimilarProducts from './pages/SimilarProducts';
import AIExplainer from './pages/AIExplainer';
import AIAssistant from './pages/AIAssistant';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product-recs" element={<ProductRecommendations />} />
            <Route path="/user-recs" element={<UserRecommendations />} />
            <Route path="/similar" element={<SimilarProducts />} />
            <Route path="/ai-explain" element={<AIExplainer />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
