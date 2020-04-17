let graphSketch = (p) => {
  //====== DRAWING PARAMS ======//
  let frameRate = 6;
  // canvas parameters
  let canvas; // p5js canvas
  let canvasSize = { width: (screen.availWidth - (8*2*2)), height: 200 };
  
  //====== PLAY-PAUSE IMPLEMENTATION VARIABLES ======//
  let playing = true;

  //====== GRAPH INTERNAL VARIABLES ======//
  const MAXNUMBEROFUPDATES = canvasSize.width;
  let callNumber = 0;
  const status = sirsim.getStatus();
  const statusColorRGB = {
    SUSCEPTIBLE: {r: 255, g: 255, b: 0},
    INFECTIOUS: {r: 255, g: 0, b: 0},
    RECOVERED: {r: 0, g: 255, b: 0}
  };
  let lineDrawer;
  let prev_x = 0, prev_y = {SUSCEPTIBLE: 0, INFECTIOUS: 0, RECOVERED: 0};

  //====== SKETCH METHODS ======//
  p.setup = () => {
    canvas = p.createCanvas(canvasSize.width, canvasSize.height);
    canvas.id('graph-canvas');
    canvas.parent('graph-container');
    // add the listener to the reset-graph event
    document.addEventListener('reset-graph', () => {
      p.reset();
    });
    // add the listener to the change-graph-play-status event
    document.addEventListener('change-graph-play-status', () => {
      console.log("called");
      if(playing) {
        playing = false;
        p.noLoop();
      } else {
        playing = true;
        p.loop();
      }
    });

    p.frameRate(frameRate);
    p.reset();
  }

  /** Reset and restart the graph. */
  p.reset = () => {
    playing = true;
    p.background(255);
    callNumber = 0;
    prev_x = 0;
    prev_y = {SUSCEPTIBLE: 0, INFECTIOUS: 0, RECOVERED: 0};
    lineDrawer = createLineDrawer(sirsim.getNumberOfBalls());
    p.strokeWeight(4);
    p.loop();
  }

  p.getLD = () => {
    return lineDrawer;
  }

  p.draw = () => {
    ++callNumber;
    if(callNumber == MAXNUMBEROFUPDATES) {
      p.noLoop();
    }
    else {
      lineDrawer.drawLines(sirsim.getStatusArray());
    }
  }
  
  function createLineDrawer(numberOfBalls) {
    let totalBalls = numberOfBalls;
    let height = canvasSize.height;
    let ratio = height / totalBalls;
    let numberOfBallsInStatus;

    /** Function that draws the graph lines, one for
     * each possible status. */
    return {
      drawLines(statusArray) {
        // reset numberOfBallsInStatus
        numberOfBallsInStatus = 
            {SUSCEPTIBLE: 0, INFECTIOUS: 0, RECOVERED: 0};
        // calculate the new numberOfBallsInStatus
        statusArray.forEach(element => {
          switch(element) {
            case status.SUSCEPTIBLE:
              ++numberOfBallsInStatus.SUSCEPTIBLE;
              break;
            case status.INFECTIOUS:
              ++numberOfBallsInStatus.INFECTIOUS;
              break;
            case status.RECOVERED:
              ++numberOfBallsInStatus.RECOVERED;
              break;
            default:
              break; 
          }
        });

        // draws a line for each status
        for(let consideredStatus in status) {
          p.stroke(statusColorRGB[consideredStatus].r,
                  statusColorRGB[consideredStatus].g,
                  statusColorRGB[consideredStatus].b,);
          // draws line
          let x = callNumber;
          let y = numberOfBallsInStatus[consideredStatus];
          p.line(prev_x, Math.floor(height - ratio * prev_y[consideredStatus]),
                  x, Math.floor(height - ratio * y));
          // updates the previous x,y values 
          prev_x = x;
          prev_y[consideredStatus] = y;
        }
      }
    }
  }
}
