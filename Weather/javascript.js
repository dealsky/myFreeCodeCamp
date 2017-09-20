function loadWeather() {
  getWeather();
}
function keyDownWeather() {
  if(event.keyCode == 13)
    getWeather();
}
function getWeather() {
    var cityName = $(".textCity").val();
    if(cityName == "")  cityName = "宁波";
    $(".textCity").val("");
    var url = "http://route.showapi.com/9-2?showapi_appid=46304&showapi_sign=b121570716a84dabbb0143ad58f76c18&area=" + cityName + "&needMoreDay=1&needIndex=1&needHourData=0&need3HourForcast=0&needAlarm=0&";
    
    $.get(url, function(data) {
        var time = data.showapi_res_body.time;
        var year = time.substr(0, 4);
        var month = time.substr(4, 2);
        var day = time.substr(6, 2);
        if(month.charAt(0) === "0"){
            month = month.substr(1, 1);
        }
        if(day.charAt(0) === "0"){
            day = day.substr(1, 1);
        }
        $("#time").text(year + "年" + month + "月" + day + "日");
        $("#city").text(data.showapi_res_body.now.aqiDetail.area);
        
        $("#weather").text(data.showapi_res_body.now.weather);
        $("#temperature").text(data.showapi_res_body.now.temperature + "℃");
        $("#airHumidity").text(data.showapi_res_body.now.sd);
        $("#windDirection").text(data.showapi_res_body.now.wind_direction);
        $("#windPower").text(data.showapi_res_body.now.wind_power);
        $("#airQualityIndex").text(data.showapi_res_body.now.aqi);
        $("#primaryPollutant").text(data.showapi_res_body.now.aqiDetail.primary_pollutant);
            
        var cnXq = ["", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"];
        var xq = [data.showapi_res_body.f2.weekday, data.showapi_res_body.f3.weekday, data.showapi_res_body.f4.weekday, data.showapi_res_body.f5.weekday, data.showapi_res_body.f6.weekday, data.showapi_res_body.f7.weekday];
        
        var weatherData = [
            [data.showapi_res_body.f2.day_weather, data.showapi_res_body.f2.night_weather, data.showapi_res_body.f2.day_air_temperature + "°/" + data.showapi_res_body.f2.night_air_temperature + "℃"],
            [data.showapi_res_body.f3.day_weather, data.showapi_res_body.f3.night_weather, data.showapi_res_body.f3.day_air_temperature + "°/" + data.showapi_res_body.f3.night_air_temperature + "℃"],
            [data.showapi_res_body.f4.day_weather, data.showapi_res_body.f4.night_weather, data.showapi_res_body.f4.day_air_temperature + "°/" + data.showapi_res_body.f4.night_air_temperature + "℃"],
            [data.showapi_res_body.f5.day_weather, data.showapi_res_body.f5.night_weather, data.showapi_res_body.f5.day_air_temperature + "°/" + data.showapi_res_body.f5.night_air_temperature + "℃"],
            [data.showapi_res_body.f6.day_weather, data.showapi_res_body.f6.night_weather, data.showapi_res_body.f6.day_air_temperature + "°/" + data.showapi_res_body.f6.night_air_temperature + "℃"],
            [data.showapi_res_body.f7.day_weather, data.showapi_res_body.f7.night_weather, data.showapi_res_body.f7.day_air_temperature + "°/" + data.showapi_res_body.f7.night_air_temperature + "℃"]
        ];
      
        var j = 0;
        $(".futureWeather div").each(function() {
            var i = 0;
            $(this).find("p").eq(0).text(cnXq[xq[j]]);
            $(this).find("p").eq(0).nextAll().each(function() {
                //console.log($(this).text());
                $(this).find("span").text(weatherData[j][i++]);
            })
            j++;
        });   
    });  
}