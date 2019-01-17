$(document).ready(function(){
    
    generateQuestions();
    $(".more").addClass("hide");
    
    $("#openMore").on("click", function(){
       if($(".more").hasClass("hide")){
           $(".more").removeClass("hide").slideDown("slow");
           $("#openMore").html("收起");
       } else {
           $(".more").slideUp("slow", function(){
               $(".more").addClass("hide");
           });
           $("#openMore").html("更多");
       }
    });
    
    $("#submit").on("click", checkComplete);
    $("#reedit").on("click", refresh);
    
    $(".outer").on("click", function(){
        $(".outer").css("display", "none");
        $(".inner").css("display", "none");
        $(".inner").html("");
    });
    
    
    
    function generateQuestions() {
        var questions = [
            "我感到情绪沮丧，郁闷",
            "我感到早晨心情最好",
            "我要哭或想哭",
            "我夜间睡眠不好",
            "我吃饭象平时一样多",
            "我的性功能正常",
            "我感到体重减轻",
            "我为便秘烦恼",
            "我的心跳比平时快",
            "我无故感到疲劳",
            "我的头脑象往常一样清楚",
            "我做事情象平时一样不感到困难",
            "我坐卧不安，难以保持平静",
            "我对未来感到有希望",
            "我比平时更容易激怒",
            "我觉得决定什么事很容易",
            "我感到自已是有用的和不可缺少的人",
            "我的生活很有意义",
            "假若我死了别人会过得更好",
            "我仍旧喜爱自己平时喜爱的东西"
        ];
        var list = function() {
            var l = "<ol>";
            for(var i = 0; i < questions.length; i++) {
                l += "<li title='" + (i+1) + "'>" + questions[i] + answerList(i) + "</li>";
            }
            l += "</ol>";
            return l;
        };
        $("#form").append(list);  
    }
    
    function answerList(x) {
        var answers = [
            {code: 1, content: "A. 没有或很少时间"}, 
            {code: 2, content: "B. 小部分时间"}, 
            {code: 3, content: "C. 相当多时间"}, 
            {code: 4, content: "D. 绝大部分或全部时间"}
        ];
        var listOfA = '<br><input type="radio" name="';
        for(var j = 0; j < answers.length; j++){
            if(j == answers.length-1) {
                listOfA += x+1 + '" value="' + answers[j].code + '"> ' + answers[j].content + '<br><br>';
            } else {
                listOfA += x+1 + '" value="' + answers[j].code + '"> ' + answers[j].content + '<br><input type="radio" name="';
            }
        }
        return listOfA;
    }
    
    function checkComplete() {
        var counter = 0;
        var notAnswer = [];
        var haveAnswered = [];
        //var uniqNotA = [];
        var listOfResult = $("input");
        var base = 0;
        for(var i = 0; i < listOfResult.length; i++) {
            if(!listOfResult[i].checked) {
                if(!haveAnswered.includes(listOfResult[i].parentNode.title)&&!notAnswer.includes(listOfResult[i].parentNode.title)) {
                    notAnswer.push(listOfResult[i].parentNode.title);
                }
                //uniqNotA = [...new Set(notAnswer)];
            } else {
                counter++;
                base += Number(listOfResult[i].value);
                haveAnswered.push(listOfResult[i].parentNode.title);
                if(notAnswer.includes(listOfResult[i].parentNode.title)){
                    notAnswer.pop(listOfResult[i].parentNode.title);
                }
            }
        }
        
        if(haveAnswered.length == 20){
            $(".outer").css("display", "block");
            $(".inner").css("display", "block");
            console.log(base*1.25);
            $(".inner").append("<h2>结果：</h2>");
            $(".inner").append("<p>您的结果为"+base*1.25+"</p>");
            $(".inner").append("<h3>结果分析</h3><br><p>53以下者为无抑郁；<br>53—62为轻微至轻度抑郁；<br>63—72为中至重度；<br>72以上为重度抑郁。<br><br>仅做参考。</p>")
        } else {
            if(notAnswer.length == 20) {
                $(".outer").css("display", "block");
                $(".inner").css("display", "block");
                $(".inner").append("<h2>提示：</h2>");
                $(".inner").append("<p>您还没有开始选择任何问题</p>");
                console.log(haveAnswered + " and " + notAnswer);
            } else {
                $(".outer").css("display", "block");
                $(".inner").css("display", "block");
                $(".inner").append("<h2>提示：</h2>");
                $(".inner").append("<p>请继续回答如下问题：</p><br><p>"+ notAnswer.toString() + "</p>");
                console.log(haveAnswered + " and " + notAnswer);
            }
        }
    }
    
    function refresh() {
        var listOfInput = $("input");
        for(var i = 0; i < listOfInput.length; i++) {
            if(listOfInput[i].checked) {
                listOfInput[i].checked = false;
            }
        }
    }
});