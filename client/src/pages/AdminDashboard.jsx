import { useEffect, useState } from 'react';
import API from '../services/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { generateReport } from '../utils/generateReport';

const cardBase =
  'bg-white rounded-2xl border p-6 transition-shadow duration-200 hover:shadow-md';

const statCard = (label, value) => (
  <div
    key={label}
    className={`${cardBase} flex flex-col gap-1`}
    style={{ borderColor: '#93C5FD' }}
  >
    <span className="text-sm font-medium uppercase tracking-widest text-gray-400">
      {label}
    </span>
    <span className="text-2xl font-semibold text-gray-800">{value}</span>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-xl px-4 py-2 text-sm shadow-lg"
        style={{ background: '#1F2937', color: '#f9fafb' }}
      >
        <p className="font-medium">{label}</p>
        <p className="text-blue-300">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [timing, setTiming] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async (id = 1) => {
    const analyticsRes = await API.get(`/api/analytics/1`);
    const timingRes = await API.get(`/api/analytics/1/timing`);
    setStats(analyticsRes.data);
    setTiming(timingRes.data);
  };

  if (!stats)
    return (
      <div
        className="flex h-screen items-center justify-center text-gray-400"
        style={{ background: '#f9fafb' }}
      >
        Loading dashboard…
      </div>
    );

  const conversionRate =
    stats.click_count > 0
      ? `${((stats.login_count / stats.click_count) * 100).toFixed(2)}%`
      : '0%';

  const chartData = [
    { name: 'Clicks', value: stats.click_count },
    { name: 'Logins', value: stats.login_count },
  ];

  const BAR_COLORS = ['#93C5FD', '#1F2937'];

  return (
    <div className="min-h-screen px-8 py-10" style={{ background: '#f9fafb' }}>
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="mt-0.5 text-base text-gray-500">Campaign analytics overview</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            className="rounded-lg border px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
            style={{ borderColor: '#93C5FD', background: 'white' }}
            onChange={(e) => fetchDashboardData(e.target.value)}
          >
            <option value="1">Campaign 1</option>
          </select>

          <button
            onClick={() => generateReport(stats, timing)}
            className="rounded-lg px-4 py-2 text-sm font-medium text-white cursor-pointer transition-opacity duration-150 hover:opacity-80 active:scale-95"
            style={{ background: '#1F2937' }}
          >
            Download Report
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statCard('Clicks', stats.click_count)}
        {statCard('Logins', stats.login_count)}
        {statCard('Conversion', conversionRate)}
        {statCard('Trigger', stats.trigger_type)}
      </div>

      {/* Main grid: chart + campaign info */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Bar Chart — 2/3 width */}
        <div
          className={`${cardBase} lg:col-span-2`}
          style={{ borderColor: '#93C5FD' }}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
            Clicks vs Logins
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
                barCategoryGap="40%"
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#e5e7eb"
                  strokeDasharray="4 4"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 13, fill: '#9ca3af' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: '#f1f5f9' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign Info — 1/3 width */}
        <div
          className={`${cardBase} flex flex-col gap-4`}
          style={{ borderColor: '#93C5FD' }}
        >
          <h2 className="text-base font-semibold uppercase tracking-widest text-gray-400">
            Campaign Info
          </h2>
          {[
            ['Name', stats.name],
            ['Trigger type', stats.trigger_type],
            ['Sent at', new Date(stats.sent_at)?.toLocaleString()],
          ].map(([label, val]) => (
            <div key={label} className="flex flex-col gap-0.5 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
              <span className="text-sm text-gray-400">{label}</span>
              <span className="text-sm font-medium text-gray-700">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom grid: timing + human factors */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div
          className={`${cardBase}`}
          style={{ borderColor: '#93C5FD' }}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
            Timing Metrics
          </h2>
          {[
            ['First click', timing?.first_click || 'N/A'],
            ['First login', timing?.first_login || 'N/A'],
          ].map(([label, val]) => (
            <div key={label} className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0">
              <span className="text-sm text-gray-500">{label}</span>
              <span className="text-sm font-medium text-gray-800">{val}</span>
            </div>
          ))}
        </div>

        <div
          className={`${cardBase}`}
          style={{ borderColor: '#93C5FD' }}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
            Human Factor Analysis
          </h2>
          <p className="text-sm text-gray-600">
            Users responded primarily to{' '}
            <span className="font-semibold text-gray-800">{stats.trigger_type}</span>.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            This indicates susceptibility to social engineering pressure.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;