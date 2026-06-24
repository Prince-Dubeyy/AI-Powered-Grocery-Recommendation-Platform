import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ProductRecommendations from './pages/ProductRecommendations';
import UserRecommendations from './pages/UserRecommendations';
import SimilarProducts from './pages/SimilarProducts';
import AIExplainer from './pages/AIExplainer';
import AIAssistant from './pages/AIAssistant';
import About from './pages/About';
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <div className="flex-1 md:ml-64 w-full h-screen overflow-y-auto relative flex flex-col">
          {/* Mobile Header */}
          <div className="md:hidden bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Open Menu"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-bold text-green-600">InstaCart AI</h1>
            </div>
          </div>

          <div className="flex-1 p-4 sm:p-6 lg:p-8">
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
      </div>
    </Router>
  );
}

export default App;
