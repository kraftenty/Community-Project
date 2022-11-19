var express=require('express');

//세션사용을 위한 임포트
var session=require('express-session'); //express-session 미들웨어
var FileStore=require('session-file-store')(session);

var app=express();

//세션 코드
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));



app.get('/',function(req,res,next){
  console.log(req.session); 
  if(req.session.num===undefined){
    req.session.num=1;
  } else{
    req.session.num+=1;
  }
  res.send(`Hello Session ${req.session.num}`);
});

app.listen(3000,function(){
  console.log('Example app listening on port 3000!');
});