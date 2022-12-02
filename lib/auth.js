module.exports={
  IsOwner:function(req,res){
    if(req.session.is_logined){
      return true;
    } else {
      return false;
    }
  },
  getName:function(req,res){
    return req.session.name;
  },
  StatusUI:function(req,res){
    var authStatusUI = `
    <a class="loginSet" href='/auth/login'>로그인</a>
    <a class="loginSet" href='/auth/register'>회원가입</a>
    `;
    if(this.IsOwner(req,res)){
      authStatusUI=`
      <a class="loginSet" href='/auth/logout'>로그아웃</a>
      <a class="loginSet">계정 : ${req.session.name}</a>
      <a class="loginSet" href='/auth/settings'>계정관리</a>
      `;
    }
    return authStatusUI;
  },
  UpdateButtonUI:function(req,res,currentId,currentAuthor){
    var ui=`
    <a class="appbarButton" href="/topic/update/${currentId}">수정</a>
    `;
    if(req.session.name!=currentAuthor){
      ui=``;
    }
    return ui;
  },
  DeleteButtonUI:function(req,res,currentId,currentAuthor){
    var ui=`
    <form action="/topic/delete_process" method="post">
      <input type="hidden" name="id" value=${currentId}>
      <input type="hidden" name="author" value=${currentAuthor}>
      <input class="deleteButton" type="submit" value="삭제">
    </form>
    `;
    if(req.session.name!=currentAuthor){
      ui=``;
    }
    return ui;
  }
}