//import the model
//instance of a model is a document
const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')   //importing the custom error function to create a custom error object

/** this was before without middleware
 * 
    const getAllTasks= async(req, res)=>{

    try {
        const tasks = await Task.find({});
        //here are the different ways to send back the data
        //res.status(200).json({tasks})
        //res.status(200).json({tasks, amount:tasks.length});
        

    } catch (error) {
        res.status(500).json({msg:error});
    }
}
 * 
 */

//using the asyncWrapper middleware

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({}); //use await because our controller is an async function
    //here are the different ways to send back the data
    res.status(200).json({ tasks })
    //res.status(200).json({tasks, amount:tasks.length});


})


const createTask = asyncWrapper( async(req, res)=>{
    
        const task = await Task.create(req.body);
        res.status(201).json(task);
})

/**
 * const getTask= async (req, res)=>{
    try {
    //res.json({id:req.params.id}); //this is how we get the id from the url directly

       //can be used directly using destructuring and renaming the id to taskID for better readability
       const {id:taskID}= req.params;
       
       const task = await Task.findOne({_id:taskID});
       if(!task){
        return res.status(404).json({msg:`No task with id : ${taskID}`});
       }
         res.status(200).json({task});
        
    } catch (error) {
        res.status(500).json({msg:error});
    }
}
 */
const getTask= asyncWrapper (async (req, res, next)=>{
    
       //can be used directly using destructuring and renaming the id to taskID for better readability
       const {id:taskID}= req.params;
       
       const task = await Task.findOne({_id:taskID});
       if(!task){

        //return next(error) - ensures no further code is executed in this function after calling next 
        return next(createCustomError(`No task with id : ${taskID}`, 404));

        //return res.status(404).json({msg:`No task with id : ${taskID}`});
       }
         res.status(200).json({task});
  
})
/**
 * we need the id of the task to update it 
 * and we need the body of the request to update the task
 * 1.get the params and the body
 */
/**
 * 
const updateTask= async (req, res)=>{
    try {
        const {id:taskID}=req.params;
       // const task =req.body;

       //next argument after the id is the data we want to update
       
        // * const task = await Task.findByIdAndUpdate({_id:taskID}, req.body) with this in place
        // * we don't have the options object to return the newly queried task
        // * so we will include the options object as the third argument contraining the new:true property 
        // * which will always return the updated task and the validators will be run on the updated data
      
       const task = await Task.findByIdAndUpdate({_id:taskID}, req.body,{new:true, runValidators:true});
         if(!task){
            return res.status(404).json({msg:`No task with id : ${taskID}`});
           }   
       //if we are successful, we can send back the updated task
       res.status(200).json({id:taskID, data:req.body});
    } catch (error) {
        res.status(500).json({msg:error});
    }
}
    */


const updateTask= asyncWrapper ( async (req, res, next)=>{
   
        const {id:taskID}=req.params;
       // const task =req.body;
       //next argument after the id is the data we want to update
       
        // * const task = await Task.findByIdAndUpdate({_id:taskID}, req.body) with this in place
        // * we don't have the options object to return the newly queried task
        // * so we will include the options object as the third argument contraining the new:true property 
        // * which will always return the updated task and the validators will be run on the updated data
      
       const task = await Task.findByIdAndUpdate({_id:taskID}, req.body,{new:true, runValidators:true});
         if(!task){
           // return res.status(404).json({msg:`No task with id : ${taskID}`});
           return next(createCustomError(`No task with id : ${taskID}`, 404));
           }   
       //if we are successful, we can send back the updated task
       res.status(200).json({id:taskID, data:req.body});
    
})

const deleteTask= asyncWrapper( async(req, res, next)=>{
    
    const {id:taskID}= req.params;
    const task = await Task.findByIdAndDelete({_id:taskID});
    if(!task){
        //return res.status(404).json({msg:`No task with id : ${taskID}`});
        return next(createCustomError(`No task with id : ${taskID}`, 404));
       }

        // res.status(200).json({task}); //if we want to send the deleted task back
        res.status(200).json({msg:`Task with id ${taskID} deleted`});
        // or as simple as this
       // res.status(200).send();
  
})


// const editTask = async (req, res)=>{
//     try {
//         const {id:taskID}=req.params;
//         const task = await Task.findByIdAndUpdate({_id:taskID}, req.body,{new:true, runValidators:true});
//         if(!task){
//             return res.status(404).json({msg:`No task with id : ${taskID}`});
//            }
//         res.status(200).json({id:taskID, data:req.body});
        
//     } catch (error) {
//         res.send(500).json({msg:error});
//     }
// }

module.exports={
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask, 
    
}