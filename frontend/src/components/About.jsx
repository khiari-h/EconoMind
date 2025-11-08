import React from 'react';

function About() {
  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 lg:p-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-400">
              🧠 About EconoMind
            </h1>
            <p className="text-lg text-slate-600">
              An interactive AI-driven learning platform that helps students understand economics through intelligent conversational agents.
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-slate-700">
            <p>
              It was built for the Cloud Run Hackathon 2025 – AI Agents Category.
            </p>
            <p>
              The project features two specialized AI agents powered by Google Gemini API through Google ADK:
            </p>

            <ul>
              <li><strong>🎓 The Professor</strong> – explains economic theories with clarity and real-world examples.</li>
              <li><strong>💪 The Coach</strong> – provides practical exercises, feedback, and encouragement for hands-on learning.</li>
            </ul>
            
            <p>
              In this first version, both agents focus on real-time question–answer interaction.
              When a learner faces difficulty understanding a concept, the Professor or the Coach instantly responds with clear explanations or guided exercises.
            </p>

            <h2>Our Long-Term Vision</h2>
            <p>Our long-term vision is to make these agents increasingly autonomous — able to track progress, adapt their teaching style, and collaborate to create a personalized tutoring experience across multiple subjects beyond economics.</p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default About;