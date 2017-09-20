$(document).ready(function() {
  $(".searchBtn").click(function() {
    toWiki();
  })
});
function toWiki() {
  
  $(".wiki-ul li").each(function() {
    $(this).remove();
  })
  
  
  var searchThing = $(".searchText").val();
  var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=';
  url += searchThing;
  $.getJSON(url, function (data) {
    var pages = [];
    for(var pageid in data.query.pages){
      pages.push(pageid);
    }
    $(pages).each(function(index) {
      var page = data.query.pages[pages[index]];
      var title = page.title;
      var extract = page.extract;
      var image = "";
      var href="http://en.wikipedia.org/wiki/"+encodeURIComponent(title);
      try {
        image = page.thumbnail.source;
      }catch(e){}
      $(".wiki-ul").append("<li><a href='" + href + "'><span class='span-title'>" + title + "</span></a><br/><br/><img class='wiki-image' src='" + image + "' width='50' height='50'/><span class='apan-extract'>" + extract + "</span></li>");
      console.log(title);
      console.log(extract);
    })
  });
}