const db = require('../db/database');
const { sendPhishingEmail } = require('../services/emailService');

//Create a campaign
exports.createCampaign = (req, res) => {
  const { name, template, trigger_type } = req.body;

  const query = `
    INSERT INTO campaigns (name, template, trigger_type)
    VALUES (?, ?, ?)
  `;

  db.run(query, [name, template, trigger_type], function (err) {
    if (err) {
      return res.status(500).json({
        message: 'Failed to create campaign',
        error: err.message
      });
    }

    res.status(201).json({
      message: 'Campaign created successfully',
      campaignId: this.lastID
    });
  });
};

//Get campaign by ID
exports.getCampaignById = (req, res) => {
  const { id } = req.params;

  db.get(
    `SELECT * FROM campaigns WHERE id = ?`,
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          message: 'Database error',
          error: err.message
        });
      }

      if (!row) {
        return res.status(404).json({
          message: 'Campaign not found'
        });
      }

      res.json(row);
    }
  );
};

exports.sendCampaignEmail = async (req, res) => {
  const { recipientEmail, campaignId, userId, subject, template } = req.body;

  try {
    await sendPhishingEmail({
      recipientEmail,
      campaignId,
      userId,
      subject,
      template
    });
    res.json({
      message: 'Simulation email sent successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Email sending failed',
      error: error.message
    });
  }
};

exports.getAllCampaigns = (req, res) => {
  db.all(`SELECT id, name FROM campaigns`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to fetch campaigns',
        error: err.message
      });
    }

    res.json(rows);
  });
};