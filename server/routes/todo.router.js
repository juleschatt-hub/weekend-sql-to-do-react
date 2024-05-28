const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    // res.send('test');
    let queryText = 'SELECT * FROM "to_dos";';
    pool.query(queryText)
        .then((dbResult) => {
            let toDos = dbResult.rows;
            console.log(toDos);
            res.send(toDos);
        })
        .catch((dbError => {
            console.log('Error from GET router:', dbError)
        }))
});
// POST

// PUT

// DELETE

module.exports = router;
