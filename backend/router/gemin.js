const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|bmp|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Helper function to convert file to base64
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Plant Disease Detection API is running!' });
});

app.post('/api/analyze', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prepare the image for analysis
    const imagePart = fileToGenerativePart(req.file.path, req.file.mimetype);

    // Create detailed prompt for plant disease analysis
    const prompt = `
    Analyze this plant image for diseases and provide a detailed diagnosis. 
    
    Please respond in the following JSON format:
    {
      "category": "Disease name or 'Healthy Plant'",
      "plantType": "Type of plant identified",
      "confidence": "Confidence percentage (number only)",
      "severity": "None/Mild/Moderate/Severe",
      "description": "Detailed description of findings",
      "treatment": "Specific treatment recommendations",
      "prevention": "Prevention tips for future",
      "tags": ["tag1", "tag2", "tag3"],
      "details": {
        "Disease Type": "Specific disease type",
        "Affected Area": "Which parts and percentage affected",
        "Severity Level": "Severity with scale (e.g., 'Moderate (5/10)')",
        "Treatment Urgency": "How quickly treatment is needed",
        "Recovery Time": "Expected recovery time with treatment",
        "Contagious": "Yes/No and isolation recommendation"
      }
    }

    Focus on:
    - Accurate disease identification
    - Specific treatment recommendations
    - Practical prevention advice
    - Clear severity assessment
    - Contagion risk and isolation needs

    If the plant appears healthy, indicate that clearly.
    If you're unsure, indicate lower confidence and suggest consulting an expert.
    `;

    // Generate content
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    // Try to parse JSON response
    let analysisResult;
    try {
      // Clean the response to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      // Fallback to mock data if parsing fails
      analysisResult = {
        category: "Analysis Error",
        plantType: "Unknown",
        confidence: 50,
        severity: "Unknown",
        description: "Unable to analyze image properly. Please try again with a clearer image.",
        treatment: "Consult a plant expert for proper diagnosis.",
        prevention: "Maintain good plant care practices.",
        tags: ["Analysis Error", "Retry Needed"],
        details: {
          "Disease Type": "Unable to determine",
          "Affected Area": "Unknown",
          "Severity Level": "Unknown",
          "Treatment Urgency": "Consult expert",
          "Recovery Time": "Unknown",
          "Contagious": "Unknown"
        }
      };
    }

    // Clean up uploaded file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.json(analysisResult);

  } catch (error) {
    console.error('Analysis error:', error);
    
    // Clean up uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ 
      error: 'Failed to analyze image',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    geminiStatus: process.env.GEMINI_API_KEY ? 'Configured' : 'Not Configured'
  });
});

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
  }
  res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`🌱 Plant Disease Detection API running on port ${PORT}`);
  console.log(`🔑 Gemini API: ${process.env.GEMINI_API_KEY ? 'Configured' : 'Not Configured'}`);
});