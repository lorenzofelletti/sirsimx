$(function() {
  $("#ipmin").html( document.getElementById('infectionprobability').getAttribute('min') );
  $("#ipmax").html( document.getElementById('infectionprobability').getAttribute('max') );
  $("#rtmin").html( document.getElementById('recoverytimeinmillis').getAttribute('min') );
  $("#rtmax").html( document.getElementById('recoverytimeinmillis').getAttribute('max') ); 
  $("#spmin").html( document.getElementById('speed').getAttribute('min') );
  $("#spmax").html( document.getElementById('speed').getAttribute('max') );   
});