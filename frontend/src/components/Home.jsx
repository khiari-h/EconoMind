import React from 'react';
import PropTypes from 'prop-types'; // PropTypes import for validation

function Home({ navigate }) {
  // Utility function to avoid code duplication in onClick
  const createNavigationHandler = (route) => (event) => {
    // navigate is now validated by PropTypes
    navigate(route); 
  };

  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <div className="relative bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            Master Economics with EconoMind
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-600">
            EconoMind is your personal AI-powered learning platform. Dive into comprehensive <span className="font-semibold text-blue-600">courses</span>, get clear explanations from your <span className="font-semibold text-professor">Professor</span>, and sharpen your skills with your dedicated <span className="font-semibold text-coach">Coach</span>.
          </p>
          <div className="mt-8">
            <button
              onClick={createNavigationHandler('courses')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              type="button" // Explicitly added type for semantics
            >
              Explore Courses
            </button>
          </div>
        </div>
      </div>

      {/* 3-Card Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">

          {/* Courses Card - FIXED: uses <button> for interactivity */}
          <button 
            className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col cursor-pointer hover:scale-[1.02] transform transition-transform"
            type="button" // Fix S6819 & S1082: Uses native <button>
            onClick={createNavigationHandler('courses')}
          >
            <div className="text-5xl mb-4">📚</div>
            <h2 className="text-3xl font-bold text-blue-800 mb-4">
              The Courses
            </h2>
            <p className="text-slate-600 text-lg flex-grow">
              Explore a curated library of economics courses, from foundational principles to advanced topics.
            </p> 
            {/* The inner button is now redundant but styled */}
            <div className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md"> 
              Browse Courses
            </div>
          </button>

          {/* Professor Card - FIXED: uses <button> for interactivity */}
          <button 
            className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col cursor-pointer hover:scale-[1.02] transform transition-transform"
            type="button" // Fix S6819 & S1082: Uses native <button>
            onClick={createNavigationHandler('professor')}
          >
            <div className="text-5xl mb-4">🎓</div>
            <h2 className="text-3xl font-bold text-professor-dark mb-4">
              The Professor
            </h2>
            <p className="text-slate-600 text-lg flex-grow">
              Get expert summaries and clear explanations of key concepts for any course you choose.
            </p>
            <div className="mt-8 w-full bg-professor text-white py-3 rounded-lg font-semibold shadow-md">
              Ask the Professor
            </div>
          </button>

          {/* Coach Card - FIXED: uses <button> for interactivity */}
          <button 
            className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col cursor-pointer hover:scale-[1.02] transform transition-transform"
            type="button" // Fix S6819 & S1082: Uses native <button>
            onClick={createNavigationHandler('coach')}
          >
            <div className="text-5xl mb-4">💪</div>
            <h2 className="text-3xl font-bold text-coach-dark mb-4">
              The Coach
            </h2>
            <p className="text-slate-600 text-lg flex-grow">
              Put your knowledge to the test with practical exercises and exam-style questions.
            </p>
            <div className="mt-8 w-full bg-coach text-white py-3 rounded-lg font-semibold shadow-md">
              Train with the Coach
            </div>
          </button>
        </div>
      </div>

      {/* Classic Footer */}
      <footer className="bg-stone-100 border-t border-stone-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-stone-500">
          <p>&copy; 2025 EconoMind</p>
          <p className="text-sm mt-1">Built for Cloud Run Hackathon 2025 - AI Agents Category</p>
        </div>
      </footer>
    </div>
  );
}

// Fix S6774: Added props validation
Home.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default Home;