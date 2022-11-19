var express=require('express');
var router=express.Router();
var db=require('../foo/db.js');

// var auth = require('../lib/auth.js');

router.get('/',function(request,response){
  // var title = 'Welcome';
  // var description = 'Hello, Node.js';
  // var list = template.list(request.list);
  // var html = template.HTML(title, list,
  //   `<h2>${title}</h2>${description}
  //   <p><img src='/images/hello.jpg'></p>
  //   `,
  //   `<a href="/topic/create">create</a>`,
  //   auth.StatusUI(request,response)
  // );
  // response.send(html);
  response.render('index',{
    filelist:request.list,
  });
});

module.exports=router;
