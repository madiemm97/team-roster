const express = require('express');
const app = express(); 

const {mongoose} = require('./db/mongoose'); 

const bodyParser = require('body-parser');

// load in mongoose models 
const { List, Task } = require('./db/models'); 

// load middleware - this helps with getting items out of the JSON
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    // res.header(
    //     'Access-Control-Expose-Headers',
    //     'x-access-token, x-refresh-token'
    // );

    next();
});

/* ROUTE HANDLERS */

/* LIST ROUTES */ 

/**
 * GET /lists
 * Purpose: Get all lists
 */
app.get('/lists', (req, res) => {
    // we want to return an array of all of the lists in the DB 
    // res.send("Hello world!");

    List.find({}).then((lists) => {
        res.send(lists); 
    });
})


/**
 * POST /lists
 * Purpose: Create a list 
 */
app.post('/lists', (req, res) => {
    // we want to create a new list and return the new list document back to the user (which includes the id)
    // the list information (fields) will be passed in via the JSON request body
    let name = req.body.name; 
    let touchdowns = req.body.touchdowns; 
    let rushingYards = req.body.rushingYards; 

    let newList = new List({
        name,
        touchdowns,
        rushingYards
    });
    newList.save().then((listDoc) => {
        // the full list document is returned (including the id)
        res.send(listDoc);
    })
});


/**
 * PATCH /lists/:id
 * Purpose: Update a list 
 */
app.patch('/lists/:id', (req, res) => {
    // We want to update the specified list with the new values specified in the JSON body of the req
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully'}); 
    })

});


/**
 * DELETE /lists/:id
 * Purpose: Delete a list 
 */
app.delete('/lists/:id', (req, res) => {
    // We want to delete the specified list 
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc); 
    })
});

// app.get('/lists/:listId/tasks', (req, res) => {
//     // we want to return all tasks that belong to a specific list (specified by listId
//     Task.find({
//         _listId: req.params.listId
//     }).then((tasks) => {
//         res.send(tasks); 
//     })
// });

// app.get('/lists/:listId/tasks/:taskId', (req, res) => {
//     Task.findOne({
//         _id: req.params.taskId,
//         _listId: req.params.listId
//     }).then((task) => {
//         res.send(task)
//     })
// });

// // we aren't going to use this one 
// app.post('/lists/:listId/tasks', (req, res) => {
//     // we want to create a new task in the list specified by the listId
//     let newTask = new Task({
//         title: req.body.title,
//         _listId: req.params.listId
//     }); 
//     newTask.save().then((newTaskDoc) => {
//         res.send(newTaskDoc); 
//     })
// })

// app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
//     // we want to update an existing task (specified by taskId)
//     Task.findOneAndUpdate({ 
//         _id: req.params.taskId,
//         _listId: req.params.listId
//     }, {
//         $set: req.body
//     }).then(() => {
//         res.send({message: 'Updated successfully'}); 
//     })
// });

// app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
//     Task.findOneAndRemove({
//         _id: req.params.taskId,
//         _listId: req.params.listId
//     }).then((removedTaskDoc) => {
//         res.send(removedTaskDoc);
//     })
// });

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})