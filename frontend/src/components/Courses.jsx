import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const API_URL = "https://economind-backend-847559264991.europe-west1.run.app"

/**
 * Displays the list of available courses.
 * @param {object} props The component props.
 * @param {(page: string, course?: object) => void} props.navigate Function to handle page navigation.
 * @returns {JSX.Element}
 */
function Courses({ navigate }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/api/courses`)
      const data = await response.json()
      setCourses(data.courses || [])
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const readCourse = (course) => {
    // Navigate to the component to read the course
    navigate('read', course)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-xl text-gray-600">Loading courses...</div>
      </div>
    )
  }

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500">
          Available Courses
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Choose a course to start learning or read its content
        </p>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {courses.map((course) => (
          <div 
            key={course.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border-t-4 border-blue-600"
          >
            <div className="p-6 flex-grow">
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                {course.title}
              </h2>
              <p className="text-slate-600 mb-6 min-h-[4.5rem]">
                {course.description}
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-b-xl border-t border-slate-200">
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => readCourse(course)}
                  className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  📖 Read Course
                </button>               
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center text-slate-500 mt-8">
          <p>No courses available at the moment.</p>
        </div>
      )}
      </div>
    </div>
  )
}

Courses.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default Courses
