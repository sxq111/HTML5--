/**
 * Created by Administrator on 2016/6/12 0012.
 */
window.onload=main;

function getRgb(r,g,b)
{
    return "rgb("+ r+","+g+","+b+")";
}

function main()
{


    var starlist =[];

    var canvasEl = document.getElementById('canvas');
    var ctx = canvasEl.getContext('2d');
    var mousePos = [0, 0];
    var backgroundColor = '#000';
    var gravity=0.5;
    canvasEl.width=canvasEl.clientWidth;
    canvasEl.height=canvasEl.clientHeight;
    var Z_max=(canvasEl.width+canvasEl.height);
    var centerX=0;
    var centerY=canvasEl.height;
    var dist=Z_max;
    var movx2;
    var movx;
    var movy;
    var drawmode=true;
    var speed=30;
    function addstar(type,mx,my)
    {
        var cx,cy;
        if(type==1)
        {
            cx=0;
            cy=canvasEl.height;
            mx=movx;
        }else{
            cx=canvasEl.width;
            cy=canvasEl.height;
            mx=movx2;
        }
        star={
            mousx:mx,
            mousy:my,
            globalX:0,
            globalY:0,
            globalZ:0,
            posx:undefined,
            posy:undefined,
            posxpre:undefined,
            posypre:undefined,
            die:false,
            mymovx:mx,
            mymovy:movy,
            mycenterx:cx,
            mycentery:cy
        };
        starlist.push(star);
    }

    window.onresize=function ()
    {
        canvasEl.width=canvasEl.clientWidth;
        canvasEl.height=canvasEl.clientHeight;
        centerX=canvasEl.width/2;
        centerY=canvasEl.height/2;
        Z_max=(canvasEl.width+canvasEl.height);
        starlist=[];

    }

    window.onmousemove=function (e) {
        //鼠标移动事件
        mousePos[0]=e.clientX;
        mousePos[1]=e.clientY;
        movx=e.clientX-centerX;
        movy=e.clientY-centerY;
        movx2=e.clientX-canvasEl.clientWidth;
    }
    window.onmousedown=function (e) {
        //鼠标点击事件
        addstar(1,e.clientX,e.clientY);
        addstar(0,e.clientX,e.clientY);
    }



    window.requestAnimationFrame(update);
    function update()
    {


        starlist.forEach(function(e){
            e.globalZ+=speed;
            e.posxpre=e.posx;
            e.posypre=e.posy;
            e.posx=e.mycenterx+e.globalX*(Z_max/(e.globalZ+Z_max));
            e.posy=e.mycentery+e.globalY*(Z_max/(e.globalZ+Z_max));
            e.globalX+=e.mymovx/30;
            e.globalY+=e.mymovy/30;

            if(e.posy<e.mousy)
            {
                e.die=true;
            }
        });
        for(var i=starlist.length-1;i>=0;i--)
        {
            if(starlist[i].die)
            {
                alert(starlist[i].globalZ);
                starlist.splice(i,1);
                //alert("d");
            }
        }
        render();
        window.requestAnimationFrame(update);
    }
    function  render()
    {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
        starlist.forEach(function(e){


                ctx.beginPath();
                var lwidth=3*(Z_max-e.globalZ)/Z_max+1  ;
                ctx.lineWidth=lwidth;
                ctx.strokeStyle="#FFF";
                if(e.posxpre && e.posy){
                    ctx.moveTo(e.posxpre,e.posypre);
                    ctx.lineTo(e.posx,e.posy);
                }
                ctx.stroke();



        });

    }


}