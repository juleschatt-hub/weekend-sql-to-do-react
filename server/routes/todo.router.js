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
            res.sendStatus(500);
        }))
});
// POST
router.post('/', (req, res) => {
let newTodo = req.body;

let taskTitle = newTodo.taskTitle;
let description = newTodo.description;
let checkListItems = newTodo.checkListItems
let dueDate = newTodo.dueDate;
let isComplete = newTodo.isComplete;

console.log('req.body:', req.body);

let queryText = `INSERT INTO "to_dos" ("task_title", "description", "check_list_items", "due_date", "is_complete")
VALUES ($1, $2, $3, $4, $5);`

pool.query(queryText, [taskTitle, description, checkListItems, dueDate, isComplete])
    .then(dbResult => {
        console.log('adding new todo: ', newTodo);
        // console.log(dbResult.rows);
        res.sendStatus(201);
    })
    .catch(dbError => {
        console.log('New todo was not added. There was an error in POST router:', dbError);
        res.sendStatus(500);
    })


});
// PUT

// DELETE

module.exports = router;
