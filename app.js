
const express = require('express');
const app = express();

//import our router and set up middleware
const tasks = require('./routes/tasks');
const connectDB =require('./database/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware are executed in the order they are defined

//middleware
//if we don't use this middleware, we don't have access to the request body data
app.use(express.json());

// Serve static files from the 'public' directory
// This allows you to access files like HTML, CSS, JavaScript, and images
// directly via URLs. For example, if you have a file 'index.html' in the 'public' folder,
app.use(express.static('./public'));


//routes


//this acts as a base path for all the routes in the tasks.js file
//handles all the routes that start with /api/v1/tasks
app.use('/api/v1/tasks', tasks)

//here we pass our middeleware function that will handle the 404 and send some custom response
//this middleware catches any requests that don not match the routes defined above
app.use(notFound)

//error handler middleware
//catches any errors that occur during the handling of requests above or errors passed explicitly via next(error) from anywhere in the stack
app.use(errorHandlerMiddleware)

//app.get('/api/v1/tasks') //get all tasks
//app.post('/api/v1/tasks') //create a new task
//app.get('/api/v1/tasks/:id') //get a single task
//app.patch('/api/v1/tasks/:id') //update task
//app.delete('/api/v1/tasks/:id') //delete task


const port = process.env.PORT || 3000;


//only if we are successful in connecting to the database, we start the server

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}


start();