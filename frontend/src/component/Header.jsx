import React, { useState } from 'react';

const Header = ({ currentPage, setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              <span className="hidden sm:inline">PlantCare AI</span>
              <span className="sm:hidden">PlantCare</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-3 py-2 lg:px-4 lg:py-2 rounded-lg font-medium transition-all duration-300 text-sm lg:text-base ${
                currentPage === 'home'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('detection')}
              className={`px-3 py-2 lg:px-4 lg:py-2 rounded-lg font-medium transition-all duration-300 text-sm lg:text-base ${
                currentPage === 'detection'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              Disease Detection
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-100 bg-white">
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 text-left ${
                  currentPage === 'home'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                🏠 Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('detection');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 text-left ${
                  currentPage === 'detection'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                🔍 Disease Detection
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
