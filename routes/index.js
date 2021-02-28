const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const BackgroundController = require('../controllers/background.controller');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/admin', (req, res) => {
  res.redirect('/admin/home');
});
router.get('/admin/:page', ensureAuthenticated, async (req, res) => {
  const page = req.params.page || 'home';
  let background = []
  if (page === 'home') {
    const data = await BackgroundController.getAllBackground();
    if (data.success) {
      background = data.data;
    }
  }
  return res.render('dashboard', {
    user: req.user,
    page: page,
    background: background
  })
});

module.exports = router;
