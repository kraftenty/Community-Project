const name=['admin','hgr','favo'];
const password=['1111','1234','qwer1234'];
module.exports={
  IsUser:function(nameparam){
    for(var i=0;i<name.length;i++){
      if(nameparam===name[i]){
        return i;
      }
    }
    return -1;
  },
  IsPass:function(nameparam,passwordparam){
    if(this.IsUser(nameparam)>=0){
      var nameIdx=this.IsUser(nameparam);
    } else {
      return false;
    }
    for(var i=0;i<password.length;i++){
      if(passwordparam===password[i]){
        if(i===nameIdx){
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }
}