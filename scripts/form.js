function formOnKeyUp(form) {
    let numberOfDots = $("input[name=popsize]");
    if ( !isBlank(numberOfDots) ) { 
        if ( numberOfDots.value >= 3 && numberOfDots.value <= 300 )
            playSim(numberOfDots);
        else
            playSim(200);
    }
    else
        return false;
}

function formOnSubmit(form) {
    formOnKeyUp(form);
}

function isBlank(myField) {
    // Check for non-blank field
    var result = true;
    if (myField.value != null ) {
        result = false;
    }
    return result;
}
