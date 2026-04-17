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
  const [campId, setCampId] = useState(1);


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

      setCampId(response.data.campaignId);
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
          campaignId: campId,
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

  //Styles for Elements
  const inputBase = {
    width: '100%',
    border: '1px solid #93C5FD',
    borderRadius: '0.75rem',
    padding: '0.625rem 0.875rem',
    fontSize: '0.875rem',
    color: '#1f2937',
    background: 'white',
    outline: 'none',
    transition: 'box-shadow 0.15s ease, border-color 0.15s ease',
  };

  const focusStyle = (e) => {
    e.target.style.boxShadow = '0 0 0 3px #bfdbfe';
    e.target.style.borderColor = '#60a5fa';
  };
  const blurStyle = (e) => {
    e.target.style.boxShadow = 'none';
    e.target.style.borderColor = '#93C5FD';
  };

  const sectionLabel = (text) => (
    <p
      style={{
        fontSize: '0.7rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#9ca3af',
        marginBottom: '0.375rem',
      }}
    >
      {text}
    </p>
  );

  return (
    <div className="min-h-screen px-6 py-10" style={{ background: '#f9fafb', fontFamily: 'inherit' }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Campaign Control Center</h1>
          <p className="mt-1 text-sm text-gray-500">Configure and launch your phishing simulation campaign.</p>
        </div>

        {/* Form card */}
        <div
          className="bg-white rounded-2xl p-8 space-y-6"
          style={{ border: '1px solid #93C5FD', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}
        >

          {/* Campaign Identity */}
          <div>
            <p
              style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#9ca3af',
                marginBottom: '1rem',
              }}
            >
              Campaign identity
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                {sectionLabel('Name')}
                <input
                  name="name"
                  placeholder="e.g. Q3 Awareness Drive"
                  style={inputBase}
                  onChange={handleChange}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>
              <div>
                {sectionLabel('Trigger type')}
                <select
                  name="trigger_type"
                  style={{ ...inputBase, cursor: 'pointer' }}
                  onChange={handleChange}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                >
                  <option value="urgency">Urgency</option>
                  <option value="fear">Fear</option>
                  <option value="reward">Reward</option>
                  <option value="authority">Authority</option>
                </select>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: '#e5e7eb' }} />

          {/* Email Composition */}
          <div>
            <p
              style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#9ca3af',
                marginBottom: '1rem',
              }}
            >
              Compose your Email
            </p>
            <div className="space-y-4">
              <div>
                {sectionLabel('Subject line')}
                <input
                  name="subject"
                  placeholder="e.g. Action required: verify your account"
                  style={inputBase}
                  onChange={handleChange}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>
              <div>
                {sectionLabel('Email template')}
                <textarea
                  name="template"
                  placeholder="Write your email template here…"
                  rows={7}
                  style={{ ...inputBase, resize: 'vertical', lineHeight: 1.6 }}
                  onChange={handleChange}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: '#e5e7eb' }} />

          {/* Recipients */}
          <div>
            <p
              style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#9ca3af',
                marginBottom: '1rem',
              }}
            >
              Recipients
            </p>
            <div>
              {sectionLabel('One email per line')}
              <textarea
                name="recipients"
                placeholder={"alice@company.com\nbob@company.com\ncarol@company.com"}
                rows={4}
                style={{ ...inputBase, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: 1.7 }}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: '#e5e7eb' }} />

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={handleCreateCampaign}
              disabled={loading}
              className="rounded-xl px-5 py-2.5 text-sm font-medium transition-opacity duration-150 hover:opacity-80 active:scale-95 disabled:opacity-50"
              style={{ background: '#1F2937', color: '#f9fafb', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Saving…' : 'Save Campaign'}
            </button>

            <button
              onClick={handleSendEmail}
              disabled={loading}
              className="rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-150 hover:shadow-md active:scale-95 disabled:opacity-50"
              style={{
                background: 'white',
                color: '#1f2937',
                border: '1px solid #93C5FD',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Sending…' : 'Send Campaign'}
            </button>
          </div>

        </div>

        {/* Footer note */}
        <p className="text-center text-sm mt-6" style={{ color: '#9ca3af' }}>
          Simulated emails are sent only to listed recipients within your organisation.
        </p>

      </div>
    </div>
  );
}

export default Home;