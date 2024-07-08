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
        const { userId } = req.body;
        // protect against sql injection attack
        const escape_userId = [userId]; 
        // get profile data
        const result = await transact(sql, escape_userId);
        // convert the admin profile object to json object

        res.status(200).json({
            status: "success",
            message: "profile collected",
            data: {...result}
        })
    } catch (error) {
        // catch  the error
        console.warn(error);
    }

}

module.exports = {
    getAdminProfile
}