import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import Pipeline from './components/Pipeline';
import DemoPanel from './components/DemoPanel';
import SafetySection from './components/SafetySection';

const GITHUB_URL = 'https://github.com/Augensternsy/ai-testing-agent';

export default function App() {
  const [triggerRun, setTriggerRun] = useState(0);

  const handleRunDemo = () => {
    setTriggerRun((prev) => prev + 1);
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <Hero onRunDemo={handleRunDemo} />
      <Metrics />
      <Pipeline />
      <DemoPanel triggerRun={triggerRun} />
      <SafetySection />

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub Repository</a>
            <a href={`${GITHUB_URL}/actions`} target="_blank" rel="noopener noreferrer">CI Status</a>
            <a href={`${GITHUB_URL}/blob/master/README.md`} target="_blank" rel="noopener noreferrer">README</a>
          </div>
          <p className="footer-text">AI Agent Automated Testing Platform — Built for Test Engineering interviews</p>
        </div>
      </footer>
    </>
  );
}
