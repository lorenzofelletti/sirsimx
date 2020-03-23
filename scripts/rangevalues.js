$( function() {
  $("#ipmin").html( document.getElementById('infectionprobability').getAttribute('min') );
  $("#ipmax").html( document.getElementById('infectionprobability').getAttribute('max') );
  $("#rtmin").html( document.getElementById('recoverytimeinmillis').getAttribute('min') );
  $("#rtmax").html( document.getElementById('recoverytimeinmillis').getAttribute('max') ); 
  $("#spmin").html( document.getElementById('speed').getAttribute('min') );
  $("#spmax").html( document.getElementById('speed').getAttribute('max') );

  $('#rtactval').html ( document.getElementById('recoverytimeinmillis').value );
  $('#ipactval').html ( document.getElementById('infectionprobability').value );
  $('#spactval').html ( document.getElementById('speed').value );

  recoverytimeinmillis.addEventListener( 'change', ( () => {
    $('#rtactval').html ( document.getElementById('recoverytimeinmillis').value );
  } ) );
  infectionprobability.addEventListener( 'change', ( () => {
    $('#ipactval').html ( document.getElementById('infectionprobability').value );
  } ) );
  speedRange.addEventListener( 'change', ( () => {
    $('#spactval').html ( document.getElementById('speed').value );
  } ) );
});