var express=require('express');
var router=express.Router();
var db=require('../data/db.js');
var auth = require('../lib/auth.js');

router.get('/create',function(req,res){
  if(!auth.IsOwner(req,res)){//접근제어
    res.send(`<script>alert('로그인이 필요합니다');location.href='/'</script>`);
    return false;
  }
  res.render('create',{
    auth:auth.StatusUI(req,res)
  });
});

router.post('/create_process',function(req,res){ //데이터전송시 post방식으로 전송하면, 받는쪽에서는 app.post로 받아야함.
  if(req.body.title===''||req.body.description===''){
    res.send(`<script>alert('내용이 빈 글을 작성할 수 없습니다.');location.href='/topic/create'</script>`);
    return false;
  }
  console.log(auth.getName(req,res));
  db.run(`INSERT INTO topic (title,description,author) VALUES('${req.body.title}','${req.body.description}','${auth.getName(req,res)}')`,function(err){
    if(err){
      return console.error(err.message);
    }
    res.redirect(`/`);
  });
});

router.get('/update/:id',function(req,res){
  if(!auth.IsOwner(req,res)){//접근제어
    res.send(`<script>alert('로그인이 필요합니다');location.href='/'</script>`);
    return false;
  }
  db.get(`SELECT * FROM topic WHERE id=${req.params.id}`,function(err,topic){
    if(err){
      return console.error(err.message);
    }
    res.render('update',{
      model:topic,
      auth:auth.StatusUI(req,res)
    });
  });
});

router.post('/update_process',function(req,res){
  if(req.body.title===''||req.body.description===''){
    res.send(`<script>alert('내용이 빈 글을 작성할 수 없습니다.');location.href='/'</script>`);
    return false;
  }
  db.run(`UPDATE topic SET title='${req.body.title}', description='${req.body.description}' WHERE id=${req.body.id}`,function(err){
    if(err){
      return console.error(err.message);
    }
    res.redirect(`/topic/${req.body.id}`);
  });
});

router.post('/delete_process',function(req,res){
  if(!auth.IsOwner(req,res)){//접근제어
    res.send(`<script>alert('로그인이 필요합니다');location.href='/'</script>`);
    return false;
  }
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
      auth:auth.StatusUI(req,res),
      updateButton:auth.UpdateButtonUI(req,res,req.params.id,topic.author),
      deleteButton:auth.DeleteButtonUI(req,res,req.params.id,topic.author)
    });
  });
});

module.exports=router;