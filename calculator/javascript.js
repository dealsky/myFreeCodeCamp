$(document).ready(function() {
    
    var status = 0;
    var arr = [];
    var answerText = $(".screen-main");
    var buttonNum = $(".button-num");
    var buttonOp = $(".button-op");
    
    answerText.val("");
    
    var num = "";
    var flagDian = true;
    buttonNum.click(function() {
        
        var buttonText = $(this).text();
        
        if(buttonText == "CE"){
            answerText.val("");
            status = 0;
            flagDian = true;
        }
        else if(buttonText == "."){      
            if(status != 2){
            var text = answerText.val();
            if(flagDian == true){
                text += buttonText;
                answerText.val(text);
                flagDian = false;
                status = 1;
                num += buttonText;
            }   
            }
        }
        else{
            if(status != 2){
            var text = answerText.val();    
            text += buttonText;
            answerText.val(text);
            status = 1;
            num += buttonText;
            }
        }
        textChange(answerText.val().length);
    });
    
    buttonOp.click(function() {
       
        var buttonText = $(this).text();
        var text = answerText.val();   
        var opStr = "+-×÷"
        
        if(status != 0){
            
            if(buttonText=="="){
                if(status != 2){
                status = 2;
                if(opStr.indexOf(text.charAt(text.length-1)) != -1){
                    answerText.val("Error");
                }
                else{
                    if(flagDian)
                        num = parseInt(num);
                    else
                        num = parseFloat(num);
                    arr.push(num);
                    num = "";
                    flagDian = true;
                    
                    console.log(arr);
                    
                    var eqArray = [];
                    var opArray = [];
                    for(i in arr){
                        if(isNaN(arr[i])){
                            if(opArray.length == 0){
                                opArray.push(arr[i]);
                            }
                            else{
                                var top = opArray[opArray.length-1];
                                
                                while(parseInt(opStr.indexOf(arr[i])/2) <= parseInt(opStr.indexOf(top)/2)){
                                    if(opArray.length == 0)
                                        break;
                                    eqArray.push(opArray.pop());
                                    top = opArray[opArray.length-1];
                                }
                                opArray.push(arr[i]);
                            }  
                        }
                        else{
                            eqArray.push(arr[i]);
                        }
                    }
                    
                    for(var i = opArray.length-1; i>=0; i--){
                        eqArray.push(opArray[i]);
                    }
                    
                    console.log(eqArray);
                    
                    var answer = operation(eqArray);
                    
                    if(answer == false){
                        answerText.val("除数不能为0！");
                    }
                    else{
                        answerText.val(answer.toString().substr(0, 11));
                        arr = [];
                        if(answer.toString().indexOf(".") == -1)
                            flagDian = true;
                        else
                            flagDian = false;
                        num = answer;
                        console.log(arr);
                        
                    }   
                }
                }
            }
            else{
                if(opStr.indexOf(text.charAt(text.length-1))!=-1 && !(text.charAt(text.length-1)=="-"&&text.length==1)){
                    answerText.val(text.substr(0, text.length-1)+buttonText);
                    arr.pop();
                    arr.push(buttonText);
                    status = 1;
                    console.log(arr);
                }
                else{
                    answerText.val(text+buttonText);
                    if(flagDian)
                        num = parseInt(num);
                    else
                        num = parseFloat(num);
                    arr.push(num);
                    num = "";
                    flagDian = true;
                    status = 1;
                    console.log(arr);
                    arr.push(buttonText);
                }
            }
        }
        else{
            if(buttonText == "-"){
                answerText.val(text+buttonText);
                num += "-";
                status = 1;
                flagDian = true;
            }
        }
        textChange(answerText.val().length);
    });   
    
});

$(document).keydown(function(event) {
    var key = event.keyCode;
    
    if(key == 97)
        $(".button-num:contains('1')").click();
    if(key == 98)
        $(".button-num:contains('2')").click();
    if(key == 99)
        $(".button-num:contains('3')").click();
    if(key == 100)
        $(".button-num:contains('4')").click();
    if(key == 101)
        $(".button-num:contains('5')").click();
    if(key == 102)
        $(".button-num:contains('6')").click();
    if(key == 103)
        $(".button-num:contains('7')").click();
    if(key == 104)
        $(".button-num:contains('8')").click();
    if(key == 105)
        $(".button-num:contains('9')").click();
    if(key == 110)
        $(".button-num:contains('.')").click();
    
    if(key == 106)
        $(".button-op:contains('×')").click();
    if(key == 107)
        $(".button-op:contains('+')").click();
    if(key == 109)
        $(".button-op:contains('-')").click();
    if(key == 111)
        $(".button-op:contains('÷')").click();
    if(key == 13)
        $(".button-op:contains('=')").click();
    
});

function operation(array) {
    
    var stack = [];
    for(var i = 0; i<array.length; i++){
        var top = array[i];
        var first, last;
        
        if(top == "+"){
            first = stack.pop();
            last = stack.pop();
            stack.push(last+first);
        }
        else if(top == "-"){
            first = stack.pop();
            last = stack.pop();
            stack.push(last-first);
        }
        else if(top == "×"){
            
            first = stack.pop();
            last = stack.pop();
            stack.push(last*first);
        }
        else if(top == "÷"){
            first = stack.pop();
            last = stack.pop();
            if(first == 0)
                return false;
            stack.push(last/first);
        }
        else{
            stack.push(top);
        }
    }
    
    console.log(stack);
    return stack.pop();
}

function textChange(length) {
    
    if(length >= 10)
        $(".screen-main").css("font-size", "32px");
    else if(length >=9 ){
        $(".screen-main").css("font-size", "36px")
    }
    else if(length >=8 ){
        $(".screen-main").css("font-size", "40px")
    }
    else if(length >=7 ){
        $(".screen-main").css("font-size", "44px")
    }
    else if(length >=6 ){
        $(".screen-main").css("font-size", "48px")
    }
    
}