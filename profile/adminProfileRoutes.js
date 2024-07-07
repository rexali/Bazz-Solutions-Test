const express = require("express");

const { getAdminProfile } = require("./getAdminProfile");
const { updateAdminProfile } = require("./updateAdminProfile");

// initialize admin profile router
const adminProfileRouter = express.Router();
// get a particular admin profile
// adminProfileRouter.get('me/:id', getAdminProfile);
adminProfileRouter.get('/me', getAdminProfile);
// update an admin profile
// adminProfileRouter.patch("/me/:id", updateAdminProfile);
adminProfileRouter.patch("/me", updateAdminProfile);
// export the profile router to make it available
module.exports = {
    adminProfileRouter
}