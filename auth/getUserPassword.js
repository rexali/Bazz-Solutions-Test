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
    const promise = new Promise((resolve, reject) => {
      connectDb().query(sql, esc, function (err, result, fields) {
        if (err) {

          reject(err);
        }
        if (result.length === 1) {
          resolve(result[0]?.password);
        } else {
          resolve("");
        }
      });
    });

    return promise;
  } catch (error) {
    console.warn(error);
  } finally {
    // release path for other
    release();
  }

}


module.exports = {
  getUserPassword
}