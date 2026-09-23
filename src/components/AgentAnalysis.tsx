import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { AgentAnalysis as AgentAnalysisData } from '../types/testing';
import { showcaseRepairExample } from '../data/demoRun';

interface AgentAnalysisProps {
  agent: AgentAnalysisData;
}

export default function AgentAnalysis({ agent }: AgentAnalysisProps) {
  const { t } = useLanguage();
  const [showExample, setShowExample] = useState(false);

  if (!agent.triggered) {
    return (
      <div className="agent-card">
        <h3 style={{ marginBottom: '12px' }}>{t.agent.title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '12px' }}>
          {t.agent.noFailures} {t.agent.notTriggered}
        </p>
        <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.82rem' }} onClick={() => setShowExample(!showExample)}>
          {showExample ? t.agent.hideExample : t.agent.viewExample}
        </button>
        {showExample && (
          <div style={{ marginTop: '16px' }}>
            <div className="agent-flow">
              <div className="agent-step">
                <span className="agent-step-label">{t.agent.failure}</span>
                <span className="agent-step-value" style={{ color: 'var(--accent-red)' }}>NameError</span>
              </div>
              <div className="agent-arrow">↓</div>
              <div className="agent-step">
                <span className="agent-step-label">{t.agent.failureCategory}</span>
                <span className="agent-step-value">{showcaseRepairExample.category}</span>
              </div>
              <div className="agent-arrow">↓</div>
              <div className="agent-step">
                <span className="agent-step-label">{t.agent.confidence}</span>
                <span className="agent-step-value">{showcaseRepairExample.confidence}</span>
              </div>
              <div className="agent-arrow">↓</div>
              <div className="agent-step">
                <span className="agent-step-label">{t.agent.repairAllowed}</span>
                <span className="agent-step-value" style={{ color: 'var(--accent-green)' }}>
                  {showcaseRepairExample.repair_allowed ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="agent-arrow">↓</div>
              <div className="agent-step">
                <span className="agent-step-label">{t.agent.safetyValidation}</span>
                <span className="agent-step-value" style={{ color: 'var(--accent-green)' }}>{t.report.passed}</span>
              </div>
              <div className="agent-arrow">↓</div>
              <div className="agent-step">
                <span className="agent-step-label">{t.agent.rerun}</span>
                <span className="agent-step-value" style={{ color: 'var(--accent-green)' }}>{t.report.passed}</span>
              </div>
            </div>
            <div className="agent-note" style={{ marginTop: '12px' }}>
              {t.agent.agentNote}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="agent-card">
      <h3 style={{ marginBottom: '12px' }}>{t.agent.title}</h3>
      <div className="agent-flow">
        {agent.root_cause && (
          <div className="agent-step">
            <span className="agent-step-label">{t.agent.rootCause}</span>
            <span className="agent-step-value" style={{ color: 'var(--accent-red)' }}>{agent.root_cause}</span>
          </div>
        )}
        {agent.category && (
          <div className="agent-step">
            <span className="agent-step-label">{t.agent.failureCategory}</span>
            <span className="agent-step-value">{agent.category}</span>
          </div>
        )}
        {agent.confidence !== undefined && (
          <div className="agent-step">
            <span className="agent-step-label">{t.agent.confidence}</span>
            <span className="agent-step-value">{agent.confidence}</span>
          </div>
        )}
        {agent.repair_allowed !== undefined && (
          <div className="agent-step">
            <span className="agent-step-label">{t.agent.repairAllowed}</span>
            <span className="agent-step-value" style={{ color: agent.repair_allowed ? 'var(--accent-green)' : 'var(--accent-red)' }}>
              {agent.repair_allowed ? 'Yes' : 'No'}
            </span>
          </div>
        )}
        {agent.repair_success !== undefined && (
          <div className="agent-step">
            <span className="agent-step-label">{t.agent.repairResult}</span>
            <span className="agent-step-value" style={{ color: agent.repair_success ? 'var(--accent-green)' : 'var(--accent-red)' }}>
              {agent.repair_success ? 'Success' : 'Failed'}
            </span>
          </div>
        )}
        {agent.final_status && (
          <div className="agent-step">
            <span className="agent-step-label">{t.agent.finalStatus}</span>
            <span className="agent-step-value" style={{ color: agent.final_status === 'passed' ? 'var(--accent-green)' : 'var(--accent-red)' }}>
              {agent.final_status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
