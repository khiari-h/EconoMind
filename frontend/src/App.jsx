import { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Courses from './components/Courses';
import Professor from './components/Professor';
import Coach from './components/Coach';
import CourseReader from './components/CourseReader';
import About from './components/About'; // This import is now used

function App() {
  const [page, setPage] = useState('home');
  const [course, setCourse] = useState(null);
  const [viewedCourses, setViewedCourses] = useState([]); // <-- This is our "memory" of viewed courses

  const navigate = (newPage, newCourse = null) => {
    // If navigating to an agent without a new course, keep the old one
    if ((newPage === 'professor' || newPage === 'coach') && newCourse === null) {
      // Do nothing, the course is already in the state
    } else {
      setCourse(newCourse);
    }

    // If reading a course, add it to the history if it's not already there
    if (newPage === 'read' && newCourse && !viewedCourses.some(c => c.id === newCourse.id)) {
      setViewedCourses(prev => [...prev, newCourse]);
    }

    setPage(newPage);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const renderPage = () => {
    switch (page) {
      case 'courses':
        return <Courses navigate={navigate} />;
      case 'professor':
        // Pass the history to our agents!
        return <Professor course={course} navigate={navigate} viewedCourses={viewedCourses} />;
      case 'coach':
        return <Coach course={course} navigate={navigate} viewedCourses={viewedCourses} />;
      case 'read':
        return <CourseReader courseId={course?.id} />;
      case 'about':
        return <About />;
      case 'home':
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <Layout navigate={navigate} currentPage={page}>
      {renderPage()}
    </Layout>
  );
}

export default App;