var popsize = document.getElementById("popsize");
popsize.addEventListener("change", changeSimParams());

var recoverytimeinmillis = document.getElementById("recoverytimeinmillis");
recoverytimeinmillis.addEventListener("change", changeSimParams());

var infectionprobability = document.getElementById("infectionprobability");
infectionprobability.addEventListener("change", changeSimParams());

var speedRange = document.getElementById("speed");
speedRange.addEventListener("change", changeSimParams());

var vaccinationRange = document.getElementById("vaccination");
vaccinationRange.addEventListener("change", changeSimParams());

var effectivenessRange = document.getElementById("effectiveness");
effectivenessRange.addEventListener("change", changeSimParams());

var restartbtn = document.getElementById("restartbtn");
restartbtn.addEventListener("click", changeSimParams());

var resetbtn = document.getElementById("resetbtn");
resetbtn.addEventListener("click", changeSimParams(true));

/** Resets the simulation with new parameters. If arguments
 * are passed it resets to the default simulation values. */
function changeSimParams(resetToDefault) {
  if (resetToDefault) {
    function updateRangeValues() {
      $("#psactval").html(document.getElementById("popsize").value);
      $("#rtactval").html(
        document.getElementById("recoverytimeinmillis").value
      );
      $("#ipactval").html(
        document.getElementById("infectionprobability").value
      );
      $("#spactval").html(document.getElementById("speed").value);
      $("#vcactval").html(document.getElementById("vaccination").value);
      $("#effecactval").html(document.getElementById("effectiveness").value);
    }
    return () => {
      const defaultValues = sirsim.getDefaultValues();
      popsize.value = defaultValues.popsize;
      recoverytimeinmillis.value = defaultValues.recoveryTimeInMillis;
      infectionprobability.value = defaultValues.infectionProbability;
      speedRange.value = defaultValues.speed;
      vaccinationRange.value = defaultValues.vaccination;
      effectivenessRange.value = defaultValues.effectiveness;
      sirsim.reset();
      updateRangeValues();
    };
  }

  return function () {
    if (resetToDefault) {
      sirsim.reset();
    } else {
      let arg = new Object();
      let psize = parseInt(popsize.value);
      let rectime = parseInt(recoverytimeinmillis.value);
      let iprob = parseFloat(infectionprobability.value);
      let speed = parseFloat(speedRange.value);
      let vaccination = parseFloat(vaccinationRange.value);
      let effectiveness = parseFloat(effectivenessRange.value);

      setSimulationParameters(
        psize,
        arg,
        rectime,
        iprob,
        speed,
        vaccination,
        effectiveness
      );

      sirsim.reset(arg);
    }

    function setSimulationParameters(
      psize,
      arg,
      rectime,
      iprob,
      speed,
      vaccination,
      effectiveness
    ) {
      if (psize !== undefined && psize >= 10 && psize <= 500) {
        arg.popsize = psize;
      }
      if (rectime !== undefined && rectime >= 1000 && rectime <= 5000) {
        arg.recoveryTimeInMillis = rectime;
      }
      if (iprob !== undefined && iprob >= 0 && iprob <= 1) {
        arg.infectionProbability = iprob;
      }
      if (speed !== undefined && speed >= 1 && speed <= 5) {
        arg.speed = speed;
      }
      if (
        vaccination !== undefined &&
        vaccination !== null &&
        vaccination !== NaN
      ) {
        arg.vaccination = vaccination;
      }
      if (
        effectiveness !== undefined &&
        effectiveness !== null &&
        effectiveness !== NaN
      ) {
        arg.effectiveness = effectiveness;
      }
    }
  };
}

// configure the form ranges labels
$(function () {
  $("#psmin").html(document.getElementById("popsize").getAttribute("min"));
  $("#psmax").html(document.getElementById("popsize").getAttribute("max"));
  $("#ipmin").html(
    document.getElementById("infectionprobability").getAttribute("min")
  );
  $("#ipmax").html(
    document.getElementById("infectionprobability").getAttribute("max")
  );
  $("#rtmin").html(
    document.getElementById("recoverytimeinmillis").getAttribute("min")
  );
  $("#rtmax").html(
    document.getElementById("recoverytimeinmillis").getAttribute("max")
  );
  $("#spmin").html(document.getElementById("speed").getAttribute("min"));
  $("#spmax").html(document.getElementById("speed").getAttribute("max"));
  $("#vcmin").html(document.getElementById("vaccination").getAttribute("min"));
  $("#vcmax").html(document.getElementById("vaccination").getAttribute("max"));
  $("#effecmin").html(
    document.getElementById("effectiveness").getAttribute("min")
  );
  $("#effecmax").html(
    document.getElementById("effectiveness").getAttribute("max")
  );

  $("#psactval").html(document.getElementById("popsize").value);
  $("#rtactval").html(document.getElementById("recoverytimeinmillis").value);
  $("#ipactval").html(document.getElementById("infectionprobability").value);
  $("#spactval").html(document.getElementById("speed").value);
  $("#vcactval").html(document.getElementById("vaccination").value);
  $("#effecactval").html(document.getElementById("effectiveness").value);

  popsize.addEventListener("change", () => {
    $("#psactval").html(document.getElementById("popsize").value);
  });
  recoverytimeinmillis.addEventListener("change", () => {
    $("#rtactval").html(document.getElementById("recoverytimeinmillis").value);
  });
  infectionprobability.addEventListener("change", () => {
    $("#ipactval").html(document.getElementById("infectionprobability").value);
  });
  speedRange.addEventListener("change", () => {
    $("#spactval").html(document.getElementById("speed").value);
  });
  vaccinationRange.addEventListener("change", () => {
    $("#vcactval").html(document.getElementById("vaccination").value);
  });
  effectivenessRange.addEventListener("change", () => {
    $("#effecactval").html(document.getElementById("effectiveness").value);
  });
});

// disables form submission, to prevent unwanted page updates
$("form").submit(false);
