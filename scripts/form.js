var popsize = document.getElementById('popsize');
var recoverytimeinmillis = document.getElementById('recoverytimeinmillis');
var infectionprobability = document.getElementById('infectionprobability');
popsize.addEventListener("change", inputChanged);
popsize.addEventListener("mousewheel", inputChanged);
recoverytimeinmillis.addEventListener("change", inputChanged);
infectionprobability.addEventListener("change", inputChanged)


function inputChanged() {
  let arg = new Object();
  let psize = parseInt(popsize.value);
  let rectime = parseInt(recoverytimeinmillis.value);
  let iprob = parseFloat(infectionprobability.value);
  if ( psize != undefined && psize >= 3 && psize <= 300 )
    arg.popsize = psize;
  else
    arg.popsize = undefined;
  if ( rectime )
    arg.recoveryTimeInMillis = rectime;
  else
    arg.recoveryTimeInMillis = undefined;
  if ( iprob )
    arg.infectionProbability = iprob;
  else
    arg.infectionProbability = undefined;

  sirsim.reset(arg); 
}

$('form').submit(false);
