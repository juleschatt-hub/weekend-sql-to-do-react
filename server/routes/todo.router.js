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
router.post('/', (req, res) => {
let newTodo = req.body;

let taskTitle = newTodo.task_title;
let description = newTodo.description;
let checkListItems = newTodo.check_list_items;
let dueDate = newTodo.due_date;
let isComplete = newTodo.is_complete;

let queryText = `INSERT INTO "to_dos" ("task_title", "description", "check_list_items", "due_date", "is_complete")
VALUES ($1, $2, $3, $4, $5);`;
console.log(newTodo);
res.sendStatus(200);


});
// PUT

// DELETE

module.exports = router;
