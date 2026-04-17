const express = require('express');
const router = express.Router();

const {
  createCampaign,
  getCampaignById,
  sendCampaignEmail,
  getAllCampaigns
} = require('../controllers/campaignController');

router.post('/', createCampaign);
router.get('/:id', getCampaignById);
router.post('/send', sendCampaignEmail);
router.get('/', getAllCampaigns);

module.exports = router;