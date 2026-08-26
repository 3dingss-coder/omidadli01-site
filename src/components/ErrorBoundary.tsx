import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error | null;
  info: string | null;
}

// Catches any error thrown during render anywhere in the app and shows it
// on-screen instead of letting the whole page go blank/white. This is what
// makes bugs on real devices (phones we can't remotely debug) diagnosable:
// the person just reads the error off their own screen and sends it to us.
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, info: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ info: info.componentStack || null });
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          dir="ltr"
          style={{
            position: 'fixed',
            inset: 0,
            background: '#1a0b2e',
            color: '#f5f3ff',
            padding: '24px',
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: '13px',
            lineHeight: 1.6,
            zIndex: 999999,
            direction: 'ltr',
            textAlign: 'left',
          }}
        >
          <div style={{ color: '#ff6b6b', fontWeight: 'bold', fontSize: '16px', marginBottom: '12px' }}>
            ⚠️ Site crashed — please screenshot this and send it
          </div>
          <div style={{ marginBottom: '8px' }}>
            <b>Message:</b> {this.state.error.message}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <b>Stack:</b>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', opacity: 0.8 }}>
              {this.state.error.stack}
            </pre>
          </div>
          {this.state.info && (
            <div>
              <b>Component stack:</b>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', opacity: 0.6 }}>{this.state.info}</pre>
            </div>
          )}
          <div style={{ marginTop: '8px', opacity: 0.6 }}>
            User agent: {typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'}
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '16px',
              padding: '10px 16px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontFamily: 'inherit',
              fontSize: '14px',
            }}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
