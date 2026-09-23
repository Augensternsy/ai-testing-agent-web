import type { PipelineStage } from '../types/testing';

interface StageProgressProps {
  stages: PipelineStage[];
}

const stageIcons: Record<string, string> = {
  pending: '○',
  running: '',
  completed: '✓',
  failed: '✕',
};

export default function StageProgress({ stages }: StageProgressProps) {
  return (
    <div className="stage-list">
      {stages.map((s, i) => (
        <div key={i} className={`stage-item ${s.status}`}>
          <div className={`stage-icon ${s.status}`}>
            {s.status === 'running' ? <div className="stage-spinner" /> : stageIcons[s.status]}
          </div>
          <div className="stage-info">
            <div className="stage-name">
              Stage {s.stage} — {s.name}
              {s.isAI && <span className="ai-tag">AI</span>}
            </div>
            {s.detail && <div className="stage-detail">{s.detail}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
