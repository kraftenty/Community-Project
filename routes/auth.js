var express=require('express');
var router=express.Router();

var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');

var authData={
  email:'test',
  password:'1234',
  nickname:'admin'
}

router.get('/login',function(request,response){
  var title = 'Login';
  var list = ``;
  var html = template.HTML(title, list, `
    <form action="/auth/login_process" method="post">
      <p><input type="text" name="email" placeholder="email"></p>
      <p><input type="password" name="pwd" placeholder="password"></p>
      <p><input type="submit" value='login'></p>
    </form>
  `,
  `<p><h2>Login ...</h2></p>`
  );
  response.send(html);
});

router.post('/login_process',function(request,response){ //데이터전송시 post방식으로 전송하면, 받는쪽에서는 app.post로 받아야함.
  var post = request.body;
  var email = post.email;
  var password = post.pwd;
  if(email===authData.email && password===authData.password){
    request.session.is_logined=true;
    request.session.nickname=authData.nickname;
    request.session.save(function(){ //session객체의 데이터(is_logined,nickname 등)를 저장
      response.redirect(`/`);
    });
  } else {
    response.send('Who?');
  }
});

router.get('/logout',function(request,response){
  request.session.destroy(function(err){
    response.redirect(`/`);
  });
});

module.exports=router;