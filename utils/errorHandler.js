
function errorHandler(err, req, res, next) {
    try {
        console.error(err.stack);
        // res.status(500).send("Something broke!");
        res.status(500).json({error:"Server Error"});
    } catch (error) {
     console.warn(error);   
    }
   
}

module.exports={
    errorHandler
}