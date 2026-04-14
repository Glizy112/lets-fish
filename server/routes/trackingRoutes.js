const express = require('express');
const router = express.Router();

const {
  trackClickAndRedirect
} = require('../controllers/trackingController');

router.get('/:campaignId/:userId', trackClickAndRedirect);

module.exports = router;