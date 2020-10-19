const connection = require("./config").connection;
let dataSql = require("./dbStructure").db;

function createTable(data, isEnd = false) {
  connection.query(data, function (err, results, fields) {
    if (err) {
      throw err;
    }
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
    if (isEnd) {
      console.log("successfully create table");
      process.exit();
    }
  });
}

async function main() {
  dataSql = dataSql.replace(/\r?\n|\r?\t/g, " ").split(";");
  dataSql = dataSql.slice(0, dataSql.length - 1);
  dataSql.forEach((sqlQuery, index) => {
    if (index == dataSql.length - 1) {
      createTable(sqlQuery, true);
    } else {
      createTable(sqlQuery);
    }
  });
}

main();
