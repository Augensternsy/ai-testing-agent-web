import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface CodeViewerProps {
  code: string;
  title?: string;
}

export default function CodeViewer({ code, title }: CodeViewerProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const displayTitle = title ?? t.demo.generatedCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-viewer">
      <div className="code-viewer-header">
        <span className="code-viewer-title">{displayTitle}</span>
        <button className={`btn-copy ${copied ? 'copied' : ''}`} onClick={handleCopy}>
          {copied ? t.code.copied : t.code.copy}
        </button>
      </div>
      <pre className="code-block"><code>{code}</code></pre>
    </div>
  );
}
