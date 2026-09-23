import { useState, useEffect, useCallback } from 'react';
import type { DemoRunResult, PipelineStage, RunMode } from '../types/testing';
import { getHealth, runDemo, runShowcase } from '../services/api';
import StageProgress from './StageProgress';
import TestCasesTable from './TestCasesTable';
import CodeViewer from './CodeViewer';
import TestReport from './TestReport';
import AgentAnalysis from './AgentAnalysis';

interface DemoPanelProps {
  triggerRun: number;
}

const scenarios = [
  { id: 'login', method: 'POST', path: '/login' },
  { id: 'users', method: 'GET', path: '/users/{id}' },
  { id: 'health', method: 'GET', path: '/health' },
];

const defaultInputs: Record<string, string> = {
  login: JSON.stringify({ username: 'test', password: '123456' }, null, 2),
  users: '1',
  health: '',
};

export default function DemoPanel({ triggerRun }: DemoPanelProps) {
  const [mode, setMode] = useState<RunMode>('showcase');
  const [selectedScenario, setSelectedScenario] = useState('login');
  const [inputValue, setInputValue] = useState(defaultInputs['login']);
  const [isRunning, setIsRunning] = useState(false);
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [result, setResult] = useState<DemoRunResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check backend health on mount
  useEffect(() => {
    getHealth().then((ok) => {
      setMode(ok ? 'live' : 'showcase');
    });
  }, []);

  // Update input when scenario changes
  const handleScenarioChange = (id: string) => {
    setSelectedScenario(id);
    setInputValue(defaultInputs[id] ?? '');
    setResult(null);
    setStages([]);
    setError(null);
  };

  const runPipeline = useCallback(async () => {
    setIsRunning(true);
    setError(null);
    setResult(null);

    const stageDefs: { stage: number; name: string; isAI?: boolean; detail: string }[] = [
      { stage: 1, name: 'OpenAPI Parser', detail: 'Parsing OpenAPI schema...' },
      { stage: 2, name: 'RAG Retrieval', isAI: true, detail: 'Retrieving testing knowledge...' },
      { stage: 2, name: 'DeepSeek Case Generation', isAI: true, detail: 'Generating test cases...' },
      { stage: 3, name: 'PyTest Generator', detail: 'Generating PyTest code...' },
      { stage: 4, name: 'Test Runner', detail: 'Executing tests...' },
      { stage: 5, name: 'Failure Analyzer', detail: 'Analyzing failures...' },
    ];

    // Animate stages
    const animatedStages: PipelineStage[] = [];
    for (let i = 0; i < stageDefs.length; i++) {
      // Mark all previous as completed
      for (let j = 0; j < i; j++) {
        animatedStages[j] = { ...stageDefs[j], status: 'completed' };
      }
      // Mark current as running
      animatedStages[i] = { ...stageDefs[i], status: 'running' };
      setStages([...animatedStages]);
      await new Promise((r) => setTimeout(r, 500 + Math.random() * 400));
    }

    // Execute actual run
    try {
      let runResult: DemoRunResult;
      if (mode === 'live') {
        const input = selectedScenario === 'login' ? JSON.parse(inputValue) : inputValue;
        runResult = await runDemo(selectedScenario, input);
      } else {
        runResult = await runShowcase(selectedScenario);
      }

      // Mark all stages completed
      animatedStages.forEach((_, i) => {
        animatedStages[i] = { ...stageDefs[i], status: 'completed' };
      });
      setStages([...animatedStages]);
      setResult(runResult);
    } catch (err) {
      // Fallback to showcase if live fails
      if (mode === 'live') {
        setMode('showcase');
        const showcaseResult = await runShowcase(selectedScenario);
        animatedStages.forEach((_, i) => {
          animatedStages[i] = { ...stageDefs[i], status: 'completed' };
        });
        setStages([...animatedStages]);
        setResult(showcaseResult);
      } else {
        setError(err instanceof Error ? err.message : 'Unknown error');
        animatedStages.forEach((_, i) => {
          animatedStages[i] = { ...stageDefs[i], status: 'failed' };
        });
        setStages([...animatedStages]);
      }
    } finally {
      setIsRunning(false);
    }
  }, [mode, selectedScenario, inputValue]);

  // Handle external trigger (from Hero "Run Live Demo" button)
  useEffect(() => {
    if (triggerRun > 0) {
      runPipeline();
    }
  }, [triggerRun]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRunClick = () => {
    if (!isRunning) runPipeline();
  };

  const selectedMethod = scenarios.find((s) => s.id === selectedScenario)?.method ?? '';
  const selectedPath = scenarios.find((s) => s.id === selectedScenario)?.path ?? '';

  return (
    <section className="section" id="demo">
      <div className="container">
        <h2 className="section-title">Live AI Testing Demo</h2>
        <p className="section-subtitle">Select a demo API endpoint and run the AI testing pipeline.</p>

        <div className="demo-panel">
          <div className="demo-header">
            <div>
              <span style={{ fontWeight: 600 }}>Demo Console</span>
            </div>
            <div className={`demo-mode-badge ${mode}`}>
              {mode === 'live' ? '● LIVE' : '● SHOWCASE'}
            </div>
          </div>

          {mode === 'showcase' && (
            <div className="showcase-banner">
              Showcase Mode — Backend demo service is currently offline. Showing a verified example run.
            </div>
          )}

          <div className="demo-body">
            {/* Scenario selector */}
            <div className="demo-select-row">
              <select className="demo-select" value={selectedScenario} onChange={(e) => handleScenarioChange(e.target.value)} disabled={isRunning}>
                {scenarios.map((s) => (
                  <option key={s.id} value={s.id}>{s.method} {s.path}</option>
                ))}
              </select>
            </div>

            {/* Input area */}
            <div className="demo-input-area">
              <div className="demo-input-label">
                {selectedMethod === 'POST' ? 'Request Body (JSON)' : selectedPath.includes('{id}') ? 'Path Parameter (user_id)' : 'No parameters required'}
              </div>
              {selectedMethod === 'POST' ? (
                <textarea
                  className="demo-input-editor"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isRunning}
                />
              ) : selectedPath.includes('{id}') ? (
                <input
                  className="demo-input-editor"
                  style={{ minHeight: 'auto', height: '40px' }}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isRunning}
                />
              ) : (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '12px 0' }}>GET /health requires no input parameters.</div>
              )}
            </div>

            <button className="btn-primary demo-run-btn" onClick={handleRunClick} disabled={isRunning}>
              {isRunning ? 'Running Pipeline...' : 'Run AI Testing Agent'}
            </button>

            {error && (
              <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(249,81,73,0.1)', border: '1px solid rgba(249,81,73,0.3)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-red)', fontSize: '0.85rem' }}>
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Stage progress */}
        {stages.length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Pipeline Progress</h3>
            <StageProgress stages={stages} />
          </div>
        )}

        {/* Results */}
        {result && (
          <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Generated Test Cases</h3>
              <TestCasesTable cases={result.test_cases} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Generated PyTest</h3>
              <CodeViewer code={result.generated_code} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Test Execution Report</h3>
              <TestReport report={result.report} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Agent Failure Analysis</h3>
              <AgentAnalysis agent={result.agent} />
            </div>
            {mode === 'showcase' && (
              <div style={{ padding: '12px 16px', background: 'rgba(88,166,255,0.05)', border: '1px solid rgba(88,166,255,0.2)', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Verified example from Real DeepSeek E2E — not a live result.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
