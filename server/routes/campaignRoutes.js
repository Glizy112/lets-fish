const express = require('express');
const router = express.Router();

const {
  createCampaign,
  getCampaignById,
  sendCampaignEmail
} = require('../controllers/campaignController');

router.post('/', createCampaign);
router.get('/:id', getCampaignById);
router.post('/send', sendCampaignEmail);

module.exports = router;