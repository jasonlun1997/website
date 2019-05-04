$(document).ready(function(){
    $("input").click(function(){
        //alert("Hi");    
        //$("h1").text("Hello");

        var numberOfListItem = $("#choices li").length;
        var randomChildNumber = Math.floor(Math.random()*numberOfListItem);

        $("H1").text($("#choices li").eq(randomChildNumber).text());
        if(randomChildNumber==0){
            $("#my").attr("src","http://www.tabirai.net/tabirai-uploader/img/0005408/s1_0005408.jpg");
        }
        else if(randomChildNumber==1){
             $("#my").attr("src","https://img-global.cpcdn.com/012_recipes/536da0a56f3361d1851196f264e504ce/751x532cq70/%E9%A6%99%E8%8F%87%E6%BB%B7%E8%82%89%E9%A3%AF-%E9%A3%9F%E8%AD%9C%E6%88%90%E5%93%81%E7%85%A7%E7%89%87.jpg");
        }
        else{
             $("#my").attr("src","https://linky.tw/wp/wp-content/uploads/2018/06/57eca2287749c_1024-1000x600.jpg");
        }
    });
});