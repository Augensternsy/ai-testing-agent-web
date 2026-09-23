import { useLanguage } from '../context/LanguageContext';
import type { TestReport as TestReportData } from '../types/testing';

interface TestReportProps {
  report: TestReportData;
}

export default function TestReport({ report }: TestReportProps) {
  const { t } = useLanguage();
  const passRatePct = Math.round(report.pass_rate * 100);

  return (
    <div>
      <div className="report-grid">
        <div className="report-card">
          <div className="report-value">{report.total}</div>
          <div className="report-label">{t.report.total}</div>
        </div>
        <div className="report-card">
          <div className="report-value pass">{report.passed}</div>
          <div className="report-label">{t.report.passed}</div>
        </div>
        <div className="report-card">
          <div className="report-value fail">{report.failed}</div>
          <div className="report-label">{t.report.failed}</div>
        </div>
        <div className="report-card">
          <div className="report-value skip">{report.skipped}</div>
          <div className="report-label">{t.report.skipped}</div>
        </div>
        <div className="report-card">
          <div className="report-value pass">{passRatePct}%</div>
          <div className="report-label">{t.report.passRate}</div>
        </div>
        <div className="report-card">
          <div className="report-value">{report.duration}s</div>
          <div className="report-label">{t.report.duration}</div>
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${passRatePct}%` }} />
      </div>
    </div>
  );
}
