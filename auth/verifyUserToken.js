const jwt = require("jsonwebtoken");
const { Mutex } = require("async-mutex");
const { transact } = require("../dbase/transact");
const { escapeHTML } = require("../utils/escapeHTML");

// create mutex instance
const mutex = new Mutex();

// create mutex instance 
async function verifyUserToken(req, res) {
       // acquire access to the path to do operation (to prevent race condition)
       const release = await mutex.acquire();
       // get login token from the body or cookie object
       const token = escapeHTML(req.body.token) || req.cookies.token;
       // escape admin userId and username
       const userId = escapeHTML(req.body.userId);
       const username =  escapeHTML(req.body.username);
       // try
       try {
              // verify token is signed
              let decoded = jwt.verify(token, process.env.SECRET_KEY);
              // check userId and email are defined in the token
              if (decoded.result[0]?.userId && decoded.result[0]?.email) {
                     // escape admin profile userId
                     let escape_profile_userId = [decoded.result[0].userId];
                     // prepare sql statement
                     const sql2 = `SELECT username FROM profiles WHERE userId = ?`;
                     // get the admin profile data
                     const profile = await transact(sql2, escape_profile_userId);
                     // check username and userId are the same with the given ones
                     if (profile[0].username===username && profile[0].userId===userId ) {
                            // return the data
                            return res.status(200).json({status:"success", message:"verified",data:{token,userId,username,email}});
                     }
              } else {
                     // return the data if verification fails
                     return res.status(404).json({status:"fail", message:"verification failed",data:{} });
              }

       } catch (error) {
               // return the data if verification fails
              return res.json({status:"fail", message:"verification failed",data:{} });
       } finally {
              // release path for other
              release();
       }

}
module.exports = {
       verifyUserToken
}
