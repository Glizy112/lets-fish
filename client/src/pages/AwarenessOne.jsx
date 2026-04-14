function Awareness() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-xl bg-white border border-blue-200 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4">
          Phishing Simulation Ended 🎣
        </h1>

        <p className="text-gray-600 mb-6">
          You just interacted with a controlled phishing awareness exercise.
        </p>

        <div className="rounded-xl border border-blue-200 p-4 mb-6">
          <h2 className="font-semibold mb-3">
            Warning Signs You Should Notice
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            <li>Urgent action requested</li>
            <li>Credential request page</li>
            <li>Pressure-based messaging</li>
            <li>Suspicious redirect behavior</li>
          </ul>
        </div>

        <div className="rounded-xl border border-blue-200 p-4">
          <h2 className="font-semibold mb-3">
            Defensive Controls Enabled
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            <li>Clickjacking protection</li>
            <li>Content Security Policy</li>
            <li>Secure header enforcement</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Awareness;