import React, { useState } from 'react';
import UploadComponent from './UploadComponent';
import AnalysisComponent from './AnalysisComponent';

function Body() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setErrorMessage('');
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setAnalysis(null);
    setErrorMessage('');
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp'];
      const fileType = file.type.toLowerCase();
      
      if (!validTypes.includes(fileType)) {
        setErrorMessage('Please select a valid image file (JPEG, PNG, WEBP, GIF, BMP)');
        return;
      }
      
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('File size must be less than 10MB');
        return;
      }
      
      handleFileSelect(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysis(null);
    
    // Start progress simulation
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('image', selectedFile);

      // Call the backend API
      const response = await fetch('https://plant-5vo0.onrender.com/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze image');
      }

      const result = await response.json();
      
      // Ensure confidence is a number
      if (result.confidence) {
        result.confidence = parseInt(result.confidence) || 85;
      }
      
      setAnalysis(result);
      
    } catch (error) {
      console.error('Error analyzing image:', error);
      setErrorMessage(`Analysis failed: ${error.message}`);
      
      // Fallback to mock data in case of error
      const fallbackAnalysis = {
        category: "Connection Error",
        plantType: "Unable to determine",
        confidence: 0,
        severity: "Unknown",
        description: "Unable to connect to analysis service. Please check your connection and try again.",
        treatment: "Please try again or consult a plant expert.",
        prevention: "Ensure stable internet connection for AI analysis.",
        tags: ["Error", "Retry Needed"],
        details: {
          "Disease Type": "Analysis unavailable",
          "Affected Area": "Unable to determine",
          "Severity Level": "Unknown",
          "Treatment Urgency": "Try analysis again",
          "Recovery Time": "Unknown",
          "Contagious": "Unknown"
        }
      };
      setAnalysis(fallbackAnalysis);
    } finally {
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              🌱 AI Plant Disease Detection
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Advanced plant health analysis using artificial intelligence
          </p>
        </div>
        
        {/* Main Content */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-green-100 overflow-hidden">
          {/* Mobile: Stack vertically, Desktop: Side by side */}
          <div className="flex flex-col lg:flex-row">
            {/* Upload Section */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-green-100">
              <UploadComponent
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                imagePreview={imagePreview}
                errorMessage={errorMessage}
                clearFile={clearFile}
                handleFileInput={handleFileInput}
              />
            </div>
            
            {/* Analysis Section */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8">
              <AnalysisComponent
                analysis={analysis}
                isAnalyzing={isAnalyzing}
                analysisProgress={analysisProgress}
                imagePreview={imagePreview}
                onAnalyze={handleAnalyze}
                selectedFile={selectedFile}
              />
            </div>
          </div>
        </div>
        
        {/* Mobile Helper Text */}
        <div className="mt-6 sm:mt-8 text-center lg:hidden">
          <p className="text-xs sm:text-sm text-gray-500 px-4">
            💡 Tip: For best results, take clear photos in good lighting
          </p>
        </div>
      </div>
    </div>
  );
}

export default Body;