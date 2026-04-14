import { useEffect, useState } from 'react';
import API from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get('/api/analytics/1')
      .then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Campaign Analytics
      </h1>

      <p>Campaign: {stats.name}</p>
      <p>Trigger: {stats.trigger_type}</p>
      <p>Clicks: {stats.click_count}</p>
      <p>Logins: {stats.login_count}</p>
      <p>Click Rate: {stats.click_rate}</p>
      <p>Submission Rate: {stats.submission_rate}</p>
    </div>
  );
}

export default Dashboard;