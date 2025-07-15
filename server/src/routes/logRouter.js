const express = require('express');
const router = express.Router();
const {getDailyUserLogs, deleteLog, addLog} = require('../controllers/logController.js');

router.get('/:date', getDailyUserLogs);
router.delete('/:id', deleteLog);
router.post('/', addLog);

module.exports = router;