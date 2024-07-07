const { transact } = require("../dbase/transact");
/**
 * Update admin profile
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateAdminProfile = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            email, 
            date_of_birth,
            permanent_address, 
            present_address, 
            city, 
            postal_code,
            country,
            userId
        } = req.body;
        // prepare an sql
        const adminProfileSQL = `update profiles set  
        email = ?, 
        date_of_birth = ?, 
        permanent_address = ?, 
        present_address = ?, 
        city = ?, 
        postal_code = ?,
        country = ? where userId =?`;

        const esc_admin_profile_data = [
            email, 
            date_of_birth,
            permanent_address, 
            present_address, 
            city, 
            postal_code,
            country,
            userId
        ];
        //  get the admin profile object
        const result = await transact(adminProfileSQL, esc_admin_profile_data);
        // check that an update is made to the table
        if (result.affectedRows === 1) {
            // convert to json
            res.status(200).json({
                status: "success",
                message: "profile updated",
                data: result
            })
        }
    } catch (error) {
        console.warn(error);
    }

};

module.exports = {
    updateAdminProfile
}