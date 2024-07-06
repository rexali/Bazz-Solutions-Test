function checkTypeSize(req, file) {
    try {
       // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {

        req.fileValidationError = 'Only image files are allowed!';

        return new Error('Only image files are allowed!');
    }

    if (file.size > 0.1 * 1024 * 1024) {
        
        return new Error('Image file(s) is/are too large!');
    } 
    } catch (error) {
        console.warn(error);
    }
    

};

module.exports = {
    checkTypeSize
};
