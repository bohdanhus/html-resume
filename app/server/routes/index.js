const express = require('express');
const router = express.Router();

const tasks = require('./tasks');

router.use('/tasks', tasks);

module.exports = router;