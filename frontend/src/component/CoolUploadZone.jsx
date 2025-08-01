import React, { useState } from 'react';

const CoolUploadZone = ({ onFileSelect }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative group">
        {/* Background with gradient - responsive sizing */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-xl sm:rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        
        {/* Upload area - responsive padding and sizing */}
        <div 
          className={`relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-dashed transition-all duration-300 ${
            isDragOver ? 'border-green-500 bg-green-50' : 'border-green-300 hover:border-green-500'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            {/* Plant icon - responsive sizing */}
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            
            {/* Title - responsive text size */}
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2 sm:mb-3">
              Upload Plant Image
            </h3>
            
            {/* Description - responsive text and spacing */}
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 px-2 sm:px-0 leading-relaxed">
              {selectedFile ? (
                <span className="text-green-600 font-medium">
                  Selected: {selectedFile.name}
                </span>
              ) : (
                <>
                  <span className="hidden sm:inline">Drag and drop your plant image here, or </span>
                  <span className="sm:hidden">Take or select a photo of your plant</span>
                  <span className="hidden sm:inline">click to browse</span>
                </>
              )}
            </p>
            
            {/* File input and buttons - responsive layout */}
            <div className="space-y-3 sm:space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
                capture="environment" // Prefer rear camera on mobile
              />
              
              {/* Main upload button */}
              <label
                htmlFor="file-upload"
                className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <span className="sm:hidden">📸 Take/Choose Photo</span>
                <span className="hidden sm:inline">Choose File</span>
              </label>
              
              {/* Mobile-specific camera button */}
              <div className="sm:hidden">
                <label
                  htmlFor="file-upload"
                  className="inline-block bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer ml-2"
                >
                  📁 From Gallery
                </label>
              </div>
            </div>
            
            {/* File format info - responsive visibility */}
            <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
              Supports: JPG, PNG, WEBP 
              <span className="hidden sm:inline">• Max size: 10MB</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoolUploadZone;
