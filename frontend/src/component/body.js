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
      const response = await fetch('http://localhost:5000/api/analyze', {
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
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#333',
            marginBottom: '10px'
          }}>
            🌱 AI PLANT DISEASE DETECTION
          </h1>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Advanced plant health analysis
          </p>
        </div>
        
        <div style={{ 
          background: 'white', 
          borderRadius: '20px', 
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <UploadComponent
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              imagePreview={imagePreview}
              errorMessage={errorMessage}
              clearFile={clearFile}
              handleFileInput={handleFileInput}
            />
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
    </div>
  );
}

export default Body;