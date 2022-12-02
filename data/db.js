//routes 폴더에서 var db=require('../data/db.js');를 쓰시면 됩니다.

const path=require('path');
const sqlite3 = require("sqlite3").verbose();
const db_name = path.join(__dirname, "database.db");
const db = new sqlite3.Database(db_name, function(err){
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the SQLite database");
  //테이블 새로 만들기
  //db.run('CREATE TABLE authentication(name text not null, password text not null)');
  //db.run('DROP TABLE authentication');
});

module.exports=db;