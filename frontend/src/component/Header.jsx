import React from 'react';

const Header = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-white shadow-lg border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              PlantCare AI
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 'home'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('detection')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 'detection'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              Disease Detection
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
