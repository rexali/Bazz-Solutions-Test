const { connectDb } = require("../dbase/connectDb");
const jsonwebtoken = require("jsonwebtoken");
const { Mutex } = require("async-mutex");

// create mutex instance
const mutex = new Mutex();

/**
 * Get the user authentication token
 * @param {String} sql - a string of sql
 * @param {Array} esc - an array of arguments
 * @param {Object} res - request object
 */
async function getUserToken(sql, esc) {
  // acquire access to the path to do operation (for race condition)
  const release = await mutex.acquire();
  try {
    const tokenPromise = new Promise((resolve, reject) => {
      connectDb().query(sql, esc, function (err, result, fields) {
        // check if error
        if (err) {
          reject(err);
        }
        // get userId and email
        const [{ userId, email}] = result;
        // get the secret key
        const jwtSecret = process.env.SECRET_KEY;
        // sign the token which expires after 24 hours
        const token = jsonwebtoken.sign({ result },jwtSecret,{noTimestamp: true, expiresIn: '24h'}
        );
        // resolve
        resolve({ token, userId, email})
      });
    });
    // return promise
    return tokenPromise;
    // catch error
  } catch (error) {
    // log error
    console.log(error);
  } finally {
    // release path for other
    release();
  }

}

module.exports = {
  getUserToken
}