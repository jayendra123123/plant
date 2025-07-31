import React from 'react';

const PlantLoader = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        {/* Rotating outer ring */}
        <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
        
        {/* Plant icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5z"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="ml-4">
        <p className="text-lg font-semibold text-gray-700">Analyzing plant...</p>
        <p className="text-sm text-gray-500">AI is detecting diseases</p>
      </div>
    </div>
  );
};

export default PlantLoader;
