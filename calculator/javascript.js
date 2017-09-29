$(document).ready(function() {
    
    var status = 0;
    var oAnswerText = $(".screen-main");
    var buttonNum = $(".button-num");
    var buttonOp = $(".button-op");
    
    buttonNum.click(function() {
        if($(this).text() == "CE"){
            oAnswerText.val("0");
            status = 0;
        }
        else if($(this).text() == "0"){
            if(status == 1){
                
            }
        }
        else if($(this).text() == "."){
            
        }
        else{
            
        }
    });
    
    
    
});