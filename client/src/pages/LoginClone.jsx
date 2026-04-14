import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function LoginClone() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await API.post('/api/sim/login-attempt', {
      user_id: 1,
      campaign_id: 1,
      ...formData
    });

    navigate('/awareness');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-blue-200 p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-700">
            Secure Employee Portal
          </h1>
          <p className="text-md text-gray-500 mt-2">
            Sign in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type="email"
            name="email"
            placeholder="Work email"
            className="w-full rounded-xl border border-blue-300 p-3 outline-none"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-full rounded-xl border border-blue-300 p-3 outline-none"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gray-800 text-white p-3 font-medium cursor-pointer hover:shadow-md transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginClone;