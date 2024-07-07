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
    const release = await mutex.acquire();

    const { email, password, username} = req.body;
    try {
        const newPassword = escapeHTML(password);
        const newEmail = escapeHTML(email);
        const newUsername = escapeHTML(username);
        const hassPassword = hashpass(newPassword);
        const esc = [newEmail, hassPassword]
        const sql = `INSERT INTO users (email, password) VALUES (?,?)`;
        const sql2 = `INSERT INTO profiles (username, userId) VALUES (?,?)`;
        
            try {
                const registerResult = await transact(sql, esc);
                if (registerResult.insertId) {
                    let profileEsc = [newUsername,registerResult.insertId]
                    await transact(sql2, profileEsc);
                }
                res.json({ result: true, ...registerResult });
            } catch (error) {
                console.warn(error);
            }

    } catch (error) {
         console.warn(error);
    } finally{
        // release path for other
        release();
    }


}

module.exports = {
    registerUser
}