import { useState } from 'react';
import API from '../services/api';

function Home() {
  const [campaign, setCampaign] = useState({
    name: '',
    trigger_type: 'urgency',
    subject: '',
    template: '',
    recipients: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCampaign({
      ...campaign,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateCampaign = async () => {
    try {
      setLoading(true);

      const response = await API.post('/api/campaigns', {
        name: campaign.name,
        template: campaign.template,
        trigger_type: campaign.trigger_type
      });

      alert(`Campaign created: ID ${response.data.campaignId}`);
    } catch (error) {
      console.error(error);
      alert('Campaign creation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    const recipientList = campaign.recipients
      .split('\n')
      .map((email) => email.trim())
      .filter(Boolean);

    try {
      setLoading(true);

      for (const email of recipientList) {
        await API.post('/api/campaigns/send', {
          recipientEmail: email,
          campaignId: 1,
          userId: 1,
          subject: campaign.subject,
          template: campaign.template
        });
      }

      alert('Emails sent successfully');
    } catch (error) {
      console.error(error);
      alert('Email sending failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border p-8 space-y-6">
        <h1 className="text-3xl font-bold">
          Campaign Control Center
        </h1>

        <input
          name="name"
          placeholder="Campaign name"
          className="w-full border rounded-xl p-3"
          onChange={handleChange}
        />

        <select
          name="trigger_type"
          className="w-full border rounded-xl p-3"
          onChange={handleChange}
        >
          <option value="urgency">Urgency</option>
          <option value="fear">Fear</option>
          <option value="reward">Reward</option>
          <option value="authority">Authority</option>
        </select>

        <input
          name="subject"
          placeholder="Email subject"
          className="w-full border rounded-xl p-3"
          onChange={handleChange}
        />

        <textarea
          name="template"
          placeholder="Write email template..."
          rows="8"
          className="w-full border rounded-xl p-3"
          onChange={handleChange}
        />

        <textarea
          name="recipients"
          placeholder="Recipients (one email per line)"
          rows="5"
          className="w-full border rounded-xl p-3"
          onChange={handleChange}
        />

        <div className="flex gap-4">
          <button
            onClick={handleCreateCampaign}
            className="border rounded-xl px-4 py-3 cursor-pointer"
          >
            {loading ? 'Saving...' : 'Create Campaign'}
          </button>

          <button
            onClick={handleSendEmail}
            className="border rounded-xl px-4 py-3 cursor-pointer"
          >
            {loading ? 'Sending...' : 'Send Campaign'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;