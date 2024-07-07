const { connectDb } = require("../dbase/connectDb");
const { Mutex } = require("async-mutex");

// create mutex instance
const mutex = new Mutex();
/**
 * Get user password
 * @param {string} sql - a string of sql statement 
 * @param {Array} esc - an array of sql statement input
 * @returns void
 */
async function getUserPassword(sql, esc) {
  // acquire access to the path to do operation (for race condition)
  const release = await mutex.acquire();
  try {
    // create promise instance
    const promise = new Promise((resolve, reject) => {
      // connect to db
      connectDb().query(sql, esc, function (err, result, fields) {
        // check if error
        if (err) {
          // reject if error
          reject(err);
        }
        // check onely one row return
        if (result.length === 1) {
          // resolve and send the password
          resolve(result[0]?.password);
        } else {
          // otherwise resove and send empty value
          resolve("");
        }
      });
    });
    // return promise
    return promise;
    // catch error
  } catch (error) {
    // log error
    console.warn(error);
  } finally {
    // release path for other
    release();
  }

}


module.exports = {
  getUserPassword
}