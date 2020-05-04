// MUST BE IMPORTED AFTER sirsim.js

let graphSketch = (p) => {
  //====== DRAWING PARAMS ======//
  let frameRate = 6;
  // canvas parameters
  let canvas; // p5js canvas
  let defaultHeight = 200;
  let mobWidth = (screen.availWidth - (8*2*2));
  let graphCanvasSize = ( screen.availWidth > 672 ) ?
     { width: 640, height: defaultHeight } : { width: mobWidth, height: defaultHeight };

  //====== GRAPH INTERNAL VARIABLES ======//
  const MAXNUMBEROFUPDATES = graphCanvasSize.width;
  let currentXCoordinatePixel = 0;
  let pace = 3; // x distance in pixels between two p.draw invocations
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
    canvas = p.createCanvas(graphCanvasSize.width, graphCanvasSize.height);
    canvas.id('graph-canvas');
    canvas.parent('graph-container');
    p.frameRate(frameRate);
    p.reset();
  }

  /** Reset and restart the graph. */
  p.reset = () => {
    p.background(255);
    currentXCoordinatePixel = 0;
    prev_x = 0;
    prev_y = {SUSCEPTIBLE: 0, INFECTIOUS: 0, RECOVERED: 0};
    lineDrawer = createLineDrawer(sirsim.getNumberOfBalls());
    p.strokeWeight(4);
    p.loop();
  }
  
  p.draw = () => {
    currentXCoordinatePixel += pace;
    if(currentXCoordinatePixel == graphCanvasSize.width) {
      p.noLoop();
    }
    else {
      lineDrawer.drawLines(sirsim.getStatusArray());
    }
  }
  
  /**
   * LineDrawer factory.
   * @param {Number} numberOfBalls - number of balls in the simulation
   */
  function createLineDrawer(numberOfBalls) {
    let totalBalls = numberOfBalls;
    let height = graphCanvasSize.height;
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
          let y = numberOfBallsInStatus[consideredStatus];
          p.line(prev_x, Math.floor(height - ratio * prev_y[consideredStatus]),
                  currentXCoordinatePixel, Math.floor(height - ratio * y));
          // updates the previous y value
          prev_y[consideredStatus] = y;
        }
        /* x updated only after the loop because all the satuses have the
         * same coordinate througout the same call. */
        prev_x = currentXCoordinatePixel;

        // if there are no more infectious it stops the graph
        if (numberOfBallsInStatus.INFECTIOUS === 0) {
          p.noLoop();
        }
      }
    }
  }
}
