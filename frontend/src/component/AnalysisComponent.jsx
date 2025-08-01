import React from 'react';

function AnalysisComponent({ 
  analysis, 
  isAnalyzing, 
  analysisProgress, 
  imagePreview, 
  onAnalyze, 
  selectedFile 
}) {
  const safeTags = Array.isArray(analysis?.tags) ? analysis.tags : [];
  const safeDetails = analysis?.details && typeof analysis.details === 'object' ? analysis.details : {};

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <span className="text-lg sm:text-xl">👁️</span>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 m-0">Plant Health Analysis</h2>
      </div>
      
      <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 min-h-[300px] sm:min-h-[400px] border border-gray-200">
        {analysis ? (
          <div className="animate-fadeIn space-y-4 sm:space-y-6">
            {imagePreview && (
              <div className="text-center mb-4 sm:mb-6">
                <img 
                  src={imagePreview} 
                  alt="Analyzed plant" 
                  className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-xl mx-auto shadow-lg mb-2"
                />
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  Analyzed Plant Image
                </div>
              </div>
            )}

            {/* Category + Plant Info */}
            <div className={`
              text-center mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl border-2 
              ${analysis.severity === 'None' 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-500' 
                : analysis.severity === 'Mild'
                  ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-500'
                  : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-500'
              }
            `}>
              <div className={`
                text-lg sm:text-xl font-bold mb-1
                ${analysis.severity === 'None' ? 'text-green-800' : 
                  analysis.severity === 'Mild' ? 'text-yellow-800' : 'text-red-800'}
              `}>
                {analysis.category}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                <strong>Plant:</strong> {analysis.plantType}
              </div>
            </div>

            {/* Confidence */}
            <div className="mb-4 sm:mb-6 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800 text-sm sm:text-base">Detection Confidence</span>
                <span className="font-bold text-green-600 text-sm sm:text-base px-2 py-1 bg-green-50 rounded-lg">
                  {analysis.confidence}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${analysis.confidence}%` }}
                ></div>
              </div>
            </div>

            {/* Severity */}
            {analysis.severity !== 'None' && (
              <div className="p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-300 rounded-xl mb-4 sm:mb-6">
                <div className="flex items-center gap-2 font-bold text-orange-800 text-sm sm:text-base">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  Severity: {analysis.severity}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 pb-1 border-b-2 border-gray-200">
                🔍 Diagnosis
              </h3>
              <p className="text-sm sm:text-base text-gray-700 p-3 sm:p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 leading-relaxed">
                {analysis.description}
              </p>
            </div>

            {/* Treatment */}
            <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 pb-1 border-b-2 border-gray-200">
                💊 Recommended Treatment
              </h3>
              <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-300 rounded-xl text-blue-800 font-medium text-sm sm:text-base">
                {analysis.treatment}
              </div>
            </div>

            {/* Prevention */}
            <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 pb-1 border-b-2 border-gray-200">
                🛡️ Prevention Tips
              </h3>
              <div className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-xl text-green-800 font-medium text-sm sm:text-base">
                {analysis.prevention}
              </div>
            </div>

            {/* Tags */}
            {safeTags.length > 0 && (
              <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 pb-1 border-b-2 border-gray-200">
                  🏷️ Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {safeTags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-xs sm:text-sm font-bold border border-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Details */}
            {Object.keys(safeDetails).length > 0 && (
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 pb-1 border-b-2 border-gray-200">
                  📋 Detailed Information
                </h3>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {Object.entries(safeDetails).map(([key, value], index) => (
                    <div 
                      key={index} 
                      className={`flex flex-col sm:flex-row sm:justify-between p-3 sm:p-4 border-b border-gray-100 last:border-b-0 ${
                        index % 2 === 0 ? 'bg-gray-25' : 'bg-white'
                      }`}
                    >
                      <span className="font-semibold text-gray-700 text-sm sm:text-base mb-1 sm:mb-0">{key}</span>
                      <span className="text-gray-600 text-sm sm:text-base sm:text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-8 sm:py-12">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">🧠</div>
            <p className="text-gray-600 mb-2 sm:mb-3 text-base sm:text-lg font-medium px-4">
              Upload a plant image to detect diseases
            </p>
            <p className="text-xs sm:text-sm text-gray-500 px-4 leading-relaxed">
              AI-powered plant health analysis and treatment recommendations will appear here
            </p>
          </div>
        )}
      </div>

      {/* Analyze Button */}
      <button
        onClick={onAnalyze}
        disabled={!selectedFile || isAnalyzing}
        className={`
          w-full p-3 sm:p-4 rounded-xl text-white font-bold text-sm sm:text-base transition-all duration-300
          ${selectedFile && !isAnalyzing 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] cursor-pointer' 
            : 'bg-gray-400 cursor-not-allowed'
          }
        `}
      >
        {isAnalyzing ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">🔄</span>
            Analyzing... {Math.round(analysisProgress)}%
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <span>✨</span>
            <span className="hidden sm:inline">Analyze Plant Health</span>
            <span className="sm:hidden">Analyze Plant</span>
          </span>
        )}
      </button>

      {/* Progress Bar */}
      {isAnalyzing && (
        <div style={{
          width: '100%',
          background: '#e0e0e0',
          borderRadius: '10px',
          height: '8px',
          overflow: 'hidden'
        }}>
          <div 
            style={{
              height: '100%',
              background: 'linear-gradient(45deg, #4CAF50, #45a049)',
              width: `${analysisProgress}%`,
              transition: 'width 0.3s ease'
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

// Style Helpers
const sectionHeader = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '12px',
  color: '#333',
  borderBottom: '2px solid #e0e0e0',
  paddingBottom: '5px'
};

const sectionText = {
  lineHeight: '1.6',
  color: '#555',
  padding: '12px',
  background: '#f8f9fa',
  borderRadius: '8px',
  borderLeft: '4px solid #2196F3'
};

const treatmentBox = {
  padding: '15px',
  background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
  borderRadius: '10px',
  border: '1px solid #2196F3',
  color: '#1565c0',
  fontWeight: '500'
};

const preventionBox = {
  padding: '15px',
  background: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)',
  borderRadius: '10px',
  border: '1px solid #4CAF50',
  color: '#2e7d32',
  fontWeight: '500'
};

const tagStyle = {
  padding: '8px 12px',
  background: 'linear-gradient(135deg, #e1f5fe, #b3e5fc)',
  color: '#0277bd',
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: 'bold',
  border: '1px solid #29b6f6'
};

const detailsContainer = {
  background: 'white',
  borderRadius: '10px',
  border: '1px solid #e0e0e0',
  overflow: 'hidden'
};

const detailsRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  borderBottom: '1px solid #f0f0f0'
};

const detailsKey = {
  fontWeight: '600',
  color: '#444',
  fontSize: '14px'
};

const detailsValue = {
  color: '#666',
  textAlign: 'right',
  fontSize: '14px',
  fontWeight: '500'
};

export default AnalysisComponent;
