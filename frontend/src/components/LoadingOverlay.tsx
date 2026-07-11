import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  isVisible: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Preparing recommendation engine...",
    "Backend is waking up and analyzing grocery patterns.",
    "This may take up to 30–60 seconds on the first request because the server is hosted on Render.",
    "Generating recommendations..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVisible) {
      setMessageIndex(0);
      interval = setInterval(() => {
        setMessageIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
      }, 5000); // Change message every 5 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl animate-fade-in">
      <div className="flex flex-col items-center max-w-md text-center p-6 bg-white shadow-2xl rounded-2xl border border-gray-100">
        <Loader2 className="animate-spin text-purple-600 mb-6" size={48} />
        
        <div className="min-h-[4rem] flex items-center justify-center">
          <p className="text-lg font-medium text-gray-800 transition-opacity duration-300 animate-fade-in" key={messageIndex}>
            {messages[messageIndex]}
          </p>
        </div>
        
        {messageIndex >= 2 && (
          <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-purple-600 h-1.5 rounded-full animate-[pulse_2s_ease-in-out_infinite]" style={{ width: '100%' }}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
