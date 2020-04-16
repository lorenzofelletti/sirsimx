let graphSketch = (p) => {
  let canvas;
  const MAXNUMBEROFUPDATES = 400;
  let callNumber = 0;
  const status = sirsim.getStatus();
  const statusColor = {
    SUSCEPTIBLE: {r: 255, g: 255, b: 0},
    INFECTIOUS: {r: 255, g: 0, b: 0},
    RECOVERED: {r: 0, g: 255, b: 0}
  };
  let prev_x = 0, prev_y = {SUSCEPTIBLE: 0, INFECTIOUS: 0, RECOVERED: 0};

  p.setup = () => {
    canvas = p.createCanvas(400, 500);
    canvas.parent('graph-container');
    p.frameRate(6);
    p.reset();
  }

  p.reset = () => {
    p.background(220);
    callNumber = 0;
    prev_x = 0;
    prev_y = {SUSCEPTIBLE: 0, INFECTIOUS: 0, RECOVERED: 0};
    p.loop();
  }

  p.draw = () => {
    ++callNumber;
    if(callNumber == MAXNUMBEROFUPDATES)
      noLoop();
    p.drawLines(sirsim.getStatusArray());
  }
  
  p.drawLines = (statusArray) => {
    let numberOfBallsInStatus = {SUSCEPTIBLE: 0, INFECTIOUS: 0, RECOVERED: 0};
    statusArray.forEach(element => {
      if (element === status.SUSCEPTIBLE)
        ++numberOfBallsInStatus.SUSCEPTIBLE;
      else if (element === status.INFECTIOUS)
        ++numberOfBallsInStatus.INFECTIOUS;
      else 
        ++numberOfBallsInStatus.RECOVERED;
    });

    for(let consideredStatus in status) {
      p.stroke(statusColor[consideredStatus].r,
              statusColor[consideredStatus].g,
              statusColor[consideredStatus].b,);
      // draw line
      let x = callNumber;
      let y = numberOfBallsInStatus[consideredStatus];
      p.line(prev_x, 500-prev_y[consideredStatus], x, 500-y);
      prev_x = x;
      prev_y[consideredStatus] = y;
    }
  }

}

var graph = new p5(graphSketch);