import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

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

  const selectCourse = (course, agent) => {
    navigate(agent, course)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-xl text-gray-600">Loading courses...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Available Courses
        </h1>
        <p className="text-lg text-gray-600">
          Choose a course to start learning with our AI agents
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {courses.map((course) => (
          <div 
            key={course.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {course.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {course.description}
            </p>
            
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-4">
                Learn with:
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => selectCourse(course, 'professor')}
                  className="flex-1 bg-professor text-white py-2 px-4 rounded-lg hover:bg-professor-dark transition font-semibold"
                >
                  🎓 Professor
                </button>
                <button
                  onClick={() => selectCourse(course, 'coach')}
                  className="flex-1 bg-coach text-white py-2 px-4 rounded-lg hover:bg-coach-dark transition font-semibold"
                >
                  💪 Coach
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center text-gray-500">
          <p>No courses available at the moment.</p>
        </div>
      )}
    </div>
  )
}

export default Courses
