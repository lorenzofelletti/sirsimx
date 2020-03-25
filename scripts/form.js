var popsize = document.getElementById('popsize');
var recoverytimeinmillis = document.getElementById('recoverytimeinmillis');
var infectionprobability = document.getElementById('infectionprobability');
var speedRange = document.getElementById('speed');
var restartbtn = document.getElementById('restartbtn');
popsize.addEventListener("change", inputChanged());
popsize.addEventListener("mousewheel", inputChanged());
recoverytimeinmillis.addEventListener("change", inputChanged());
infectionprobability.addEventListener("change", inputChanged());
speedRange.addEventListener("change", inputChanged());
restartbtn.addEventListener("click", inputChanged());

function inputChanged() {
  let prev_psize, prev_rectime, prev_iprob, prev_speed;
  return function() {
    let arg = new Object();
    let psize = parseInt(popsize.value);
    let rectime = parseInt(recoverytimeinmillis.value);
    let iprob = parseFloat(infectionprobability.value);
    let speed = parseFloat(speedRange.value);
    if ( psize != undefined && psize >= 10 && psize <= 500 ){
      arg.popsize = psize;
    }
    else {
      arg.popsize = undefined;
    }
    if ( rectime ) {
      arg.recoveryTimeInMillis = rectime;
    }
    else {
      arg.recoveryTimeInMillis = undefined;
    }
    if ( iprob ) {
      arg.infectionProbability = iprob;
    } else {
      arg.infectionProbability = undefined;
    }
    if ( speed ) {
      arg.speed = speed;
    } else {
      arg.speed = undefined;
    }
    if ( prev_psize !== psize || prev_iprob !== iprob || 
        prev_rectime !== rectime || prev_speed !== speed ) {
      sirsim.reset(arg);
    }
  }
}

var resetbtn = document.getElementById('resetbtn');
resetbtn.addEventListener("click", () => {
  let defaultValues = {
    popsize: 300,
    recoveryTimeInMillis: 2000,
    infectionProbability: 1,
    speed: 2
  };
  popsize.value = defaultValues.popsize;
  recoverytimeinmillis.value = defaultValues.recoveryTimeInMillis;
  infectionprobability.value = defaultValues.infectionProbability;
  speedRange.value = defaultValues.speed;
  sirsim.reset();
});

$('form').submit(false);
