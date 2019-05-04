$(document).ready(function(){
    var currentQuiz = null;
    $("#startButton").click(function()
    {
        //如果還沒開始作答
        if(currentQuiz==null)
        {
            currentQuiz=0;
            //顯示題目
            $("#question").text(questions[0].question);
            //每次顯示選項前先將該區域清空
            $("#options").empty();
            //將一個一個選項內容, 添加至選項區塊
            for(var x=0;x<questions[0].answers.length;x++)
            {
                $("#options").append("<input name='options' type='radio' value="+x+">"+"<label>"+questions[0].answers[x][0]+"</label><br><br>");
            }
            //將按鈕上的文字換過
            $("#startButton").attr("value","Next");
        }
        else //如果已經開始作答
        {
            //巡訪每個選項是否有被選取
            $.each($(":radio"),function(i,val){
                if(val.checked)
                {
                    //使用者所選的項目是否產結果(A~D)
                    if(isNaN(questions[currentQuiz].answers[i][1]))
                    {
                        //通往結果
                        var finalResult = questions[currentQuiz].answers[i][1];
                        //顯示結果標題
                        $("#options").text(finalAnswers[finalResult][0]);
                        //選項清空
                        $("#options").empty();
                        //顯示內容
                        $("#options").append(finalAnswers[finalResult][1]+"<br><br>")
                        //目前作答到第幾題的變數清空
                        currentQuiz=null;
                        //修改按鈕為重新開始
                        $("#startButton").attr("value","重新開始");
                        
                    }else
                    {
                        //指定下個要顯示的題目, 由於原始資料是從1開始算, 所以-1
                        currentQuiz=questions[currentQuiz].answers[i][1]-1;
                        //顯示新的題目
                        $("#question").text(questions[currentQuiz].question);
                        //清空
                        $("#options").empty();
                        //顯示新選
                        for(var x=0;x<questions[currentQuiz].answers.length;x++)
                        {
                            $("#options").append("<input name='options' type='radio' value="+x+">"+"<label>"+questions[currentQuiz].answers[x][0]+"</label><br><br>");
                        }
                    }
                    return false;
                }
            })
        }
    });
});
