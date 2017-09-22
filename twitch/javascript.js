var rooms =  ["ESL_SC2", "freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];

var info = [];

function getInfo() {
  rooms.forEach(function(room) {
    
    var object = new Object();
    
    var url = "https://wind-bow.gomix.me/twitch-api/streams/";
    url += room + "?callback=?";
    $.getJSON(url, function(data) {
    
      if(data.stream == null){
        object.game = "Offline";
        object.status = false;
      }
      else if(data.stream == undefined){
        object.game = "Account Closed";
        object.status = false;
      }
      else{
        object.game = data.stream.game;
        object.status = true;
      }
      url = "https://wind-bow.gomix.me/twitch-api/channels/";
      url += room + "?callback=?";
      
      $.getJSON(url, function(dataN) {
        
        object.logo = dataN.logo != null ? dataN.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
        object.name = dataN.display_name != null ? dataN.display_name : room;
        object.description = object.status != false ? dataN.status : "poi~";
        object.href = object.game == "Account Closed" ? "#" : dataN.url;
        object.color = object.status == true ? "room-info" : "room-info-g";
        
        info.push(object);
        $(".display").append("<div class='" + object.color  + "'><img src='" + object.logo + "' class='room-image'/><a class='room-link' href='" + object.href + "' target='_blank'>" + object.name + "</a><span class='room-description'>" + object.description + "</span></div>");
      });
    });
  });
}

function displayInfo(info, str) {
  console.log(info);
  for(var data in info){
    console.log(data);
    if(str == "all"){
      $(".display").append("<div class='" + data.color  + "'><img src='" + data.logo + "' class='room-image'/><a class='room-link' href='" + data.href + "' target='_blank'>" + data.name + "</a><span class='room-description'>" + data.description + "</span></div>");
    }
    else if(str == "online"){
      if(data.status){
        $(".display").append("<div class='" + data.color  + "'><img src='" + data.logo + "' class='room-image'/><a class='room-link' href='" + data.href + "' target='_blank'>" + data.name + "</a><span class='room-description'>" + data.description + "</span></div>");
      }
    }
    else{
      $(".display").append("<div class='" + data.color  + "'><img src='" + data.logo + "' class='room-image'/><a class='room-link' href='" + data.href + "' target='_blank'>" + data.name + "</a><span class='room-description'>" + data.description + "</span></div>");
    }
  }
}

$(document).ready(function() {
  getInfo();
  
  $("#all").click(function() {
    $(".room-info").show();
    $(".room-info-g").show();
  })
  
  $("#online").click(function() {
    $(".room-info").show();
    $(".room-info-g").hide();
  })
  
  $("#offline").click(function() {
    $(".room-info").hide();
    $(".room-info-g").show();
  })
  
});