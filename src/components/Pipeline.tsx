import { useLanguage } from '../context/LanguageContext';

interface Step {
  name: string;
  type: 'ai' | 'det';
}

const flow: Step[] = [
  { name: 'OpenAPI', type: 'det' },
  { name: 'Parser', type: 'det' },
  { name: 'RAG', type: 'ai' },
  { name: 'DeepSeek', type: 'ai' },
  { name: 'Test Cases', type: 'det' },
  { name: 'PyTest Gen', type: 'det' },
  { name: 'Runner', type: 'det' },
  { name: 'Report', type: 'det' },
  { name: 'Failure Analyzer', type: 'ai' },
  { name: 'Safe Repair', type: 'ai' },
  { name: 'Re-run', type: 'det' },
];

export default function Pipeline() {
  const { t } = useLanguage();

  return (
    <section className="section" id="architecture">
      <div className="container">
        <h2 className="section-title">{t.pipeline.title}</h2>
        <p className="section-subtitle">{t.pipeline.subtitle}</p>
        <div className="pipeline-flow">
          {flow.map((step, i) => (
            <div key={step.name} style={{ display: 'contents' }}>
              <div className={`pipeline-step ${step.type === 'ai' ? 'ai' : 'deterministic'}`}>
                <div className="pipeline-step-icon">{step.type === 'ai' ? '🤖' : '⚙️'}</div>
                <div className="pipeline-step-name">{step.name}</div>
                <div className="pipeline-step-type">{step.type === 'ai' ? 'AI' : t.pipeline.det}</div>
              </div>
              {i < flow.length - 1 && <div className="pipeline-arrow">→</div>}
            </div>
          ))}
        </div>
        <div className="pipeline-legend">
          <div className="legend-item"><div className="legend-dot ai" /> {t.pipeline.ai}</div>
          <div className="legend-item"><div className="legend-dot det" /> {t.pipeline.det}</div>
        </div>
      </div>
    </section>
  );
}
