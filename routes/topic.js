var express=require('express');
var router=express.Router();
var db=require('../foo/db.js');

var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');

var template = require('../lib/template.js');
// var auth = require('../lib/auth.js');

router.get('/create',function(request,response){
  // if(!auth.IsOwner(request,response)){//로그인이 안되어있으면 홈으로 보내버림(접근제어)
  //   response.send(`<script>alert('need login!');location.href='/'</script>`);
  //   return false;
  // }
  var title = 'Create';
  var list = template.list(request.list);
  var html = template.HTML(title, list, `
    <form action="/topic/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
        <input type="submit" value='create'>
      </p>
    </form>
  `,
  `<p><h2>Create ...</h2></p>`,
  `<p>authstatusui dummy data</p>`
  // auth.StatusUI(request,response)
  );
  response.send(html);
});

router.post('/create_process',function(request,response){ //데이터전송시 post방식으로 전송하면, 받는쪽에서는 app.post로 받아야함.
  // if(!auth.IsOwner(request,response)){//로그인이 안되어있으면 홈으로 보내버림(접근제어)
  //   response.send(`<script>alert('need login!');location.href='/'</script>`);
  //   return false;
  // }
  var post = request.body;
  var title = post.title;
  var description = post.description;
  fs.writeFile(`data/${title}`, description, 'utf8', function(err){
    response.redirect(`/topic/${title}`);
  })
});

router.get('/update/:pageId',function(request,response){
  // if(!auth.IsOwner(request,response)){//로그인이 안되어있으면 홈으로 보내버림(접근제어)
  //   response.send(`<script>alert('need login!');location.href='/'</script>`);
  //   return false;
  // }
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
    var title = request.params.pageId;
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `
      <form action="/topic/update_process" method="post">
        <input type="hidden" name="id" value="${title}">
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
          <textarea name="description" placeholder="description">${description}</textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
      `,
      `<p><h2>Update ${title} ...</h2></p>`,
      `<p>authstatusui dummy data</p>`
       // auth.StatusUI(request,response)
    );
    response.send(html);
  });
});

router.post('/update_process',function(request,response){
  // if(!auth.IsOwner(request,response)){//로그인이 안되어있으면 홈으로 보내버림(접근제어)
  //   response.send(`<script>alert('need login!');location.href='/'</script>`);
  //   return false;
  // }
  var post = request.body;
  var id = post.id;
  var title = post.title;
  var description = post.description;
  fs.rename(`data/${id}`, `data/${title}`, function(error){
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      response.redirect(`/topic/${title}`);
    })
  });
});

router.post('/delete_process',function(request,response){
  // if(!auth.IsOwner(request,response)){//로그인이 안되어있으면 홈으로 보내버림(접근제어)
  //   response.send(`<script>alert('need login!');location.href='/'</script>`);
  //   return false;
  // }
  var post = request.body;
  var id = post.id;
  var filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, function(error){
    response.redirect('/');
  });
});


router.get('/:pageId',function(request,response,next){
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
    if(err){
      next(err);
    } else{
      // var title = request.params.pageId;
      // var sanitizedTitle = sanitizeHtml(title);
      // var sanitizedDescription = sanitizeHtml(description, {
      //   allowedTags:['h1']
      // });
      // var list = template.list(request.list);
      // var html = template.HTML(sanitizedTitle, list,
      //   `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
      //   ` <a href="/topic/create">create</a>
      //     <a href="/topic/update/${sanitizedTitle}">update</a>
      //     <form action="/topic/delete_process" method="post">
      //       <input type="hidden" name="id" value="${sanitizedTitle}">
      //       <input type="submit" value="delete">
      //     </form>
      //   `,
      //   `<p>authstatusui dummy data</p>`
      //   // auth.StatusUI(request,response)
      // );
      // response.send(html);
      response.render('topic',{
        title:filteredId,
        description:description
      });
    }
  });
});

module.exports=router;