const middleware = (req,res,next)=>{
    console.log("middleware");
    next();
}
module.exports = middleware;