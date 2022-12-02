var express=require('express');
var router=express.Router();
var db=require('../data/db.js');
var auth = require('../lib/auth.js');

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
  db.all(`SELECT * FROM authentication`, function(err,auths){ //이름 중복검사
    if(err){
      return console.error(err.message);
    }
    var isOverlapped=false;
    for(var i=0;i<auths.length;i++){
      if(auths[i].name==req.body.name){
        isOverlapped=true;
      }
    }
    if(isOverlapped){
      res.send(`
      <script>alert('이름 ${req.body.name}은(는) 이미 사용 중입니다. 다른 이름으로 가입하세요.');
      location.href='/auth/register'</script>
      `);
    } else {
      if(req.body.password===req.body.password2){ //비밀번호 잘 입력했는지 검사
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
    }
  });
});

//계정관리 파트
router.get('/settings',function(req,res){
  res.render('settings',{
  });
});

router.post('/settings_process',function(req,res){
  console.log(`name=${auth.getName(req,res)}`);
  console.log(`DELETE FROM authentication WHERE name=${auth.getName(req,res)}`);
  db.run(`DELETE FROM authentication WHERE name='${auth.getName(req,res)}'`,function(err){
    if(err){
      return console.error(err.message);
    }
    res.send(`
    <script>alert('계정 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.');
    location.href='/auth/logout'</script>
    `);
  });
});


module.exports=router;