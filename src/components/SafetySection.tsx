import { useLanguage } from '../context/LanguageContext';

export default function SafetySection() {
  const { t } = useLanguage();

  const guardrails = [
    t.safety.g1, t.safety.g2, t.safety.g3, t.safety.g4,
    t.safety.g5, t.safety.g6, t.safety.g7, t.safety.g8,
    t.safety.g9, t.safety.g10, t.safety.g11,
  ];

  return (
    <section className="section" id="safety">
      <div className="container">
        <h2 className="section-title">{t.safety.title}</h2>
        <p className="section-subtitle">{t.safety.subtitle}</p>
        <div className="safety-grid">
          {guardrails.map((g) => (
            <div key={g} className="safety-item">
              <span className="safety-check">✓</span>
              <span className="safety-text">{g}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
