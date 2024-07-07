const { hashpass } = require("../utils/hashHelper");
const { escapeHTML } = require("../utils/escapeHTML");
const { transact } = require("../dbase/transact");
const { Mutex } = require("async-mutex");

// create mutex instance
const mutex = new Mutex();
/**
 * Register new user
 * @param {object} req - user request object
 * @param {object} res - response to user request
 */
const registerUser = async (req, res) => {
    // secure route from any operation after the first to prevent race condition
    const release = await mutex.acquire();
    // get the reaquest body data
    const { email, password, username } = req.body;
    try {
        // escape email, username and password in case  of XSS
        const newPassword = escapeHTML(password);
        const newEmail = escapeHTML(email);
        const newUsername = escapeHTML(username);
        // hash the password
        const hassPassword = hashpass(newPassword);
        // escape email and password in case  of sql injection attack
        const esc = [newEmail, hassPassword]
        // prepare sql
        const sql = `INSERT INTO users (email, password) VALUES (?,?)`;
        const sql2 = `INSERT INTO profiles (username, userId) VALUES (?,?)`;

        try {
            // enter data to users table
            const registrationResult = await transact(sql, esc);
            // check if profileId is defined
            if (registrationResult.insertId) {
                // escape username and profileId = registerationResult.insertId
                let escape_profile_data = [newUsername, registrationResult.insertId]
                // enter data to profile table
                await transact(sql2, escape_profile_data);
                // send json data
                res.status(200).json({
                    status: "success",
                    message: "registration successful",
                    data: { ...registrationResult }
                });
            }
            // catch error
        } catch (error) {
            // log error
            console.warn(error);
        }
        // catch error
    } catch (error) {
        // log error
        console.warn(error);
    } finally {
        // release path for other
        release();
    }


}

module.exports = {
    registerUser
}