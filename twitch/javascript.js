var rooms =  ["ESL_SC2", "freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];

var info = [];
var infoN = [];


function getInfo() {
  
  rooms.forEach(function(room) {
    var url = "https://wind-bow.gomix.me/twitch-api/streams/";
    url += room + "?callback=?";
    $.getJSON(url, function(data) {
      info.push(data);      
      url = "https://wind-bow.gomix.me/twitch-api/channels/";
      url += room + "?callback=?";
      $.getJSON(url, function(dataN) {
        infoN.push(dataN);
      });
    });
  });
}

function displayInfo(str) {
  for(var i = 0; i<info.length; i++){
    console.log(infoN[i]);
    var game, status;
    if(info[i].stream == null){
        game = "Offline";
        status = false;
      }
      else if(info[i].stream == undefined){
        game = "Account Closed";
        status = false;
      }
      else{
        game = info[i].stream.game;
        status = true;
    }
    var logo, name, description, href;
    if(infoN[i].logo != null){
      logo = infoN[i].logo;
    }
    else{
      logo = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
    }
        
    if(infoN[i].display_name != null){
      name = infoN[i].display_name;
    }
    else{
      name = rooms[i];
    }
        
    if(status){
      description = infoN[i].status;
    }
    else{
      description = "poi~";
    }
        
    if(game == "Account Closed"){
      href = "#";
    }
    else{
      href = infoN[i].url;
    }
    var color = status==true ? "room-info" : "room-info-g";
    if(str == "all"){
      $(".display").append("<div class='" + color  + "'><img src='" + logo + "' class='room-image'/><a class='room-link' href='" + href + "' target='_blank'>" + name + "</a><span class='room-description'>" + description + "</span></div>");
    }
    else if(str == "online"){
      if(status){
        $(".display").append("<div class='" + color  + "'><img src='" + logo + "' class='room-image'/><a class='room-link' href='" + href + "' target='_blank'>" + name + "</a><span class='room-description'>" + description + "</span></div>");
      }
    }
    else{
      $(".display").append("<div class='" + color  + "'><img src='" + logo + "' class='room-image'/><a class='room-link' href='" + href + "' target='_blank'>" + name + "</a><span class='room-description'>" + description + "</span></div>");
    }
  }
}

$(document).ready(function() {
  
  getInfo();
  $("#all").click(function() {
    $(".display div").each(function() {
      $(this).remove();
    });
    displayInfo("all");
  });
  
  $("#online").click(function() {
    $(".diaplay div").each(function() {
      $(this).remove();
    });
    displayInfo("online");
  });
  
  $("#offline").click(function() {
    $(".diaplay div").each(function() {
      $(this).remove();
    });
    displayInfo("offline");
  });
});