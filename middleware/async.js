//we take our controller as an argument 
const asyncWrapper= (fn) =>{

    return async (req,res, next)=>{
        try {
            await fn(req,res, next)
            
        } catch (error) {
           next(error); //if we got any error we catch it and pass it to the next middleware
           /**
            * the way we pass in the errors down to this custom handler, 
            * is by using the asycWrapper 
            */
        }
    }
}

module.exports=asyncWrapper;
