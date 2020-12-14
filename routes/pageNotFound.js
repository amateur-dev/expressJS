const path = require('path');
const express = require('express');
const router = express.Router();

const pageNotFound = require('../controllers/pageNotFound');

router.use(pageNotFound);

module.exports = router;
