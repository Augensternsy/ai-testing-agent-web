import { useLanguage } from '../context/LanguageContext';

export default function Metrics() {
  const { t } = useLanguage();

  const metrics = [
    { value: '89/89', label: t.metrics.regression, variant: 'pass' as const },
    { value: 'Passing', label: t.metrics.githubActions, variant: 'pass' as const },
    { value: '11/11', label: t.metrics.deepseek, variant: 'pass' as const },
    { value: 'PASS', label: t.metrics.stage5, variant: 'pass' as const },
    { value: '5', label: t.metrics.categories, variant: 'info' as const },
    { value: '2', label: t.metrics.maxAttempts, variant: 'info' as const },
  ];

  return (
    <section className="section" id="metrics">
      <div className="container">
        <h2 className="section-title">{t.metrics.title}</h2>
        <p className="section-subtitle">{t.metrics.subtitle}</p>
        <div className="metrics-grid">
          {metrics.map((m) => (
            <div key={m.label} className="metric-card">
              <div className={`metric-value ${m.variant}`}>{m.value}</div>
              <div className="metric-label">{m.label}</div>
              <div className="metric-verified">{t.metrics.verified}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
