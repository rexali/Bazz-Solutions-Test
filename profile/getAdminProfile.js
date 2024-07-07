const { transact } = require("../dbase/transact");

/** 
 * Get an admin profile
 * @param {object} req - request object
 * @param {object} res - response object to user request
 */
const getAdminProfile = async (req, res) => {
    try {
        // prepare an sql
        const sql = `select * from profiles where userId=? `;
        // get the admin userId
        // const userId = req.params.id;
        const { userId } = req.body;
        const escape_userId = [userId]; // protect against sql injection attack
        // convert the admin profile object to json object
        res.json(
            // get the admin object
            await transact(sql, escape_userId)
        )
    } catch (error) {
        // catch  the error
        console.warn(error);
    }

}

module.exports = {
    getAdminProfile
}