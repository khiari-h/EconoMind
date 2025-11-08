function Home({ navigate }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to EconoMind
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Learn economics with AI-powered Professor and Coach agents
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Professor Card */}
        <div 
          className="bg-professor-light border-2 border-professor rounded-2xl p-8 cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
          onClick={() => navigate('professor')}
        >
          <div className="text-5xl mb-4">🎓</div>
          <h2 className="text-3xl font-bold text-professor-dark mb-4">
            The Professor
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Expert explanations of economic concepts with clear examples and theory
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-professor mr-2">✓</span>
              <span>Clear concept explanations</span>
            </li>
            <li className="flex items-start">
              <span className="text-professor mr-2">✓</span>
              <span>Real-world examples</span>
            </li>
            <li className="flex items-start">
              <span className="text-professor mr-2">✓</span>
              <span>Theoretical foundations</span>
            </li>
          </ul>
          <button className="mt-6 w-full bg-professor text-white py-3 rounded-lg font-semibold hover:bg-professor-dark transition">
            Chat with Professor
          </button>
        </div>

        {/* Coach Card */}
        <div 
          className="bg-coach-light border-2 border-coach rounded-2xl p-8 cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
          onClick={() => navigate('coach')}
        >
          <div className="text-5xl mb-4">💪</div>
          <h2 className="text-3xl font-bold text-coach-dark mb-4">
            The Coach
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Practical exercises, case studies, and hands-on learning applications
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-coach mr-2">✓</span>
              <span>Practical exercises</span>
            </li>
            <li className="flex items-start">
              <span className="text-coach mr-2">✓</span>
              <span>Case study analysis</span>
            </li>
            <li className="flex items-start">
              <span className="text-coach mr-2">✓</span>
              <span>Mini-essays guidance</span>
            </li>
          </ul>
          <button className="mt-6 w-full bg-coach text-white py-3 rounded-lg font-semibold hover:bg-coach-dark transition">
            Train with Coach
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to start learning?
        </h3>
        <p className="text-gray-600 mb-6">
          Explore our courses and begin your economics journey
        </p>
        <button 
          onClick={() => navigate('courses')}
          className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition"
        >
          Browse Courses
        </button>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-gray-500">
        <p className="text-sm">
          Built for Cloud Run Hackathon 2024 - AI Agents Category
        </p>
      </div>
    </div>
  )
}

export default Home
