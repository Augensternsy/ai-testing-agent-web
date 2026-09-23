import { useLanguage } from '../context/LanguageContext';
import type { TestCase } from '../types/testing';

interface TestCasesTableProps {
  cases: TestCase[];
}

export default function TestCasesTable({ cases }: TestCasesTableProps) {
  const { t } = useLanguage();

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>{t.table.caseId}</th>
            <th>{t.table.title}</th>
            <th>{t.table.type}</th>
            <th>{t.table.priority}</th>
            <th>{t.table.expectedStatus}</th>
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
