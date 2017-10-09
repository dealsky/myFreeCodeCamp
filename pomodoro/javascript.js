$(document).ready(function() {
   
    var clockStatus = 0;
    var lengthStatus = 0;
    var lengthTime = 25;
    var breakTime = 5;
    var lengthNumLeft = $(".controller .left .length-num");
    var lengthNumRight = $(".controller .right .length-num");
    var clockText = $(".clock-top");
    var clockTime = $(".clock-buttom");
    var interval;
        
    lengthNumLeft.text(breakTime);
    lengthNumRight.text(lengthTime);
    clockText.text("Session");
    clockTime.text(25);
    
    $(".controller .left .length-button").click(function() {
                
        var value = $(this).val();
        
        if(lengthStatus == 0){
            breakTime = parseInt(lengthNumLeft.text().substr(0, 2));
            if(value == "+" && breakTime<=98){
                lengthNumLeft.text(++breakTime); 
            }
            if(value == "-" && breakTime>0){
                lengthNumLeft.text(--breakTime);
            }
            if(clockStatus == 1){
                clockTime.text(breakTime);
            }
        } 
    });
    
    $(".controller .right .length-button").click(function() {
        
        var value = $(this).val();
        
        if(lengthStatus == 0){
            lengthTime = parseInt(lengthNumRight.text().substr(0, 2));
            if(value == "+" && lengthTime<=98){
                lengthNumRight.text(++lengthTime); 
            }
            if(value == "-" && lengthTime>0){
                lengthNumRight.text(--lengthTime);
            }
            if(clockStatus == 0){
                clockTime.text(lengthTime);
            }
        } 
        
    });
    
    $(".clock").click(function() {
                
        var times = getTimes(clockTime.text());
        
        if(lengthStatus == 0){
                  
            interval = setInterval(function() {
                
                if(times == 0){
                    if(clockStatus == 0){
                        times = breakTime*60;
                        clockStatus = 1;
                        clockText.text("Break!");
                    }
                }
                times--;
                var timeStr = getMinSec(times);
                
                changeColor(clockStatus, breakTime, lengthTime);   
                clockTime.text(timeStr);
                
            }, 1000);
            lengthStatus = 1;
        } 
        else{
            
            window.clearInterval(interval);
            lengthStatus = 0;
        }
    });    
});

function getMinSec(times) {
    
    if(times < 0)
        return "0";
    
    var str = "";
    var minute = parseInt(times/60);
    var second = times%60;
    
    str += minute+":";
    
    if(second < 10)
        str += "0";
    str += second;
    
    return str;
}

function getTimes(text) {
    
    var times;
    
    if(text.length <= 2){
        times = parseInt(text)*60;
    }
    else{
        times = parseInt(text.substr(0, 2))*60 + parseInt(text.substr(3, 2));
    }
    
    return times;
}

function changeColor(clockStatus, breakTime, lengthTime) {
    
    var clock = $(".clock-button");
    
    if(clockStatus == 0){
        clock.animate({
            backgroundColor: "#99CC00",
        }, lengthTime*60*1000);
    }
    else{
        clock.animate({
            backgroundColor: "#FF4444",
        }, lengthTime*60*1000);
    }
    

}