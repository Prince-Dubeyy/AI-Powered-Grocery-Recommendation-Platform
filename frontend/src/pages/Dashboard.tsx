import { ArrowRight, ShoppingCart, Users, Search, BrainCircuit, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const journeySteps = [
    {
      title: 'Upload or Select Data',
      description: 'Start by exploring the vast Instacart dataset with over 3 million grocery orders.',
      icon: <ShoppingCart size={24} />,
      link: '/product-recs',
      color: 'bg-blue-500',
    },
    {
      title: 'Run Analysis',
      description: 'The engine processes purchasing patterns using collaborative filtering.',
      icon: <Users size={24} />,
      link: '/user-recs',
      color: 'bg-purple-500',
    },
    {
      title: 'Generate Associations',
      description: 'The Apriori algorithm discovers hidden rules (e.g., Bread -> Butter).',
      icon: <Search size={24} />,
      link: '/similar',
      color: 'bg-pink-500',
    },
    {
      title: 'View Recommendations',
      description: 'See personalized and cross-selling product suggestions tailored for users.',
      icon: <Sparkles size={24} />,
      link: '/product-recs',
      color: 'bg-yellow-500',
    },
    {
      title: 'Get AI Explanation',
      description: 'Groq AI explains the reasoning behind every recommendation in plain English.',
      icon: <BrainCircuit size={24} />,
      link: '/ai-explain',
      color: 'bg-green-500',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-12 animate-fade-in">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-primary text-white p-8 sm:p-12 lg:p-16 shadow-2xl glass-dark">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md mb-6 border border-white/30 text-sm font-medium">
            <Sparkles size={16} /> Portfolio Project
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            AI-Powered Grocery <br /> Recommendation Platform
          </h1>
          <p className="text-lg sm:text-xl text-green-50 max-w-2xl mb-8 leading-relaxed">
            Recommendation System using Market Basket Analysis, Apriori Algorithm, Collaborative Filtering, and AI-powered explanations.
          </p>
          
          <div className="flex flex-wrap gap-3">
            {['Data Science', 'Machine Learning', 'Recommendation Systems', 'Business Analytics', 'AI Integration'].map((skill) => (
              <span key={skill} className="px-4 py-1.5 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 right-20 w-72 h-72 rounded-full bg-green-300 opacity-10 blur-2xl"></div>
      </div>

      {/* User Journey Section */}
      <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 text-lg">Follow the journey from raw data to intelligent, AI-explained grocery recommendations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {journeySteps.map((step, idx) => (
            <div key={idx} className="relative group">
              {idx !== journeySteps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-[2px] bg-gray-200 z-0">
                  <div className="h-full bg-green-500 w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                </div>
              )}
              
              <Link to={step.link} className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover-lift h-full glass transition-all duration-300 group-hover:border-green-200">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg ${step.color} transform group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Step {idx + 1}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600 mb-6 flex-grow">{step.description}</p>
                
                <div className="mt-auto flex items-center justify-center gap-2 text-green-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Try it <ArrowRight size={16} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
