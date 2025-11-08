import { useState } from 'react'
import Home from './components/Home'
import Professor from './components/Professor'
import Coach from './components/Coach'
import Courses from './components/Courses'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedCourse, setSelectedCourse] = useState(null)

  const navigate = (page, course = null) => {
    setCurrentPage(page)
    setSelectedCourse(course)
  }

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('home')}
            >
              <span className="text-2xl font-bold text-primary-600">
                💡 EconoMind
              </span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('courses')}
                className="px-4 py-2 text-gray-700 hover:text-primary-600 transition"
              >
                Courses
              </button>
              <button
                onClick={() => navigate('professor')}
                className="px-4 py-2 bg-professor text-white rounded-lg hover:bg-professor-dark transition"
              >
                Professor
              </button>
              <button
                onClick={() => navigate('coach')}
                className="px-4 py-2 bg-coach text-white rounded-lg hover:bg-coach-dark transition"
              >
                Coach
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentPage === 'home' && <Home navigate={navigate} />}
        {currentPage === 'courses' && <Courses navigate={navigate} />}
        {currentPage === 'professor' && <Professor course={selectedCourse} />}
        {currentPage === 'coach' && <Coach course={selectedCourse} />}
      </main>
    </div>
  )
}

export default App
