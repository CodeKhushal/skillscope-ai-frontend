// frontend/src/App.jsx
import { useState } from "react";
import ResumeUpload from "./components/ResumeUpload";
import JobMatches from "./components/JobMatches";
import SkillGap from "./components/SkillGap";
import { Analytics } from '@vercel/analytics/react';
import "./App.css";

// A simple spinner component
const Loader = () => <div className="loader"></div>;

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // When a new analysis is set, reset the selected job
  const handleSetAnalysis = (newAnalysis) => {
    setAnalysis(newAnalysis);
    setSelectedJob(null); // Deselect job when new resume is analyzed
  };

  return (
    <div className="App">
      <div className="layout-container">
        <header className="App-header">
          <h1>SkillScope AI</h1>
          <p className="subtitle">Analyze Your Resume, Discover Your Future</p>
        </header>
        <main>
          <ResumeUpload
            setAnalysis={handleSetAnalysis}
            setLoading={setLoading}
            setError={setError}
          />

          {loading && <Loader />}

          {error && <div className="error-message card">{error}</div>}

          {analysis && !loading && (
            <div className="results-grid">
              <JobMatches
                jobSuggestions={analysis.jobSuggestions}
                setSelectedJob={setSelectedJob}
                selectedJob={selectedJob}
              />
              <SkillGap job={selectedJob || analysis.jobSuggestions[0]} />
            </div>
          )}
        </main>
      </div>
      <footer className="App-footer">
        <p>Made by Khushal Sachdeva & Ishita Jain</p>
      </footer>
      <Analytics />
    </div>
  );
}

export default App;
