$( function() {
  $("#psmin").html( document.getElementById('popsize').getAttribute('min') );
  $("#psmax").html( document.getElementById('popsize').getAttribute('max') );
  $("#ipmin").html( document.getElementById('infectionprobability').getAttribute('min') );
  $("#ipmax").html( document.getElementById('infectionprobability').getAttribute('max') );
  $("#rtmin").html( document.getElementById('recoverytimeinmillis').getAttribute('min') );
  $("#rtmax").html( document.getElementById('recoverytimeinmillis').getAttribute('max') ); 
  $("#spmin").html( document.getElementById('speed').getAttribute('min') );
  $("#spmax").html( document.getElementById('speed').getAttribute('max') );

  $('#psactval').html ( document.getElementById('popsize').value );
  $('#rtactval').html ( document.getElementById('recoverytimeinmillis').value );
  $('#ipactval').html ( document.getElementById('infectionprobability').value );
  $('#spactval').html ( document.getElementById('speed').value );

  popsize.addEventListener( 'change', ( () => {
    $('#psactval').html ( document.getElementById('popsize').value );
  } ) );
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