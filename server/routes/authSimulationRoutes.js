const express = require('express');
const router = express.Router();

const {
  captureLoginAttempt
} = require('../controllers/authSimulationController');

router.post('/login-attempt', captureLoginAttempt);

module.exports = router;