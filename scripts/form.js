/*function formOnKeyUp(form) {
    let numberOfDots = $("input[name=popsize]");
    if ( !isBlank(numberOfDots) ) { 
        if ( numberOfDots.value >= 3 && numberOfDots.value <= 300 )
            reset({popsize: numberOfDots});
        else
            reset();
    }
    else
        return false;
}

function formOnSubmit(form) {
    formOnKeyUp(form);
}*/

/*function isBlank(myField) {
    // Check for non-blank field
    var result = true;
    if (myField.value != null ) {
        result = false;
    }
    return result;
}*/
/*
jQuery(function($) {
    $('#mirror').text($('#alice').val());
  
    $('#alice').on('input', function() {
      $('#mirror').text($('#alice').val());
    });
  });
*/

/*const defaultValues = {
    popsize: 200,
    recoveryTimeInMillis: 2000,
    infectionProbability: 1
}*/

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
    console.log(arg);
    reset(arg);
    
}