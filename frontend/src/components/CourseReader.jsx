import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import PropTypes from 'prop-types';
import remarkGfm from "remark-gfm";

const API_URL = "https://economind-backend-847559264991.europe-west1.run.app";

function CourseReader({ courseId }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      setLoading(true);
      if (!courseId) {
        setCourse({ title: "No Course Selected", content: "Please select a course from the courses page to read its content." });
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_URL}/api/courses/${courseId}`);
        if (!res.ok) throw new Error("Course not found");
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error(err);
        setCourse({
          title: "Course Not Found",
          content: "Sorry, the requested course could not be found."
        });
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-stone-50">
        <p className="text-xl text-blue-800">Loading course...</p>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 sm:p-10 lg:p-12">
          <div className="prose prose-lg max-w-none 
                          prose-headings:font-semibold prose-headings:text-slate-800
                          prose-h1:text-4xl prose-h1:mb-2
                          prose-h2:text-2xl prose-h2:border-b prose-h2:border-stone-200 prose-h2:pb-3 prose-h2:mt-10 prose-h2:mb-4
                          prose-p:text-stone-700 prose-p:leading-relaxed
                          prose-strong:text-stone-900
                          prose-a:text-blue-600 hover:prose-a:text-blue-800
                          prose-li:marker:text-blue-500
                          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-stone-600
                          prose-pre:bg-slate-800 prose-pre:text-white prose-pre:rounded-lg prose-pre:p-4
        ">
          <h1>{course.title}</h1>
          <p className="lead text-slate-600">{course.description || ""}</p>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {course.content}
          </ReactMarkdown>
        </div>
        </div>
      </div>
    </div>
  );
}

CourseReader.propTypes = {
  courseId: PropTypes.string,
};

export default CourseReader;
