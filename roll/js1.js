var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99', '#77B1A9', '#73A857'];
var twWord = "";

$(document).ready(function () {
    $("[class='rollBtn']").click(function () {
        
        var url = "https://route.showapi.com/1211-1?showapi_appid=46304&showapi_sign=b121570716a84dabbb0143ad58f76c18&count=1";
        var cnWord = "";
        var enWord = "";
        
        var wData = $.get(url, function(data) {
            cnWord = data.showapi_res_body.data[0].chinese;
            enWord = data.showapi_res_body.data[0].english;
        });
             
        var color = colors[Math.floor(Math.random() * (colors.length))];
        
        $("body").animate({
            backgroundColor: color,
        }, 1000);
        $(".buttons a").animate({
            backgroundColor: color
        }, 1000);
        $("span").animate({
            color: color
        }, 1000);
        $(".textArea").animate({
            opacity: 0
        }, 500,
            function() {
                $(this).animate({
                    opacity: 1
                }, 500);
                $("#textE").text(enWord);
                $("#text").text(cnWord);
                twWord = enWord;
            }
        );
    });
    $("[class='twBtn']").click(function () { 
        window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + twWord + '" ' + ""));
    });
});
