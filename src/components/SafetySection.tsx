const guardrails = [
  'Repair only test_code_error',
  'Confidence >= 0.80',
  'Maximum repair attempts = 2',
  'Backup before repair',
  'Audit log',
  'Compile validation',
  'No test deletion',
  'No assert reduction',
  'No skip / xfail',
  'No dangerous subprocess injection',
  'Only generated_tests/ can be modified',
];

export default function SafetySection() {
  return (
    <section className="section" id="safety">
      <div className="container">
        <h2 className="section-title">Safety Design</h2>
        <p className="section-subtitle">Safe Repair Guardrails — the agent cannot modify business source code.</p>
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
