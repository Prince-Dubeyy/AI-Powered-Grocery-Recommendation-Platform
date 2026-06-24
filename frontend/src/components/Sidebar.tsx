import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Search, 
  BrainCircuit, 
  Bot, 
  Info 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Product Recommendations', path: '/product-recs', icon: <ShoppingCart size={20} /> },
    { name: 'User Recommendations', path: '/user-recs', icon: <Users size={20} /> },
    { name: 'Similar Products', path: '/similar', icon: <Search size={20} /> },
    { name: 'AI Explainer', path: '/ai-explain', icon: <BrainCircuit size={20} /> },
    { name: 'AI Assistant', path: '/ai-assistant', icon: <Bot size={20} /> },
    { name: 'About', path: '/about', icon: <Info size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      
      <div className={`h-screen w-64 bg-white shadow-lg flex flex-col fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b flex justify-between items-center shrink-0">
        <h2 className="text-2xl font-bold text-green-600 flex items-center gap-2">
          <ShoppingCart />
          InstaCart AI
        </h2>
      </div>
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="flex flex-col gap-2 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors min-h-[44px] ${
                  isActive 
                    ? 'bg-green-50 text-green-700 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                }`
              }
            >
              {item.icon}
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
