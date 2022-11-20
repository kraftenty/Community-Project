var express=require('express');
var router=express.Router();
var db=require('../data/db.js');


// var auth = require('../lib/auth.js');

router.get('/create',function(req,res){
  // if(!auth.IsOwner(reqw,res)){//로그인이 안되어있으면 홈으로 보내버림(접근제어)
  //   res.send(`<script>alert('need login!');location.href='/'</script>`);
  //   return false;
  // }
  res.render('create',{
  });
});

router.post('/create_process',function(req,res){ //데이터전송시 post방식으로 전송하면, 받는쪽에서는 app.post로 받아야함.
  // if(!auth.IsOwner(req,res)){//로그인이 안되어있으면 홈으로 보내버림(접근제어)
  //   res.send(`<script>alert('need login!');location.href='/'</script>`);
  //   return false;
  // }
  db.run(`INSERT INTO topic (title,description) VALUES('${req.body.title}','${req.body.description}')`,function(err){
    if(err){
      return console.error(err.message);
    }
    res.redirect(`/`);
  });
});

router.get('/update/:id',function(req,res){
  // if(!auth.IsOwner(req,res)){//로그인이 안되어있으면 홈으로 보내버림(접근제어)
  //   res.send(`<script>alert('need login!');location.href='/'</script>`);
  //   return false;
  // }
  db.get(`SELECT * FROM topic WHERE id=${req.params.id}`,function(err,topic){
    if(err){
      return console.error(err.message);
    }
    res.render('update',{
      model:topic
    });
  });
});

router.post('/update_process',function(req,res){
  // if(!auth.IsOwner(req,res)){//로그인이 안되어있으면 홈으로 보내버림(접근제어)
  //   res.send(`<script>alert('need login!');location.href='/'</script>`);
  //   return false;
  // }
  db.run(`UPDATE topic SET title='${req.body.title}', description='${req.body.description}' WHERE id=${req.body.id}`,function(err){
    if(err){
      return console.error(err.message);
    }
    res.redirect(`/topic/${req.body.id}`);
  });
});

router.post('/delete_process',function(req,res){
  // if(!auth.IsOwner(req,res)){//로그인이 안되어있으면 홈으로 보내버림(접근제어)
  //   reds.send(`<script>alert('need login!');location.href='/'</script>`);
  //   return false;
  // }
  db.run(`DELETE FROM topic WHERE id=${req.body.id}`,function(err){
    if(err){
      return console.error(err.message);
    }
    res.redirect('/');    
  });
});

router.get('/:id',function(req,res){
  db.get(`SELECT * FROM topic WHERE id=${req.params.id}`,function(err,topic){
    if(err){
      return console.error(err.message);
    }
    res.render('topic',{
      model:topic,
    });
  });
});

module.exports=router;