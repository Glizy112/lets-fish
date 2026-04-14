const db = require('../db/database');

exports.trackClickAndRedirect = (req, res) => {
  const { campaignId, userId } = req.params;

  const query = `
    INSERT INTO events (user_id, campaign_id, event_type)
    VALUES (?, ?, ?)
  `;

  db.run(query, [userId, campaignId, 'click'], function (err) {
    if (err) {
      return res.status(500).json({
        message: 'Tracking failed',
        error: err.message
      });
    }

    res.redirect('http://localhost:5173/login-clone');
  });
};