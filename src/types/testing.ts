// ===================== Enums =====================

export type StageStatus = 'pending' | 'running' | 'completed' | 'failed';

export type TestType = 'normal' | 'boundary' | 'exception';

export type Priority = 'P0' | 'P1' | 'P2';

export type RunMode = 'live' | 'showcase';

// ===================== Domain Types =====================

export interface DemoScenario {
  id: string;
  method: string;
  path: string;
}

export interface PipelineStage {
  stage: number;
  name: string;
  status: StageStatus;
  detail?: string;
  isAI?: boolean;
}

export interface TestCase {
  case_id: string;
  title: string;
  type: TestType;
  priority: Priority;
  expected_status: number;
}

export interface TestReport {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  pass_rate: number;
  duration: number;
}

export interface AgentAnalysis {
  triggered: boolean;
  test_name?: string;
  category?: string;
  confidence?: number;
  root_cause?: string;
  repair_allowed?: boolean;
  repair_attempted?: boolean;
  repair_success?: boolean;
  initial_run?: { total: number; passed: number; failed: number; errors: number };
  rerun?: { total: number; passed: number; failed: number; errors: number };
  final_status?: string;
  repair_attempts?: number;
}

export interface DemoRunResult {
  run_id: string;
  mode: RunMode;
  stages: PipelineStage[];
  test_cases: TestCase[];
  generated_code: string;
  report: TestReport;
  agent: AgentAnalysis;
}
