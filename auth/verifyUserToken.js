const jwt = require("jsonwebtoken");
const { Mutex } = require("async-mutex");
const { transact } = require("../dbase/transact");

// create mutex instance
const mutex = new Mutex();

// create mutex instance 
async function verifyUserToken(req, res) {
       // acquire access to the path to do operation (for race condition)
       const release = await mutex.acquire();
       const token = req.body.token || req.cookies.token;
       try {
              let decoded = jwt.verify(token, process.env.SECRET_KEY);
              if (decoded.result[0]?.userId && decoded.result[0]?.email) {
                     let profileEsc = [decoded.result[0].userId];
                     const sql2 = `SELECT username FROM profiles WHERE userId = ?`;
                     const profile = await transact(sql2, profileEsc);
                     const username = profile[0].username;
                     return res.json({
                            result: true,
                            token,
                            email: decoded.result[0].email,
                            userId: decoded.result[0].userId,
                            username,
                     });
              } else {
                     return res.json({ result: false });
              }

       } catch (error) {
              return res.json({ result: false });
       } finally {
              // release path for other
              release();
       }

}
module.exports = {
       verifyUserToken
}
