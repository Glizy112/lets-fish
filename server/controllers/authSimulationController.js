const db = require('../db/database');

exports.captureLoginAttempt = (req, res) => {
  const { user_id, campaign_id, email, password } = req.body;

  db.serialize(() => {
    db.run(
      `
      INSERT INTO credential_logs 
      (user_id, campaign_id, email, password)
      VALUES (?, ?, ?, ?)
      `,
      [user_id, campaign_id, email, password]
    );

    db.run(
      `
      INSERT INTO events
      (user_id, campaign_id, event_type)
      VALUES (?, ?, ?)
      `,
      [user_id, campaign_id, 'login_attempt']
    );
  });

  res.status(201).json({
    message: 'Login attempt captured',
    redirectTo: '/awareness'
  });
};