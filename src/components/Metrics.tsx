interface MetricItem {
  value: string;
  label: string;
  variant: 'pass' | 'info';
}

const metrics: MetricItem[] = [
  { value: '89/89', label: 'Regression Tests', variant: 'pass' },
  { value: 'Passing', label: 'GitHub Actions', variant: 'pass' },
  { value: '11/11', label: 'Real DeepSeek E2E', variant: 'pass' },
  { value: 'PASS', label: 'Stage 5 Agent Repair', variant: 'pass' },
  { value: '5', label: 'Failure Categories', variant: 'info' },
  { value: '2', label: 'Max Repair Attempts', variant: 'info' },
];

export default function Metrics() {
  return (
    <section className="section" id="metrics">
      <div className="container">
        <h2 className="section-title">Verified Metrics</h2>
        <p className="section-subtitle">Project-level verification results — not browser-generated numbers.</p>
        <div className="metrics-grid">
          {metrics.map((m) => (
            <div key={m.label} className="metric-card">
              <div className={`metric-value ${m.variant}`}>{m.value}</div>
              <div className="metric-label">{m.label}</div>
              <div className="metric-verified">Verified</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
