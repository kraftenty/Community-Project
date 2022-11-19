var express = require('express') // npm install express --save
var app = express();
const port = 3000

var fs = require('fs');
var bodyParser = require('body-parser'); //npm install body-parser --save
var compression=require('compression')

//세션사용을 위한 임포트
var session=require('express-session'); //express-session 미들웨어
var FileStore=require('session-file-store')(session); //세션을 파일에 저장(sessions폴더)



var indexRouter=require('./routes/index.js');
var topicRouter=require('./routes/topic.js');
var authRouter=require('./routes/auth.js');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(compression());
app.get('*',function(request,response,next){//사용자 지정 미들웨어
  fs.readdir('./data', function(error, filelist){
    request.list=filelist;
    next();
  });
});
app.use(session({//세션 미들웨어
  secret: 'qwer1234',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

app.use('/',indexRouter);
app.use('/topic',topicRouter);
app.use('/auth',authRouter);

app.use(function(request, response, next) {
  response.status(404).send('Sorry cant find that!');
});

app.use(function(err,req,res,next){
  console.error(err.stack);
  res.status(500).send('Something Broke!');
});


app.listen(port, function(){
  console.log(`Example app listening on port ${port}`);
});