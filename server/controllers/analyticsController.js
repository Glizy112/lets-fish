const db = require('../db/database');

exports.getCampaignAnalytics = (req, res) => {
  const { campaignId } = req.params;

  const query = `
    SELECT
      c.id,
      c.name,
      c.trigger_type,
      c.sent_at,

      COUNT(CASE WHEN e.event_type = 'click' THEN 1 END) AS click_count,

      COUNT(CASE WHEN e.event_type = 'login_attempt' THEN 1 END) AS login_count

    FROM campaigns c
    LEFT JOIN events e
      ON c.id = e.campaign_id
    WHERE c.id = ?
    GROUP BY c.id
  `;

  db.get(query, [campaignId], (err, row) => {
    if (err) {
      return res.status(500).json({
        message: 'Analytics fetch failed',
        error: err.message
      });
    }

    const clickRate = row.click_count;
    const submissionRate = row.login_count;

    res.json({
      ...row,
      click_rate: clickRate,
      submission_rate: submissionRate
    });
  });
};

exports.getTimingMetrics = (req, res) => {
  const { campaignId } = req.params;

  const query = `
    SELECT
      MIN(CASE WHEN event_type = 'click' THEN event_time END) AS first_click,
      MIN(CASE WHEN event_type = 'login_attempt' THEN event_time END) AS first_login
    FROM events
    WHERE campaign_id = ?
  `;

  db.get(query, [campaignId], (err, row) => {
    if (err) {
      return res.status(500).json({
        message: 'Timing analysis failed'
      });
    }

    res.json(row);
  });
};