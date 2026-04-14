const express = require('express');
const router = express.Router();

const {
  getCampaignAnalytics,
  getTimingMetrics
} = require('../controllers/analyticsController');

router.get('/:campaignId', getCampaignAnalytics);
router.get('/:campaignId/timing', getTimingMetrics);

module.exports = router;