$(function() {
  $("#ipmin").html( document.getElementById('infectionprobability').getAttribute('min') );
  $("#ipmax").html( document.getElementById('infectionprobability').getAttribute('max') );
  $("#rtmin").html( document.getElementById('recoverytimeinmillis').getAttribute('min') );
  $("#rtmax").html( document.getElementById('recoverytimeinmillis').getAttribute('max') );    
});