function Awareness() {
  const warnings = [
    { icon: '⚡', label: 'Urgent action requested' },
    { icon: '🔑', label: 'Credential request page' },
    { icon: '📢', label: 'Pressure-based messaging' },
    { icon: '↪', label: 'Suspicious redirect behavior' },
  ];

  const controls = [
    { icon: '🛡', label: 'Clickjacking protection' },
    { icon: '📋', label: 'Content Security Policy' },
    { icon: '🔒', label: 'Secure header enforcement' },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: '#f9fafb', fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap');

        .card-hover {
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .card-hover:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.07);
          transform: translateY(-2px);
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.6; }
          70% { transform: scale(1.15); opacity: 0; }
          100% { transform: scale(1.15); opacity: 0; }
        }
        .pulse-ring::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 2px solid #fca5a5;
          animation: pulse-ring 2s ease-out infinite;
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />

      <div className="w-full max-w-lg">

        {/* Hero badge */}
        <div className="flex justify-center mb-6">
          <div
            className="relative flex items-center justify-center w-20 h-20 rounded-full pulse-ring"
            style={{ background: '#fee2e2' }}
          >
            <span style={{ fontSize: 36 }}>🎣</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-8">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-2"
            style={{ color: '#ef4444', letterSpacing: '0.15em' }}
          >
            Security Awareness Exercise
          </p>
          <h1
            className="text-4xl mb-3 font-bold"
            style={{ color: '#111827', lineHeight: 1.2 }}
          >
            You were just phished.
          </h1>
          <p className="text-base" style={{ color: '#6b7280', lineHeight: 1.7 }}>
            This was a <span style={{ color: '#1F2937', fontWeight: 600 }}>controlled simulation</span> — no real data was collected.
            Here's what you should have caught.
          </p>
        </div>

        {/* Warning signs */}
        <div
          className="rounded-2xl p-6 mb-4 card-hover"
          style={{ background: 'white', border: '1px solid #fecaca' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: '#ef4444' }}
            >
              Red flags
            </span>
            <div className="flex-1 h-px" style={{ background: '#fecaca' }} />
          </div>
          <ul className="space-y-3">
            {warnings.map(({ icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-sm shrink-0"
                  style={{ background: '#fee2e2', fontSize: 15 }}
                >
                  {icon}
                </span>
                <span className="text-sm" style={{ color: '#374151' }}>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Defensive controls */}
        <div
          className="rounded-2xl p-6 mb-6 card-hover"
          style={{ background: 'white', border: '1px solid #93C5FD' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: '#2563eb' }}
            >
              Protections active
            </span>
            <div className="flex-1 h-px" style={{ background: '#bfdbfe' }} />
          </div>
          <ul className="space-y-3">
            {controls.map(({ icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-sm shrink-0"
                  style={{ background: '#eff6ff', fontSize: 15 }}
                >
                  {icon}
                </span>
                <span className="text-sm" style={{ color: '#374151' }}>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm" style={{ color: '#9ca3af', lineHeight: 1.6 }}>
          Always verify sender identity and avoid clicking unexpected links.
          <br />Contact your IT security team if you receive suspicious emails.
        </p>

      </div>
    </div>
  );
}

export default Awareness;