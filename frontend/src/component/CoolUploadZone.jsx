import React from 'react';

const CoolUploadZone = () => {
  return (
    <div className="relative group">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      
      {/* Upload area */}
      <div className="relative bg-white rounded-2xl p-8 border-2 border-dashed border-green-300 hover:border-green-500 transition-all duration-300">
        <div className="text-center">
          {/* Plant icon */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Upload Plant Image
          </h3>
          
          <p className="text-gray-600 mb-4">
            Drag and drop your plant image here, or click to browse
          </p>
          
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
            Choose File
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoolUploadZone;
