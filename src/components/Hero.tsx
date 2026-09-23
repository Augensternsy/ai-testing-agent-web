import { useLanguage } from '../context/LanguageContext';

const GITHUB_URL = 'https://github.com/Augensternsy/ai-testing-agent';

interface HeroProps {
  onRunDemo: () => void;
}

export default function Hero({ onRunDemo }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="hero" id="overview">
      <div className="container">
        <h1>{t.hero.titleMain} <span className="gradient">{t.hero.titleHighlight}</span></h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
        <p className="hero-desc">{t.hero.desc}</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={onRunDemo}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/></svg>
            {t.hero.runDemo}
          </button>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.545 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            {t.hero.viewGithub}
          </a>
        </div>
        <div className="tech-tags">
          <span className="tech-tag">OpenAPI</span>
          <span className="tech-tag">RAG</span>
          <span className="tech-tag">DeepSeek</span>
          <span className="tech-tag">PyTest</span>
          <span className="tech-tag">FastAPI</span>
          <span className="tech-tag">GitHub Actions</span>
        </div>
      </div>
    </section>
  );
}
