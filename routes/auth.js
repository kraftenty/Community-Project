var express=require('express');
var router=express.Router();
var user=require('../data/user.js');


router.get('/login',function(req,res){
  res.render('login',{
  });
});
//req.body.name===authData.name && req.body.password===authData.password
router.post('/login_process',function(req,res){
  if(user.IsPass(req.body.name, req.body.password)){
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

router.get('/logout',function(req,res){
  req.session.destroy(function(err){
    res.redirect(`/`);
  });
});

module.exports=router;