import React, { useState, useRef } from 'react';

function Body() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file) {
      setSelectedFile(file);
      setAnalysis(null);
      setErrorMessage('');
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const mockAnalysis = {
        confidence: 92,
        category: 'Leaf Spot Disease',
        severity: 'Moderate',
        plantType: 'Tomato Plant',
        description: 'The plant shows signs of bacterial leaf spot disease, characterized by dark brown spots with yellow halos on the leaves.',
        treatment: 'Remove affected leaves immediately. Apply copper-based fungicide spray.',
        tags: ['Bacterial Disease', 'Leaf Spot', 'Tomato', 'Treatable']
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setAnalysis(null);
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            Advanced plant health analysis powered by artificial intelligence
          </p>
        </div>
        
        <div style={{ 
          background: 'white', 
          borderRadius: '20px', 
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            {/* Upload Section */}
            <div>
              <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
                📁 Upload Image
              </h2>
              
              <div 
                style={{
                  border: `2px dashed ${selectedFile ? '#4CAF50' : '#ddd'}`,
                  borderRadius: '15px',
                  padding: '40px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: selectedFile ? '#f0f8f0' : '#f9f9f9',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={{ 
                        width: '150px', 
                        height: '150px', 
                        objectFit: 'cover', 
                        borderRadius: '10px',
                        marginBottom: '15px'
                      }}
                    />
                    <div style={{ color: '#4CAF50', fontWeight: 'bold' }}>
                      ✅ {selectedFile.name}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearFile();
                      }}
                      style={{
                        marginTop: '10px',
                        padding: '5px 10px',
                        background: '#ff4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '48px', marginBottom: '15px' }}>📷</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                      Upload a photo
                    </div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                      Click to select • Upload plant images for disease detection
                    </div>
                    <div style={{
                      display: 'inline-block',
                      padding: '12px 24px',
                      background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                      color: 'white',
                      borderRadius: '10px',
                      fontWeight: 'bold'
                    }}>
                      Choose File
                    </div>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  style={{ display: 'none' }}
                />
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div style={{
                  marginTop: '15px',
                  padding: '15px',
                  background: '#ffebee',
                  border: '1px solid #f44336',
                  borderRadius: '8px',
                  color: '#d32f2f'
                }}>
                  ❌ {errorMessage}
                </div>
              )}

              {/* Analysis Button */}
              <button
                onClick={handleAnalyze}
                disabled={!selectedFile || isAnalyzing}
                style={{
                  width: '100%',
                  padding: '15px',
                  marginTop: '20px',
                  background: selectedFile && !isAnalyzing 
                    ? 'linear-gradient(45deg, #2196F3, #1976D2)' 
                    : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: selectedFile && !isAnalyzing ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease'
                }}
              >
                {isAnalyzing ? '🔄 Analyzing...' : '✨ Analyze Plant Health'}
              </button>
            </div>
            
            {/* Results Section */}
            <div>
              <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
                👁️ Plant Health Analysis
              </h2>
              
              <div style={{
                background: '#f8f9fa',
                borderRadius: '15px',
                padding: '30px',
                minHeight: '400px',
                border: '1px solid #e9ecef'
              }}>
                {analysis ? (
                  <div>
                    {/* Uploaded Image Display */}
                    {imagePreview && (
                      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <img 
                          src={imagePreview} 
                          alt="Analyzed plant" 
                          style={{
                            width: '200px',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            marginBottom: '10px'
                          }}
                        />
                        <div style={{ fontSize: '14px', color: '#666' }}>Analyzed Plant Image</div>
                      </div>
                    )}

                    {/* Disease Status */}
                    <div style={{
                      textAlign: 'center',
                      marginBottom: '20px',
                      padding: '15px',
                      background: analysis.severity === 'None' ? '#e8f5e8' : '#fff3cd',
                      borderRadius: '10px',
                      border: `1px solid ${analysis.severity === 'None' ? '#4CAF50' : '#ffc107'}`
                    }}>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: analysis.severity === 'None' ? '#2e7d32' : '#856404'
                      }}>
                        {analysis.category}
                      </div>
                      <div style={{ fontSize: '14px', marginTop: '5px' }}>
                        Plant: {analysis.plantType}
                      </div>
                    </div>

                    {/* Confidence Score */}
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Detection Confidence</span>
                        <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>{analysis.confidence}%</span>
                      </div>
                      <div style={{
                        width: '100%',
                        background: '#e0e0e0',
                        borderRadius: '10px',
                        height: '8px'
                      }}>
                        <div 
                          style={{
                            height: '100%',
                            background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                            width: `${analysis.confidence}%`,
                            borderRadius: '10px',
                            transition: 'width 1s ease'
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Description */}
                    <div style={{ marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
                        Diagnosis
                      </h3>
                      <p style={{ lineHeight: '1.5', color: '#555' }}>{analysis.description}</p>
                    </div>

                    {/* Treatment */}
                    <div style={{ marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
                        Recommended Treatment
                      </h3>
                      <div style={{
                        padding: '15px',
                        background: '#e3f2fd',
                        borderRadius: '8px',
                        border: '1px solid #2196F3'
                      }}>
                        <p style={{ lineHeight: '1.5', color: '#1565c0', margin: 0 }}>{analysis.treatment}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
                        Tags
                      </h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {analysis.tags.map((tag, index) => (
                          <span 
                            key={index}
                            style={{
                              padding: '6px 12px',
                              background: '#e1f5fe',
                              color: '#0277bd',
                              borderRadius: '15px',
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '64px', marginBottom: '20px' }}>🧠</div>
                    <p style={{ color: '#666', marginBottom: '10px' }}>Upload a plant image to detect diseases</p>
                    <p style={{ fontSize: '14px', color: '#999' }}>
                      AI-powered plant health analysis and treatment recommendations will appear here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
