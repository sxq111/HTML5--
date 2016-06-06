
window.onload=main;

function  main() {
    var btnStart=document.getElementById("startbtn");
    var btnend=document.getElementById("endbtn");
    var txt=document.getElementById("randomtext");
    var strs=["华为7手机","50元现金","QQ会员1月","牛奶一箱","20元代金券","铅笔5支","洗衣粉一袋"];
    var mytimer;
    btnend.style.background="gray";
    document.onkeyup=function (e) {
        if(e.keyCode==13)
        {
         if(mytimer==undefined){
            btnStart.onclick();
         }else{
            btnend.onclick();
         }
        }
    }
    btnStart.onclick=function(){
       // if(mytimer!=null){
            //防止重复触发(也可以先clearInterval)
      //      alert("Started");
      //      return;
      //  }
        clearInterval(mytimer);
        btnStart.style.background="gray";
        btnend.style.background="black";
        mytimer=window.setInterval(function (){
            var rand=Math.floor( Math.random()*strs.length);
            txt.innerHTML=strs[rand];
        },50);
    }
    btnend.onclick=function () {
      if(mytimer==undefined)
      {
          alert("UnStart");
          return;
      }
        btnStart.style.background="black";
        btnend.style.background="gray";
        window.clearInterval(mytimer);
        mytimer=undefined;
    }
}