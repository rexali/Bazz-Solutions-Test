function logHandler(req, res, next) {
    try {
        const method = req.method;
        const url = req.originalUrl;
        req.timeReceived = Date();
        console.log(`${method}: ${url} --- ${req.timeReceived}`);
        next();
    } catch (error) {
        console.warn(error);
    }

}


function logHandler2(req, res, next) {
    try {
        req.timeReceived = Date();
        console.log(req.url + ' --- ' + req.timeReceived);
        next();
    } catch (error) {
        console.warn(error);
    }

}

module.exports = {
    logHandler,
    logHandler2
}