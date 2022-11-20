var express=require('express');
var router=express.Router();
var db=require('../data/db.js');

var auth = require('../lib/auth.js');

router.get('/',function(req,res){
  db.all(`SELECT * FROM topic`,function(err,topic){
    if(err){
      return console.error(err.message);
    }
    res.render('index',{
      model:topic,
      auth:auth.StatusUI(req,res)
    });
  });
});

module.exports=router;
