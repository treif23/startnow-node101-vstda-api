const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

// add your code here

//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

app.use(bodyParser.urlencoded({ extended: true })); // configure app to use bodyParser()
app.use(bodyParser.json());  // this will let us get the data from a POST

var jsonforapi = ([             //made VAR to contain json objects
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }])

var port = process.env.PORT || 8484; //established port to listen for

var router = express.Router();       // get an instance of the express Router

router.get('/', function (req, res) {  //set '/' to return statusCode of 200
    res.json([
        {
            status: res.statusCode
        }
    ]);
});

router.get('/api/TodoItems', function (req, res) { //GET variable jsonforapi objects
    res.json(jsonforapi);
});

router.get('/api/TodoItems/:id', function (req, res) {
    var id = req.params.id;                  // just make id the variable instead of req.params.id     
    console.log(req.params);

    for (i = 0; i < jsonforapi.length; i++) { //for loop to go through each object in jsonforapi variable
        if (id == jsonforapi[i].todoItemId) { //if id = the id of the object we are on, respond with that IDs json object
            res.json(jsonforapi[i]);
        }
    }
});
//POST
router.post('/api/TodoItems/', function (req, res) { 

    var newItem = {
        todoItemId: 0,
        name: "item",
        priority: 4,
        completed: true
    };

    res.status(201).json(newItem);      //respond with status code 201 with newItem's json object
        
});
//DELETE
router.delete('/api/TodoItems/:id', function (req, res) { 
    var id = req.params.id;
    for (i = 0; i < jsonforapi.length; i++) { //for loop to go through each todoItemId, and delete post if it matches the ID
        if (id == jsonforapi[i].todoItemId) {
            res.json(jsonforapi[i]);
        }
    }
})


app.use('/', router);
app.use('/api/TodoItems', router);


module.exports = app;
