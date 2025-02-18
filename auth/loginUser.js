const { getUserPassword } = require("./getUserPassword");
const { getUserToken } = require("./getUserToken");
const { checkpass } = require("../utils/hashHelper");
const { escapeHTML } = require("../utils/escapeHTML");
const { Mutex } = require("async-mutex");

// create mutex instance
const mutex = new Mutex();
/**
 * Login user
 * @param {object} req - user request 
 * @param {object} res - response to user request
 */
const loginUser = async (req, res) => {
    // acquire access to the path to do operation (to prevent race condition)
    const release = await mutex.acquire();
    try {
        // get email and password
        const { email, password } = req.body;
        //   check if email and password are not null
        if (!email) {

            res.status(404).json({
                status:"fail",
                message:"email missing",
                data:{}
            });
        }

        if (!password) {

            res.status(404).json({
                status:"fail",
                message:"password missing",
                data:{}
            });
        }
        //  check if both email and password provided
        if (email && password) {
            // make safe email and password by escaping html elements
            const newPassword = escapeHTML(password);
            const newEmail = escapeHTML(email);
            // sql input data to be escape
            const esc = [newEmail];
            //  prepare sql
            const sql = `SELECT password FROM users WHERE email = ?`;
            // get store password
            const DbPassword = await getUserPassword(sql, esc);
            // check to see is not empty
            if (!DbPassword) {

                res.status(404).json({
                    status:"fail",
                    message:"email or password missing",
                    data:{}
                });
            }
            // verify the password with user given password 
            if (checkpass(DbPassword, newPassword)) {
                const sql = `SELECT userId, email FROM users WHERE email = ?`;
                const { token, userId, email} = await getUserToken(sql, esc);

                res.cookie('token', token, { httpOnly: true, secure: false });
                
                res.status(200).json({
                    status:"success",
                    message:"Logged in successfully",
                    data:{
                        token,
                        userId,
                        email  
                    }
                });

            } 

        } else {
            res.status(404).json({
                status:"fail",
                message:"email or password missing",
                data:{}
            });
        }

    } catch (error) {
        // catch error
        console.warn(error);
    } finally {
        // release path for other
        release();
    }

}

module.exports = {
    loginUser
}