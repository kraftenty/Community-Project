//routes 폴더에서 var db=require('../data/db.js');를 쓰시면 됩니다.

const path=require('path');
const sqlite3 = require("sqlite3").verbose();
const db_name = path.join(__dirname, "topic.db");
const db = new sqlite3.Database(db_name, function(err){
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the SQLite database");
});

module.exports=db;