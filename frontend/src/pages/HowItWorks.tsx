import { BookOpen, ShoppingCart, Share2, Sparkles, Database } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md mb-4 text-xs font-medium border border-white/20">
            <BookOpen size={14} /> Education
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">How Recommendations Work</h1>
          <p className="text-emerald-100 max-w-2xl text-base sm:text-lg">
            A simple guide to the AI and Machine Learning behind this platform.
          </p>
        </div>
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 rounded-full bg-white opacity-10 blur-2xl"></div>
      </div>

      <div className="space-y-12 mt-8">
        {/* Section 1 */}
        <section className="glass p-8 rounded-3xl shadow-md border border-white/60">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Database className="text-emerald-500" /> What is Market Basket Analysis?
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                Imagine you are running a grocery store. If you know that people who buy <strong>bread</strong> often also buy <strong>butter</strong>, you could put them next to each other to increase sales. 
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                <strong>Market Basket Analysis</strong> is the data science technique used by retailers like Amazon, Walmart, and Instacart to uncover these hidden patterns in millions of customer receipts.
              </p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-center justify-center min-w-[250px] shadow-inner">
              <div className="flex items-center gap-4 text-emerald-700 font-bold text-xl">
                <span>Bread</span>
                <span className="text-emerald-300 text-3xl">+</span>
                <span>Butter</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="glass p-8 rounded-3xl shadow-md border border-white/60">
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Share2 className="text-blue-500" /> The Apriori Algorithm
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                The <strong>Apriori Algorithm</strong> is the classic machine learning model used to find these associations. It looks at how frequently items are purchased together compared to how often they are purchased individually.
              </p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-1"><Sparkles size={14}/></div>
                  <div><strong className="text-gray-800">Support:</strong> How popular is an item overall?</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-1"><Sparkles size={14}/></div>
                  <div><strong className="text-gray-800">Confidence:</strong> If you buy Bread, how likely are you to buy Butter?</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-1"><Sparkles size={14}/></div>
                  <div><strong className="text-gray-800">Lift:</strong> Does buying Bread actually <em>increase</em> the chance of buying Butter, or are they just both popular items?</div>
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center justify-center min-w-[250px] shadow-inner">
               <div className="text-center">
                 <div className="text-4xl mb-2">📊</div>
                 <div className="font-bold text-blue-800">Finding Patterns</div>
                 <div className="text-sm text-blue-600 mt-1">in 3M+ Orders</div>
               </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="glass p-8 rounded-3xl shadow-md border border-white/60">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingCart className="text-purple-500" /> Generating Recommendations
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                Once the Apriori model is trained on the dataset, it generates rules. When you select a product on this platform, the backend instantly searches these rules and returns the items with the highest <strong>Confidence</strong> and <strong>Lift</strong>.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Then, we pass these raw statistical recommendations to a Generative AI model (Groq) which translates the math into a human-readable explanation, like "Customers buying pasta often buy tomatoes for a complete dinner."
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 flex flex-col items-center justify-center min-w-[250px] shadow-inner gap-3">
              <div className="bg-white p-3 rounded-xl shadow-sm border border-purple-100 text-purple-800 font-medium">Pasta</div>
              <div className="text-purple-300">↓</div>
              <div className="bg-white p-3 rounded-xl shadow-sm border border-purple-100 text-purple-800 font-medium">Groq AI</div>
              <div className="text-purple-300">↓</div>
              <div className="bg-purple-600 text-white p-3 rounded-xl shadow-md text-sm text-center">"Pasta and Tomatoes are bought together for dinner prep."</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks;
