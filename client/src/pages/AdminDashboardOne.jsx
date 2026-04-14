import { useEffect, useState } from 'react';
import API from '../services/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { generateReport } from '../utils/generateReport';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [timing, setTiming] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const analyticsRes = await API.get('/api/analytics/1');
    const timingRes = await API.get('/api/analytics/1/timing');

    setStats(analyticsRes.data);
    setTiming(timingRes.data);
  };

  if (!stats) return <p>Loading dashboard...</p>;

  const chartData = [
    { name: 'Clicks', value: stats.click_count },
    { name: 'Logins', value: stats.login_count }
  ];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <button
        onClick={() => generateReport(stats, timing)}
        className="border border-blue-400 bg-blue-200 rounded-lg px-4 py-2 cursor-pointer hover:shadow-md transition"
      >
        Download PDF Report
      </button>

      <select className="border border-blue-600 p-2 rounded-lg mx-4" onChange={(e) => fetchDashboardData(e.target.value)}>
        <option value="1">Campaign 1</option>
      </select>

      {/* Campaign Info */}
      <div className="border border-blue-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Campaign Overview
        </h2>

        <p>Name: {stats.name}</p>
        <p>Trigger Type: {stats.trigger_type}</p>
        <p>Sent At: {stats.sent_at}</p>
      </div>

      {/* Chart */}
      <div className="border border-blue-200 rounded-lg p-6 shadow-sm h-96">
        <h2 className="text-xl font-semibold mb-4">
          Click vs Login Attempts
        </h2>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={{fill: 'whitesmoke', stroke: '#ccc', strokeWidth: 1}}/>
            <Bar dataKey="value" fill={'#89CFF0'} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Conversion Metric */}
      <div className="border border-blue-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
            Conversion Metrics
        </h2>

        <p>Click Count: {stats.click_count}</p>
        <p>Login Count: {stats.login_count}</p>

        <p>
            Conversion Rate:
            {stats.click_count > 0
            ? ` ${(stats.login_count / stats.click_count * 100).toFixed(2)}%`
            : ' 0%'}
        </p>
      </div>

      {/* Timing */}
      <div className="border border-blue-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Timing Metrics
        </h2>

        <p>First Click: {timing?.first_click || 'N/A'}</p>
        <p>First Login: {timing?.first_login || 'N/A'}</p>
      </div>

      {/* Human Factors */}
      <div className="border border-blue-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Human Factor Analysis
        </h2>

        <p>
          Users responded primarily to:
          <strong> {stats.trigger_type}</strong>
        </p>

        <p>
          This indicates susceptibility to
          social engineering pressure.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;