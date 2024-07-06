const { connectDb } = require("./connectDb");
/**
 * create database by passing the database name
 * @param {String} dbname : database name;
 */
function createDb(dbname) {
  try {
    connectDb().query("CREATE DATABASE " + dbname, function (err, result) {
      if (err) throw err;
      console.log("Database created");
      res.set('Content-Type', 'application/json');
      res.send('{"result":' + dbname + ' database created}');
    });
  } catch (error) {
    console.warn(error);
  }

}

module.exports = {
  createDb
}