import { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import Pipeline from './components/Pipeline';
import DemoPanel from './components/DemoPanel';
import SafetySection from './components/SafetySection';

const GITHUB_URL = 'https://github.com/Augensternsy/ai-testing-agent';

function AppContent() {
  const { t } = useLanguage();
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

      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">{t.footer.links}</a>
            <a href={`${GITHUB_URL}/actions`} target="_blank" rel="noopener noreferrer">{t.footer.ci}</a>
            <a href={`${GITHUB_URL}/blob/master/README.md`} target="_blank" rel="noopener noreferrer">{t.footer.readme}</a>
          </div>
          <p className="footer-text">{t.footer.text}</p>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
