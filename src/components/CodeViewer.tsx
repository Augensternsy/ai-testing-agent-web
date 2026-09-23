import { useState } from 'react';

interface CodeViewerProps {
  code: string;
  title?: string;
}

export default function CodeViewer({ code, title = 'Generated PyTest' }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-viewer">
      <div className="code-viewer-header">
        <span className="code-viewer-title">{title}</span>
        <button className={`btn-copy ${copied ? 'copied' : ''}`} onClick={handleCopy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="code-block"><code>{code}</code></pre>
    </div>
  );
}
