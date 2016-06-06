document.body.onload = game;
var can1 ;
var can2;
var ctx1;
var ctx2;
var canH;
var canW;
var lastTime;
var deltaTime;
var bgpic=new Image();
var arr=new Array();
var Hillnums=200;
var i=0;
function log(){
console.log(i);
}
function game()
{

  for(i=0;i<5;i++)
  {
    setTimeout(log,0);
}
	var arr=["1aa",2,3];
	person={};
	person[arr[0]]=true;

	//console.log("onload");
	init();
	gameloop();
}
function init()
{
	

	//get canvas
	can1=document.getElementById("canvas1");// front fish dust ui circle
	ctx1=can1.getContext("2d");
	can2=document.getElementById("canvas2");//bg food
	ctx2=can2.getContext("2d");
	lastTime=Date.now();
	deltaTime=0;
	bgpic.src="./src/background.jpg";
	canW=can1.width;
	canH=can1.height;
	if(Hillnums>canW){
		alert("节点超出范围");
		return;
	}
	for(var i=0;i<Hillnums;i++)
		{
 		   arr[i]=0;
		}
		diguitest(0,arr.length-1);
		for(var i=0;i<arr.length;i++)
		{
			arr[i]=canH-arr[i]*0.5;
 		  console.log(arr[i]);
		}
}
function gameloop()
{
		// better than setinterval settimeout
	//console.log("loop");
	 window.requestAnimFrame(gameloop);
	 var nowtime=Date.now();
	 deltaTime=nowtime-lastTime;
	 lastTime=nowtime;
	 MydrawLine();
	 //drawBackground();
	 //console.log(deltaTime);
	//setTimeout("gameloop()",1000/25);
}

