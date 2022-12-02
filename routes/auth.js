var express=require('express');
var router=express.Router();
var db=require('../data/db.js');

//로그인 파트
router.get('/login',function(req,res){
  res.render('login',{
  });
});

router.post('/login_process',function(req,res){
  db.all(`SELECT * FROM authentication`, function(err,auths){
    if(err){
      return console.error(err.message);
    }

    var isPass=false;
    for(var i=0;i<auths.length;i++){
      if(auths[i].name==req.body.name && auths[i].password==req.body.password){
        isPass=true;
      }
    }
    
    if(isPass){
      req.session.is_logined = true;
      req.session.name = req.body.name;
      req.session.save(function(){ //session객체의 데이터(is_logined,id 등)를 저장
        res.redirect(`/`);
      });
    } else {
      res.send(`
      <script>alert('정보가 일치하지 않습니다.');
      location.href='/auth/login'</script>
      `);
    }
  });
});

router.get('/logout',function(req,res){
  req.session.destroy(function(err){
    res.redirect(`/`);
  });
});

//회원가입 파트
router.get('/register',function(req,res){
  res.render('register',{
  });
});

router.post('/register_process',function(req,res){
  if(req.body.password===req.body.password2){
    db.run(`INSERT INTO authentication (name,password) VALUES('${req.body.name}','${req.body.password}')`,function(err){
      if(err){
        return console.error(err.message);
      }
      res.send(`
      <script>alert('회원가입을 축하합니다. 로그인 해 주세요.');
      location.href='/auth/login'</script>
      `);
    });
  } else {
    res.send(`
    <script>alert('비밀번호가 다릅니다. 정확하게 입력해 주세요.');
    location.href='/auth/register'</script>
    `);
  }
});

module.exports=router;