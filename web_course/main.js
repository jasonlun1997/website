$(document).ready(function(){
    
    $("#courseTable").append("<tr><th>Week</th><th>日期</th><th>主題</th></tr>");
    
    var topicCount = topic.length;
    
    var secondUnit = 1000;    
    var minuteUnit = secondUnit * 60;
    var hourUnit = minuteUnit * 60;
    var dayUnit = hourUnit * 24;
    
    
    
    for(var x=0;x<topicCount;x++)
    {
        $("#courseTable").append("<tr>");
        $("#courseTable").append("<td>"+(x+1)+"</tr>");
        $("#courseTable").append("<td>"+
        (new Date((startDate.getTime()+x*7*dayUnit))).toLocaleDateString().slice(5)
                                 +"</td>");
        if(topic[x]=="不上課"||topic[x]=="連假"||topic[x]=="校慶停課"||topic[x]=="畢業典禮"){
            $("#courseTable").append('<td style="color: #d1e0e0";>'+topic[x]+"</td>");
        }
        else{
            $("#courseTable").append("<td>"+topic[x]+"</td>");
        }
        $("#courseTable").append("</tr>");
        
    }
    $("#datein").click(function(){
        var firstday = $("#firstdate").val().split('-');
        var month;
        var day;
        month = parseInt(firstday[1]);
        day = parseInt(firstday[2]);
        setMonthAndDay(month,day);
        $("#courseTable").empty();
        for(var x=0;x<topicCount;x++)
        {
            $("#courseTable").append("<tr>");
            $("#courseTable").append("<td>"+(x+1)+"</tr>");
            $("#courseTable").append("<td>"+
            (new Date((startDate.getTime()+x*7*dayUnit))).toLocaleDateString().slice(5)
                                     +"</td>");
            if(topic[x]=="不上課"||topic[x]=="連假"||topic[x]=="校慶停課"||topic[x]=="畢業典禮"){
                $("#courseTable").append('<td style="color: #d1e0e0";>'+topic[x]+"</td>");
            }
            else{
                $("#courseTable").append("<td>"+topic[x]+"</td>");
            }
            $("#courseTable").append("</tr>");

        }   
    })
});