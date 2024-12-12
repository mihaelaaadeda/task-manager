const mongoose =require('mongoose');

//using the schema we set up the structure of our document
//schema = structure of the data
const TaskSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, 'must provide a name'],
        trim:true,
        maxlength:[20, 'name cannot be more than 20 characters']
    },
    completed:{
        type:Boolean,
        default:false
    }
});


/* 
in mongoose, a model is a wrapper for the schema
SCHEMA defines the structure of the data (like type, validations etc
MODEL defines the actual collection in the database (so we can perform operations like create, read, update, delete)
 */

//we need to pass in the name and the schema
module.exports = mongoose.model('Task', TaskSchema);
//now go to controllers and start using our model