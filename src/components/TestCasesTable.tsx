import type { TestCase } from '../types/testing';

interface TestCasesTableProps {
  cases: TestCase[];
}

export default function TestCasesTable({ cases }: TestCasesTableProps) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Priority</th>
            <th>Expected Status</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr key={c.case_id}>
              <td style={{ fontFamily: 'var(--font-mono)' }}>{c.case_id}</td>
              <td>{c.title}</td>
              <td><span className={`badge ${c.type}`}>{c.type}</span></td>
              <td><span className={`badge priority-${c.priority.toLowerCase()}`}>{c.priority}</span></td>
              <td style={{ fontFamily: 'var(--font-mono)' }}>{c.expected_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
