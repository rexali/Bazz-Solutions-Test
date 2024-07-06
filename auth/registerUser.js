const { hashpass } = require("../utils/hashHelper");
const { v4: uuidv4 } = require("uuid");
const { escapeHTML } = require("../utils/escapeHTML");
const { regHTMLMSQ } = require("../utils/regHTMLMSQ");
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

    const { email, password, firstName, lastName } = req.body;
    try {
        const newPassword = escapeHTML(password);
        const newEmail = escapeHTML(email);
        const newFirstName = escapeHTML(firstName);
        const newLastName = escapeHTML(lastName);
        const hassPassword = hashpass(newPassword);
        const rCode = uuidv4();
        const esc = [newEmail, hassPassword, rCode]
        const sql = `INSERT INTO users (email, password, rCode) VALUES (?,?,?)`;
        const sql2 = `INSERT INTO profiles (firstName, lastName, userId) VALUES (?,?,?)`;
        const html = regHTMLMSQ(newEmail, rCode);
        let text = '';
        let subject = 'New registration';
        let format = "html";
        let mailResult = true;  //await mailHelpers.sendMail(email, subject, format, html, text) 
        if (mailResult) {
            try {
                const registerResult = await transact(sql, esc);
                if (registerResult.insertId) {
                    let profileEsc = [newFirstName, newLastName,registerResult.insertId]
                    await transact(sql2, profileEsc);
                }
                res.json({ result: true, ...registerResult });
            } catch (error) {
                console.warn(error);
            }
        } else {
            if (mailResult) {
                res.json({ result: true, ...registerResult });
            } else {
                console.log("Fail to send email");
                res.json({ result: false, error: 'Fail to send email' });
            }
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