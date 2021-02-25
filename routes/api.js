const express = require('express');
const router = express.Router();
const BackgroundController = require('../controllers/background.controller')

// Welcome Page
// router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.post('/api/background', BackgroundController.insert);

module.exports = router;
