import React from 'react';
import PropTypes from 'prop-types';

/**
 * Navbar component — displays the main navigation of EconoMind.
 *
 * @param {Object} props
 * @param {(page: string) => void} props.navigate - Function to handle navigation.
 * @param {string} props.currentPage - Name of the currently active page.
 * @returns {JSX.Element}
 */
function Navbar({ navigate, currentPage }) {
  // Unified styling for all navigation buttons
  const navLinkClasses = (page) =>
    `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
      currentPage === page
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left side: Logo */}
          <button
            className="flex-shrink-0 font-bold text-xl text-slate-800 focus:outline-none flex items-center gap-2"
            onClick={() => navigate('home')}
            aria-label="Go to homepage"
          >
            <span>🧠</span>
            <span>EconoMind</span>
          </button>

          {/* Right side: Navigation links */}
          <div className="hidden md:flex items-center space-x-2">
            <button onClick={() => navigate('home')} className={navLinkClasses('home')}>
              Home
            </button>
            <button onClick={() => navigate('courses')} className={navLinkClasses('courses')}>
              Courses
            </button>
            <button onClick={() => navigate('professor')} className={navLinkClasses('professor')}>
              Professor
            </button>
            <button onClick={() => navigate('coach')} className={navLinkClasses('coach')}>
              Coach
            </button>
            <button onClick={() => navigate('about')} className={navLinkClasses('about')}>
              About
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

// ✅ PropTypes validation
Navbar.propTypes = {
  navigate: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired,
};

export default Navbar;
