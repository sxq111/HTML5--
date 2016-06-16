window.onload=main;

  function getRgb(r,g,b)
  {
    return "rgb("+ r+","+g+","+b+")";
  }

function main()
{
    var rectlist={};
    var draglist={};
    var canvasEl = document.getElementById('canvas');
    var ctx = canvasEl.getContext('2d');
    var mousePos = [0, 0];
    var canwidth=parseInt(getComputedStyle(canvasEl).width);
    var canheight=parseInt(getComputedStyle(canvasEl).height);
    canvasEl.height=canheight;
    canvasEl.width=canwidth;
    var rows=50;
    var cols=50;
    var block_w=Math.floor(canwidth / cols);
    var block_h=Math.floor(canheight/rows);
    var divcolor=document.getElementById("mycolor");
    var mcols=divcolor.getElementsByClassName("colors");
    var brushElement=undefined;
    var canvasclicked=true;
    var mousdown=false;

    for(var i=0;i<mcols.length;i++)
    {
        mcols[i].onclick=function (ele) {
            for(var n=0;n<mcols.length;n++){
                mcols[n].className="colors";
            }
            if(ele.srcElement)
            {
                ele.srcElement.className="colors active";
                brushElement=ele.srcElement;
            }else
            {
                ele.target.className="colors active";
                brushElement=ele.target;
            }
        }
    }

    init_rectlist();

    update();
 function init_rectlist(){
     for(var m=0;m<rows;m++){
         for(var n=0;n<cols;n++)
         {
             rectlist[m+","+n]={mycol:"#000"};
         }
     }


 }
 function changeRect(ex,ey){
     if(brushElement) {
         rectlist[ex + "," + ey].mycol = brushElement.value;
     }
 }
 function draw_grid()
 {

     ctx.strokeStyle=getRgb(15,15,15);
     ctx.beginPath();
     ctx.lineWidth=1;
        for(var i=0;i<=rows;i++)
        {
            ctx.moveTo(0,Math.floor(i*block_h));
            ctx.lineTo(Math.floor(canwidth),Math.floor(i*block_h));

        }
        for(var i=0;i<=cols;i++)
        {
            ctx.moveTo(Math.floor(i * block_w), 0);
            ctx.lineTo(Math.floor(i * block_w),Math.floor(canheight));

        }
     ctx.stroke();
    }

 document.addEventListener("keydown",function (e) {

     var num=e.keyCode-49;
     if(num>=0&&num<mcols.length)
     {
         for (var n = 0; n < mcols.length; n++) {
             mcols[n].className = "colors";
         }
         mcols[num].className = "colors active";
         brushElement = mcols[num];
     }

 });

    canvasEl.onmousemove=function (e) {
        if(e.clientX<canvasEl.width &&e.clientY<canvasEl.height)
        {
            mousePos[0]= Math.floor(e.clientX/block_w);
            mousePos[1]= Math.floor(e.clientY/block_h);
        }
        if(mousdown)
        {
            if(draglist[mousePos[0]+","+mousePos[1]])
            {}
            else{
                draglist[mousePos[0]+","+mousePos[1]]=true;
            }
        }
    }

  canvasEl.onclick=function () {
        canvasclicked=true;
       changeRect(mousePos[0],mousePos[1]);
    }
  canvasEl.onmousedown=function (e){
      mousdown=true;

  }
  canvasEl.onmouseup=function (e){
      mousdown=false;
      for(var i in draglist)
      {
          var arr=i.split(",");
          var x=parseInt(arr[0]);
          var y=parseInt(arr[1]);
          changeRect(x,y);

      }
      draglist=[];
    }
    window.onmousedown=function (e) {
   //鼠标点击事件
 }

  function draw_selected(x,y){

      var tc="#fff";
      if(brushElement){
          tc=brushElement.value;
      }
      ctx.strokeStyle=tc;
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(x*block_w,0);
      ctx.lineTo(x*block_w,canvasEl.height);
      ctx.moveTo((x+1)*block_w,0);
      ctx.lineTo((x+1)*block_w,canvasEl.height);
      ctx.moveTo(0,y*block_h);
      ctx.lineTo(canvasEl.width,y*block_h);
      ctx.moveTo(0,(y+1)*block_h);
      ctx.lineTo(canvasEl.width,(y+1)*block_h);
      ctx.stroke();

  }
    function draw_dragline(){
        ctx.strokeStyle="#FFF";
        if(brushElement){
            ctx.strokeStyle=brushElement.value;
        }
        for(var i in draglist)
        {
            var arr=i.split(",");
            var x=parseInt(arr[0]);
            var y=parseInt(arr[1]);
            ctx.beginPath();
            ctx.arc(Math.floor(x*block_w+block_w/2),Math.floor(y*block_h+block_h/2),2,0,2*Math.PI);
            ctx.stroke();
        }
    }

  function update() 
  {
      render();

      window.requestAnimationFrame(update);

  }
  function  render() 
  {

      if(canvasclicked==true) {
          draw_allRects();
          canvasclicked=false;
      }
      draw_dragline();
      draw_selected(mousePos[0],mousePos[1]);
      draw_grid();

  }
  
  function draw_allRects() {
      for(var m=0;m<rows;m++){
          for(var n=0;n<cols;n++)
          {
              ctx.fillStyle=rectlist[m+","+n].mycol;
              ctx.fillRect(m*block_h,n*block_w,(m+1)*block_h,(n+1)*block_w);
          }
      }
  }
}


