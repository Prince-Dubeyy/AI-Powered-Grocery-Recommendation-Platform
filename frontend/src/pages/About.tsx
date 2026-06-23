import { Info, Database, Server, Code2, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Info className="text-indigo-600" size={32} />
          About This Project
        </h1>
        <p className="text-gray-600 mt-2">AI-Powered Smart Grocery Recommendation Platform</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-8">
        
        <section>
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Project Overview</h2>
          <p className="text-gray-700 leading-relaxed">
            This portfolio project demonstrates an end-to-end Full-Stack AI pipeline applied to the Instacart Market Basket dataset. 
            It mimics production-grade e-commerce platforms by integrating complex machine learning algorithms with a modern React frontend and a lightning-fast FastAPI backend.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
              <Database className="text-blue-500" size={20} /> Data Engineering
            </h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Processed 3M+ grocery orders.</li>
              <li>Optimized memory usage by &gt;70% via PyArrow & FastParquet.</li>
              <li>Cleaned and normalized raw CSV data into compressed Parquet files.</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
              <Sparkles className="text-purple-500" size={20} /> Machine Learning & AI
            </h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li><strong>Apriori Algorithm:</strong> Mined frequent itemsets for Association Rules.</li>
              <li><strong>Collaborative Filtering:</strong> User-based and Item-based logic.</li>
              <li><strong>Generative AI:</strong> Integrated Google Gemini 1.5 Flash for Explainable AI.</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
              <Server className="text-green-500" size={20} /> Backend Architecture
            </h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li><strong>FastAPI:</strong> High-performance Python REST API.</li>
              <li><strong>Pydantic:</strong> Strict request/response validation.</li>
              <li>Memory-cached recommendation engines for rapid response.</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
              <Code2 className="text-teal-500" size={20} /> Frontend Engineering
            </h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li><strong>React 18 & TypeScript:</strong> Type-safe component architecture.</li>
              <li><strong>Vite:</strong> Ultra-fast build tooling.</li>
              <li><strong>Tailwind CSS:</strong> Custom modern UI with responsive design.</li>
              <li><strong>Recharts & Lucide:</strong> Professional charting and iconography.</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
