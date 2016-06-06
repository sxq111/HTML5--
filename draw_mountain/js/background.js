function drawBackground()
{
	ctx2.drawImage(bgpic,0,0,canW,canH);
		
}


function diguitest(sp,ep)
{
	var mid=Math.floor((sp+ep)/2);
	
	if(sp-ep==1 ||ep-sp==1)
	{
		return;
	}else{

		arr[mid]=(arr[sp]+arr[ep])/2+Math.abs(sp-ep)*Math.random()*canW/arr.length;
		diguitest(sp,mid);
		diguitest(mid,ep);
}
	//console.log(mid);
}

function MydrawLine()
{
	ctx2.beginPath(); 
	ctx2.lineWidth="1";
	ctx2.strokeStyle="black";
	ctx2.moveTo(0,canH);
	for(var i=0;i<arr.length;i++)
	{
		ctx2.lineTo(i*canW/arr.length,arr[i]);
	}
	ctx2.stroke();
}
