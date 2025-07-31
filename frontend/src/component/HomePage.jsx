import React from 'react';

const HomePage = ({ setCurrentPage }) => {
  const plantFacts = [
    {
      icon: "🌱",
      title: "Plant Diversity",
      description: "There are over 390,000 known plant species on Earth, with new ones being discovered regularly."
    },
    {
      icon: "🍃",
      title: "Oxygen Production",
      description: "A single tree can produce enough oxygen for two people for an entire year."
    },
    {
      icon: "🌿",
      title: "Medicine Source",
      description: "About 25% of modern medicines are derived from plants found in rainforests."
    },
    {
      icon: "🌾",
      title: "Food Security",
      description: "Plants provide 80% of the world's food supply, feeding billions of people daily."
    }
  ];

  const commonDiseases = [
    {
      name: "Leaf Spot",
      severity: "Medium",
      symptoms: "Brown or black spots on leaves",
      color: "bg-yellow-500"
    },
    {
      name: "Powdery Mildew",
      severity: "Low",
      symptoms: "White powdery coating on leaves",
      color: "bg-green-500"
    },
    {
      name: "Root Rot",
      severity: "High",
      symptoms: "Yellowing leaves, wilting, root decay",
      color: "bg-red-500"
    },
    {
      name: "Bacterial Blight",
      severity: "High",
      symptoms: "Water-soaked spots, leaf yellowing",
      color: "bg-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Protect Your Plants
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Discover the fascinating world of plants and use AI-powered technology to detect diseases early, 
            ensuring your green companions stay healthy and thriving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('detection')}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Start Disease Detection
            </button>
            <button className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-50 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Plant Facts Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Amazing Plant Facts
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plantFacts.map((fact, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-green-100"
              >
                <div className="text-4xl mb-4 text-center">{fact.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{fact.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{fact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Plant Diseases Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Common Plant Diseases
            </span>
          </h2>
          <p className="text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            Early detection is key to maintaining plant health. Learn about common diseases our AI can identify.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commonDiseases.map((disease, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-500"
              >
                <div className="flex items-center mb-3">
                  <div className={`w-3 h-3 rounded-full ${disease.color} mr-3`}></div>
                  <span className="text-sm font-medium text-gray-600">{disease.severity} Risk</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{disease.name}</h3>
                <p className="text-gray-600 text-sm">{disease.symptoms}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              How Disease Detection Works
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">1. Upload Image</h3>
              <p className="text-gray-600">Take a clear photo of your plant's affected area and upload it to our platform.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">2. AI Analysis</h3>
              <p className="text-gray-600">Our advanced AI analyzes the image using machine learning to identify potential diseases.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">3. Get Results</h3>
              <p className="text-gray-600">Receive detailed diagnosis and treatment recommendations to help your plant recover.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Protect Your Plants?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of plant enthusiasts using AI to keep their gardens healthy.
          </p>
          <button 
            onClick={() => setCurrentPage('detection')}
            className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Start Disease Detection Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
