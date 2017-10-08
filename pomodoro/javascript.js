$(document).ready(function() {
   
    var status = 0;
    
    $(".controller .left .length-button").click(function() {
        
        var lengthNum = $(".controller .left .length-num");
        var value = $(this).val();
        var num = parseInt(lengthNum.text());
        var clockTime = $("clock-buttom");
        var time = parseInt(clockTime.text());
        
        if(status == 0){
            if(value == "+" && num<=98){
                lengthNum.text(num+1); 
                
            }
            if(value == "-" && num>0){
                lengthNum.text(num-1);
                
            }
        } 
    });
    
    $(".controller .right .length-button").click(function() {
        
        var lengthNum = $(".controller .right .length-num");
        var value = $(this).val();
        var num = parseInt(lengthNum.text());
        
        if(status == 0){
            if(value == "+" && num<=98){
                lengthNum.text(num+1); 
            }
            if(value == "-" && num>0){
                lengthNum.text(num-1);
            }
        } 
        
    });
    
    
});