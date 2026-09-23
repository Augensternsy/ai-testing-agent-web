import type { DemoRunResult } from '../types/testing';

/**
 * Verified example from Real DeepSeek E2E run (2026-09-23).
 * Source: reports/real_llm_e2e_report.json + generated_tests/test_login_real_llm.py
 * This data is NOT a live result — it is a sanitized, verified snapshot.
 */
export const showcaseRun: DemoRunResult = {
  run_id: 'verified-deepseek-login-20260923',
  mode: 'showcase',
  stages: [
    { stage: 1, name: 'OpenAPI Parser', status: 'completed', detail: 'Parsed POST /login schema' },
    { stage: 2, name: 'RAG Retrieval', status: 'completed', detail: 'Retrieved testing standard from Chroma', isAI: true },
    { stage: 2, name: 'DeepSeek Case Generation', status: 'completed', detail: 'Generated 11 test cases', isAI: true },
    { stage: 3, name: 'PyTest Generator', status: 'completed', detail: 'Generated test_login_real_llm.py' },
    { stage: 4, name: 'Test Runner', status: 'completed', detail: '11/11 passed' },
    { stage: 5, name: 'Failure Analyzer', status: 'completed', detail: 'No failures detected' },
  ],
  test_cases: [
    { case_id: 'LOGIN_001', title: 'Valid login', type: 'normal', priority: 'P0', expected_status: 200 },
    { case_id: 'LOGIN_002', title: 'Missing username', type: 'exception', priority: 'P0', expected_status: 422 },
    { case_id: 'LOGIN_003', title: 'Missing password', type: 'exception', priority: 'P0', expected_status: 422 },
    { case_id: 'LOGIN_004', title: 'Empty username', type: 'exception', priority: 'P1', expected_status: 422 },
    { case_id: 'LOGIN_005', title: 'Empty password', type: 'exception', priority: 'P1', expected_status: 422 },
    { case_id: 'LOGIN_006', title: 'Non-string username', type: 'exception', priority: 'P1', expected_status: 422 },
    { case_id: 'LOGIN_007', title: 'Non-string password', type: 'exception', priority: 'P1', expected_status: 422 },
    { case_id: 'LOGIN_008', title: 'Oversized password (128+ chars)', type: 'boundary', priority: 'P1', expected_status: 422 },
    { case_id: 'LOGIN_009', title: 'Wrong username', type: 'exception', priority: 'P0', expected_status: 401 },
    { case_id: 'LOGIN_010', title: 'Wrong password', type: 'exception', priority: 'P0', expected_status: 401 },
    { case_id: 'LOGIN_011', title: 'Both credentials wrong', type: 'exception', priority: 'P1', expected_status: 401 },
  ],
  generated_code: `import os
import requests

BASE_URL = os.getenv("TEST_BASE_URL", "http://127.0.0.1:8000")


def _build_url(path_template, path_params):
    path = path_template
    for key, value in path_params.items():
        path = path.replace("{" + key + "}", str(value))
    return BASE_URL.rstrip("/") + "/" + path.lstrip("/")


def test_login_001():
    path_params = {}
    query_params = {}
    headers = {}
    body = {'username': 'test', 'password': '123456'}

    url = _build_url('/login', path_params)
    response = requests.request(
        method="POST", url=url,
        params=query_params, headers=headers, json=body,
    )
    assert response.status_code == 200


def test_login_002():
    path_params = {}
    query_params = {}
    headers = {}
    body = {'password': '123456'}

    url = _build_url('/login', path_params)
    response = requests.request(
        method="POST", url=url,
        params=query_params, headers=headers, json=body,
    )
    assert response.status_code == 422`,
  report: {
    total: 11,
    passed: 11,
    failed: 0,
    skipped: 0,
    pass_rate: 1.0,
    duration: 1.23,
  },
  agent: {
    triggered: false,
  },
};

/** Verified Stage 5 Agent Repair example (from reports/agent_report.json) */
export const showcaseRepairExample = {
  test_name: 'test_agent_demo_001',
  category: 'test_code_error',
  confidence: 0.92,
  root_cause: '检测到测试代码错误: NameError',
  repair_allowed: true,
  repair_attempted: true,
  repair_success: true,
  initial_run: { total: 1, passed: 0, failed: 1, errors: 0 },
  rerun: { total: 1, passed: 1, failed: 0, errors: 0 },
  final_status: 'passed',
  repair_attempts: 1,
};
