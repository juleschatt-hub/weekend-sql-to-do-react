const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    res.send('test');
})
// POST

// PUT

// DELETE

module.exports = router;
