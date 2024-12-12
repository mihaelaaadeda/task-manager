//we need to extend the Error class in order to create a custom error
class CustomAPIError extends Error {
    //constructor is a special method we invoke when we create a new instance of a class
    constructor (message, statusCode){
        //super is used to call the constructor of the parent class to initialize the message property
        super(message); 
        this.statusCode = statusCode;
}
}

/*

is like a helper function that makes easier to create instance of our CustomAPIError class
instead of writing new CustomAPIError('message', 404) every time, you can just call createCustomError('message', 404)

*/
const createCustomError = (msg, statusCode)=>{
    return new CustomAPIError(msg, statusCode); //so these params are coming from the function 
}

module.exports ={CustomAPIError, createCustomError};