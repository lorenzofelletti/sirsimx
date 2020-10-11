let sketch = (p) => {
  //====== DRAWING PARAMS ======//
  let frameRate = 30; // frame rate
  let canvas; // the canvas
  // canvas size parameters
  let mobWidth = (screen.availWidth - (8 * 2 * 2));
  let mobHeight = Math.floor(mobWidth * (3 / 4));
  let simCanvasSize = (screen.availWidth > 672) ?
    { width: 640, height: 480 } : { width: mobWidth, height: mobHeight };
  /**
   * Correlates the {@link status} with the relative rgb color.  
   */
  const statusColor = {
    1: '#ffff00',
    2: '#ff0000',
    3: '#00ff00',
  }

  //====== SIMULATION INTERNAL VARIABLES ======//
  let balls; // array storing the balls
  // array storing the balls in infectious status and their
  let ballsInfectionTime = [];

  //====== SIMULATION NON-SETTABLE PARAMETERS ======//
  let diameter = 10; /** single ball diameter */
  let diameterSqrd = diameter ** 2;
  let spring = 0.1; /** spring constant for elastic collisions */

  //====== SIMULATION SETTABLE PARAMETERS ======//
  let numBalls; /** number of simulated balls (equal to the setted population size)  */
  /** time for a ball to stay in infectious status before switching to recovered */
  let recoveryTimeInMillis;
  /** probability of infecting others when colliding with them */
  let infectionProbability;
  let speed; /** ball's speed */
  /**
   * Enumerates the three SIR possible status.
   */
  const status = {
    SUSCEPTIBLE: 1,
    INFECTIOUS: 2,
    RECOVERED: 3
  };

  /**
   * Defines the default values of the parameters.
   * @property {number} defaultValues.popsize   - the population size (integer)
   * @property {number} defaultValues.recoveryTimeInMillis   - recovery time in ms, (integer)
   * @property {number} defaultValues.infectionProbability   - the probability of infect someone [0,1]
   */
  const defaultValues = {
    popsize: 300,
    recoveryTimeInMillis: 2000,
    infectionProbability: 1,
    speed: 2
  };

  //====== VARIABLE ACCESS METHODS ======//
  p.getNumberOfBalls = () => {
    return numBalls;
  }

  p.getDefaultValues = () => {
    return defaultValues;
  }

  p.getStatus = () => {
    return status;
  }

  p.getStatusArray = () => {
    let statuses = [];
    for (let i = 0; i < balls.length; i++) {
      statuses[i] = balls[i].status;
    }
    return statuses;
  }

  //====== STATUS MANAGEMENT METHODS ======//
  /**
  * Check if a ball's infectious time is over and, if so, changes its status
  * to recovered. Implement the infection logic.
  */
  p.checkForRecovered = () => {
    ballsInfectionTime.forEach(ball => {
      if (ball.time !== undefined &&
        (Date.now() - ball.time > recoveryTimeInMillis)) {
        ball.time = undefined;
        balls[ball.index].status = status.RECOVERED;
      }
    });
  }

  //====== SKETCH METHODS ======//
  p.setup = function () {
    canvas = p.createCanvas(simCanvasSize.width, simCanvasSize.height);
    canvas.parent('sirsim-container');
    p.frameRate(frameRate);
    this.reset();
  }

  /**
   * Resets the sketch and restart it with new parameters.
   * @param {Object} args  - object containing the simulation's new parameters 
   */
  p.reset = function (args) {
    /* Changes the play status when the canvas is clicked
     * and also send an event to stop the graph. */
    canvas.mouseClicked(function () {
      let playing = true;
      let stopTime;
      return () => {
        if (playing) {
          playing = false;
          stopTime = Date.now();
          p.noLoop();
          // stop plotting the graph
          graph && graph._setupDone && graph.noLoop();
        } else {
          playing = true;
          let delta = Date.now() - stopTime;
          ballsInfectionTime.forEach(ball => {
            if (ball.time) {
              ball.time += delta;
            }
          })
          p.loop();
          // resume graph plotting
          graph && graph._setupDone && graph.loop();
        }
      }
    }());

    // reset the sketch's variables and play status
    playing = true;
    p.loop();
    balls = [];
    ballsInfectionTime = [];

    // if there are input params, set them
    numBalls = (args && args.popsize) ? args.popsize : defaultValues.popsize;
    recoveryTimeInMillis =
      (args && args.recoveryTimeInMillis) ? args.recoveryTimeInMillis : defaultValues.recoveryTimeInMillis;
    infectionProbability =
      (args && args.infectionProbability) ? args.infectionProbability : defaultValues.infectionProbability;
    speed = (args && args.speed) ? args.speed : defaultValues.speed;

    // create the balls
    for (let i = 0; i < numBalls; i++) {
      balls[i] = new Ball(
        p.random(p.width),
        p.random(p.height),
        diameter,
        i,
        balls,
        status.SUSCEPTIBLE
      );
    }

    // change the last ball status to Infectious
    balls[numBalls - 1].status = status.INFECTIOUS;
    ballsInfectionTime.push({ time: Date.now(), index: numBalls - 1 });

    // reset the graph
    graph && graph._setupDone && graph.reset();
  }

  p.draw = function () {
    p.background(0, 87, 255); //0057ff
    p.checkForRecovered();
    balls.forEach(ball => {
      p.push();
      p.noStroke();
      p.fill(statusColor[ball.status]);
      ball.collide();
      ball.move();
      ball.display();
      p.pop();
    });
  }

  //====== BALL IMPLEMENTATION ======//
  /**
   * A single dot on the canvas. It represents a person of the population.
   */
  class Ball {
    constructor(xin, yin, din, idin, oin, status) {
      this.x = xin;
      this.y = yin;
      this.vx = p.random(-1, 1) * speed;
      this.vy = p.random(-1, 1) * speed;
      this.diameter = din;
      this.id = idin;
      this.others = oin;
      this.status = status;
    }

    /**
     * Calculate if the ball is colliding with others and encapsulate part of
     * the infection logic (if a ball's status has to switch to infectious).
     */
    collide() {
      for (let i = 0; i < numBalls; i++) {
        let dx = this.others[i].x - this.x;
        let dy = this.others[i].y - this.y;
        let distanceSqrd = dx ** 2 + dy ** 2;

        if (distanceSqrd < diameterSqrd) {
          let angle = p.atan2(dy, dx);
          let targetX = this.x + p.cos(angle) * diameter;
          let targetY = this.y + p.sin(angle) * diameter;
          let ax = (targetX - this.others[i].x) * spring;
          let ay = (targetY - this.others[i].y) * spring;
          this.vx -= ax;
          this.vy -= ay;
          this.others[i].vx += ax;
          this.others[i].vy += ay;

          //infection logic
          this.checkForStatusChange(i);
        }
      }
    }

    /**
     * Check if @this Ball status has to change following a collision with
     * another ball (which index is passed as a parameter) 
     * @param {number} otherBallIndex 
     */
    checkForStatusChange(otherBallIndex) {
      if (this.status === status.SUSCEPTIBLE
        && this.others[otherBallIndex].status === status.INFECTIOUS
        && (Math.random() <= infectionProbability)) {
        this.status = status.INFECTIOUS;
        ballsInfectionTime.push({ time: Date.now(), index: this.id });
      }
    }

    move() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x + this.diameter / 2 > p.width) {
        this.x = p.width - this.diameter / 2;
        this.vx *= -1;
      } else if (this.x - this.diameter / 2 < 0) {
        this.x = this.diameter / 2;
        this.vx *= -1;
      }
      if (this.y + this.diameter / 2 > p.height) {
        this.y = p.height - this.diameter / 2;
        this.vy *= -1;
      } else if (this.y - this.diameter / 2 < 0) {
        this.y = this.diameter / 2;
        this.vy *= -1;
      }
    }

    display() {
      p.circle(this.x, this.y, diameter);
    }
  } // Ball
} // sketch
