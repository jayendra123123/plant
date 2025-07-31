import React, { useRef } from 'react';

function UploadComponent({ 
  onFileSelect, 
  selectedFile, 
  imagePreview, 
  errorMessage, 
  clearFile, 
  handleFileInput 
}) {
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    onFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl"></span>
        <h2 className="text-xl font-semibold text-gray-800">📁 Upload Image</h2>
      </div>
      
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
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        {imagePreview ? (
          <div>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img 
                src={imagePreview} 
                alt="Preview" 
                style={{ 
                  width: '150px', 
                  height: '150px', 
                  objectFit: 'cover', 
                  borderRadius: '10px',
                  marginBottom: '15px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  width: '24px',
                  height: '24px',
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                ×
              </button>
            </div>
            <div style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: '16px' }}>
              ✅ {selectedFile.name}
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>
        ) : (
          <div>
            <div style={{ 
              fontSize: '48px', 
              marginBottom: '15px',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }}>
              📷
            </div>
            <div style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              marginBottom: '10px',
              color: '#333'
            }}>
              Upload a photo
            </div>
            <div style={{ 
              fontSize: '14px', 
              color: '#666', 
              marginBottom: '20px',
              lineHeight: '1.4'
            }}>
              Drag and drop or click to select<br/>
              Upload plant images for disease detection
            </div>
            <div style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'linear-gradient(45deg, #4CAF50, #45a049)',
              color: 'white',
              borderRadius: '10px',
              fontWeight: 'bold',
              boxShadow: '0 4px 8px rgba(76, 175, 80, 0.3)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              📎 Choose File
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
          padding: '15px',
          background: 'linear-gradient(135deg, #ffebee, #ffcdd2)',
          border: '1px solid #f44336',
          borderRadius: '10px',
          color: '#c62828',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontSize: '18px' }}>⚠️</span>
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Upload Error</div>
            <div style={{ fontSize: '14px' }}>{errorMessage}</div>
          </div>
        </div>
      )}

      {/* File Requirements */}
      <div style={{
        padding: '15px',
        background: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)',
        borderRadius: '10px',
        border: '1px solid #4CAF50'
      }}>
        <div style={{ 
          fontWeight: 'bold', 
          color: '#2e7d32', 
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          ℹ️ File Requirements
        </div>
        <ul style={{ 
          margin: 0, 
          paddingLeft: '20px', 
          color: '#2e7d32',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
          <li>Supported formats: JPEG, PNG, WEBP, GIF, BMP, TIFF, SVG</li>
          <li>Maximum file size: 10 MB</li>
          <li>Best results with clear, well-lit plant images</li>
          <li>Focus on leaves, stems, or affected areas</li>
        </ul>
      </div>
    </div>
  );
}

export default UploadComponent;
