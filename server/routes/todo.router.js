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
// DELETE
router.delete('/:id', (req, res) => {
    let { id } = req.params;
    const sqlText = `DELETE FROM "to_dos" WHERE "id" = $1;`;
    pool.query(sqlText, [id])
        .then((result) => {
            console.log(`Got stuff back from the database`, result);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
});
// PUT ROUTES

router.put('/toggle/:id', (req, res) => {
    let { id } = req.params;
    // This query will switch from true to false and false to true
    const sqlText = `
        UPDATE "to_dos" SET "is_complete" = NOT "is_complete" 
        WHERE "id" = $1;
    `;
    pool.query(sqlText, [id])
        .then((result) => {
            console.log(`Got stuff back from the database`, result);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
});

router.put('/:id', (req, res) => {
    console.log(req.params);
    let idToupdate = req.params.id;
    console.log('idToUpdate', idToupdate);
    console.log('type of idToUpdate', typeof idToupdate);
    console.log('req.body', req.body);
    let newDesription = req.body.description;
    console.log(newDesription);
    console.log(typeof newDesription);
    let queryText = `UPDATE treats SET "description"=$1 WHERE id=$2;`;

    pool.query(queryText, [newDesription, idToupdate])
        .then(dbResult => {
            console.log('item has been updated:', dbResult);
            res.sendStatus(200);
        })
        .catch(dbError => {
            console.log('Something went wrong while updating treat: ', dbError)
        })
  });

module.exports = router;
