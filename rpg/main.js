var mapArray, ctx, currentImgMainX, currentImgMainY;
var imgMountain, imgMain, imgEnemy;
//mapArray:決定地圖中每個格子的元素
//ctx:html5 canvas用
//currentImgMainX、currentImgmMainY:決定主角的所在座標
//imgMountain、imgMain、imgEnemy:障礙物、主角、敵人的圖片物件

//當網頁元建仔入完成後的事情
$(document).ready(function(){
    //遊戲地形設定
    //0:可走、1:障礙、2:終點、3:敵人
    mapArray = [ 0,1,0,0
                ,0,0,0,3
                ,1,3,0,3
                ,1,2,0,0];
    ctx = $("#myCanvas")[0].getContext("2d");
    
    //擺上主角 使用預設位置
    imgMain = new Image();
    imgMain.src = "rpg/images/PixelArt.png";
    currentImgMainX=0;
    currentImgMainY=0;
    imgMain.onload=function(){//等到圖片載入後再做以下
    {
      ctx.drawImage(imgMain,0,0,240,310,currentImgMainX,currentImgMainY,200,200);  
        //截(0,0)到(80,130)
    };    
    
    //擺上障礙物與敵人
    imgMountain = new Image();
    imgMountain.src="rpg/images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "rpg/images/Enemy.png";
    imgMountain.onload=function(){//等到圖片載入後再做以下
        imgEnemy.onload=function(){//等到圖片載入後再做以下
             for(var x in mapArray){
                if(mapArray[x]==1)
                {           
                   ctx.drawImage(imgMountain,32,65,32,32,x%4*200,Math.floor(x/4)*200,200,200);
                }else if(mapArray[x]==3)
                {
                   ctx.drawImage(imgEnemy,7,40,104,135,x%4*200,Math.floor(x/4)*200,200,200);
                }
             }
        };
    };
};});
//當有人按下按鍵後要做的事情
$(document).keydown(function(event){
    var targetImgMainX, targetImgMainY, targetBlock, cutImagePositionX,cutImagePositionY;
    //targetImgMainX、targetImgMainY、targetBlock, cutImagePositionX;
    //targetBlock:主角即將要移動過去的那一格編號
    //cutImagePositionX, 依據主角朝的方向決定圖
    event.preventDefault();
    //避免點擊鍵盤出現
    //依據使用者點擊按鍵 計算目標位置以及設定新圖
    switch(event.which){
        case 37:
            targetImgMainX = currentImgMainX-200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX=0;
            cutImagePositionY=620;
            break;
        case 38:
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY-200;
            cutImagePositionX = 1010;
            cutImagePositionY = 0;
            break;
        case 39:
            targetImgMainX = currentImgMainX+200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 0;
            cutImagePositionY = 310;
            break;
        case 40:
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY+200;
            cutImagePositionX = 0;
            cutImagePositionY = 0;
            break;
        default:
            return;
    }
    if(targetImgMainX<=600 && targetImgMainX>=0 &&//防超出範圍
            targetImgMainY<=600 && targetImgMainY>=0)
    {
        targetBlock=targetImgMainX/200+targetImgMainY/200*4;    
    }else
    {
        targetBlock=-1;    
    }
    
    ctx.clearRect(currentImgMainX, currentImgMainY,200,200);//清除主角原本所在位置
    if(targetBlock==-1||mapArray[targetBlock]==1||mapArray[targetBlock]==3)
    {
        //目標位置異常、遇到障礙物、遇到敵人都不能走，在原地(轉頭)
    }
    else
    {
        $("#talkBox").text("");
        currentImgMainX=targetImgMainX;
        currentImgMainY=targetImgMainY;
    }
    ctx.drawImage(imgMain,cutImagePositionX,cutImagePositionY,240,310,currentImgMainX,currentImgMainY,200,200);
    
    switch(mapArray[targetBlock])//提示訊息
        {
            case undefined://牆壁
                $("#talkBox").text("邊界");
                break;
            case 1:
                $("#talkBox").text("有山");
            break;
            case 2:
                $("#talkBox").text("抵達終點!");
            break;
            case 3:
                $("#talkBox").text("嗨~");
            break;
        }
});