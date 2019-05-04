var player;//yt播放器
var currentPlay = 0;//紀錄目前撥到幾首歌

function onYouTubeIframeAPIReady(){
    player = new YT.Player("player",
    {
        height:"390",
        width:"640",
        videoId:playList[currentPlay],
        playerVars:{
            "autoplay":0,//是否自動撥放
            "controls":0,//是否顯示控制項
            "start":playTime[currentPlay][0],//開始秒
            "end":playTime[currentPlay][1],//結束秒
            "showinfo":0,//上方是否顯示影片標題
            "rel":0,//結束時是否顯示相關影片
            "iv_load_policy":3//是否顯示置入的行銷連結 不給關了
        },
        events:{
            "onReady":onPlayerReady,
            "onStateChange":onPlayerStateChange
        }        
    });
}

function onPlayerReady(event){
    $("#playButton").click(function(){
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}

function onPlayerStateChange(event){
    console.log("event.data:"+event.data+"   currentPlay"+currentPlay);
        
    //當播放結束時
    if(Math.floor(player.getCurrentTime())==playTime[currentPlay][1])
    {
        if(currentPlay < playList.length-1)
        {
            currentPlay++;
            player.loadVideoById({
                "videoId":playList[currentPlay],
                "startSeconds":playTime[currentPlay][0],
                "endSeconds":playTime[currentPlay][1],
                "suggestedQuality":"large"
            });
            
        }else
        {
            currentPlay=0;
            player.cueVideoById({
                "videoId":playList[currentPlay],
                "startSeconds":playTime[currentPlay][0],
                "endSeconds":playTime[currentPlay][1],
                "suggestedQuality":"large"
            });
        }
    }
    if(player.getVideoLoadedFraction()>0)
    {   $("h2").text(player.getVideoData().title);  }
}