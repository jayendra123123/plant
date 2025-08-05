# Plant Disease Detection

A full-stack application for plant disease detection using AI image analysis.

## Project Structure

- **Backend** - Node.js/Express server with Gemini AI integration
- **Frontend** - React application with Tailwind CSS

## Features

- Image upload and analysis
- AI-powered plant disease detection
- Modern responsive UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
### Environment Setup

Create a `.env` file in the backend directory with your API keys:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000`.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express, Multer
- **AI**: Google Gemini AI
- **File Upload**: Multer for image processing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
