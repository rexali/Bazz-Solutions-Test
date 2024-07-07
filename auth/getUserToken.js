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
        if (err) {
          reject(err);
        }
        const [{ userId, email}] = result;
        const jwtSecret = process.env.SECRET_KEY;
        const token = jsonwebtoken.sign(
          { result },
          jwtSecret,
          { noTimestamp: true, expiresIn: '24h' }
        );
        resolve({ token, userId, email})
      });
    });

    return tokenPromise;
  } catch (error) {
    console.log(error);
  } finally {
    // release path for other
    release();
  }

}

module.exports = {
  getUserToken
}