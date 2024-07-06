const {connectDb} = require("./connectDb")

/**
 * create table by passing query and the table name
 * @param {String} sql : sql query
 * @param {String} name : name of the table to be created
 */
function createTable(sql, name, res) {
  try {
    connectDb().query(sql, function (err, result) {
      if (err) throw err;
      console.log(name + " table created");
      res.set('Content-Type', 'application/json');
      res.send('{"result":' + name + ' table created}');
    });
  } catch (error) {
    console.warn(error);
  }
  
  }
  module.exports={
    createTable
  }