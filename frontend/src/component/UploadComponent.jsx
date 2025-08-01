import React, { useRef, useState } from 'react';

function UploadComponent({ 
  onFileSelect, 
  selectedFile, 
  imagePreview, 
  errorMessage, 
  clearFile, 
  handleFileInput 
}) {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    onFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <span className="text-lg sm:text-xl">📁</span>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Upload Image</h2>
      </div>
      
      {/* Upload Area */}
      <div 
        className={`
          border-2 border-dashed rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 
          text-center cursor-pointer transition-all duration-300 
          ${selectedFile ? 'border-green-500 bg-green-50' : isDragOver ? 'border-green-400 bg-green-25' : 'border-gray-300 bg-gray-50'}
          hover:border-green-400 hover:bg-green-25
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        {imagePreview ? (
          <div className="space-y-3">
            <div className="relative inline-block">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-xl shadow-lg"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
                className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs sm:text-sm font-bold shadow-lg transition-colors duration-200"
              >
                ×
              </button>
            </div>
            <div className="text-green-600 font-bold text-sm sm:text-base">
              ✅ {selectedFile.name}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            <div className="text-4xl sm:text-5xl md:text-6xl filter drop-shadow-lg">
              📷
            </div>
            <div className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
              Upload a photo
            </div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 px-2 leading-relaxed">
              <span className="hidden sm:block">Drag and drop or click to select</span>
              <span className="sm:hidden">Tap to take photo or select from gallery</span>
              <br className="hidden sm:block" />
              <span className="text-green-600 font-medium">Upload plant images for disease detection</span>
            </div>
            
            {/* Mobile buttons */}
            <div className="space-y-2 sm:space-y-0 sm:space-x-3 flex flex-col sm:flex-row sm:justify-center">
              <div className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                <span className="sm:hidden">📸 Take Photo / Choose File</span>
                <span className="hidden sm:inline">📎 Choose File</span>
              </div>
            </div>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          capture="environment" // Prefer rear camera on mobile
        />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-3 sm:p-4 bg-gradient-to-r from-red-50 to-red-100 border border-red-300 rounded-xl flex items-start gap-3">
          <span className="text-lg sm:text-xl flex-shrink-0">⚠️</span>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-red-800 text-sm sm:text-base mb-1">Upload Error</div>
            <div className="text-red-700 text-xs sm:text-sm break-words">{errorMessage}</div>
          </div>
        </div>
      )}

      {/* File Requirements */}
      <div className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
        <div className="font-bold text-green-800 text-sm sm:text-base mb-2 flex items-center gap-2">
          <span className="text-base sm:text-lg">ℹ️</span>
          File Requirements
        </div>
        <ul className="text-green-700 text-xs sm:text-sm space-y-1 ml-4 list-disc">
          <li>Formats: JPG, PNG, WEBP, GIF, BMP</li>
          <li>Max size: 10 MB</li>
          <li className="hidden sm:list-item">Best results with clear, well-lit images</li>
          <li>Focus on affected plant areas</li>
        </ul>
      </div>
    </div>
  );
}

export default UploadComponent;
