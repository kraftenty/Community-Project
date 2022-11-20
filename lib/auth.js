module.exports={
  IsOwner:function(req,res){
    console.log(req.session.is_logined);
    if(req.session.is_logined){
      return true;
    } else {
      return false;
    }
  },
  StatusUI:function(req,res){
    var authStatusUI = `<a class="loginSet" href='/auth/login'>로그인</a>`;
    if(this.IsOwner(req,res)){
      authStatusUI=`
      <a class="loginSet" href='/auth/logout'>로그아웃</a>
      <a class="loginSet">계정 : ${req.session.name}</a>
      `
    }
    return authStatusUI;
  }
}