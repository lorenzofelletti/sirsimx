let sketch = function(p) {
  let recoveryTimeInMillis;
  let diameter = 8;
  let numBalls;
  let spring = 0.05;
  let friction = -0.9;
  let infectionProbability;
  let balls;
  let ballsInfectionTime;
  let fr = 30;
  let playing = true;
  let canvas;
  let stopTime;
  const defaultValues = {
      popsize: 200,
      recoveryTimeInMillis: 2000,
      infectionProbability: 1
  }

  const status = {
      SUSCEPTIBLE: 1,
      INFECTIOUS: 2,
      RECOVERED: 3
  }

  const statusColor = {
      1: '#ffff00',
      2: '#ff0000',
      3: '#00ff00'
  }

  p.setup = function() {
      canvas = p.createCanvas(640, 480);
      canvas.parent('sirsim-container');
      canvas.mouseClicked( function() {
        if(playing) {
          playing = false;
          stopTime = Date.now();
          p.noLoop();
        } else {
          playing = true;
          let delta = Date.now() - stopTime;
          ballsInfectionTime.forEach(ball => {
            if ( ball.time ) {
              ball.time += delta;
            }
          }) 
          p.loop();
        }
      });
      p.frameRate(fr);
      this.reset();
  }

  p.reset = function(args) {
      playing = true;
      balls = [];
      ballsInfectionTime = [];
      if(!args) {
          numBalls = defaultValues.popsize;
          recoveryTimeInMillis = defaultValues.recoveryTimeInMillis;
          infectionProbability = defaultValues.infectionProbability;
      } else {
          numBalls = args.popsize ? args.popsize : defaultValues.popsize;
          recoveryTimeInMillis = 
              args.recoveryTimeInMillis ? args.recoveryTimeInMillis : defaultValues.recoveryTimeInMillis;
          infectionProbability = 
              args.infectionProbability ? args.infectionProbability : defaultValues.infectionProbability;
      } 
      for (let i = 0; i < numBalls; i++) {
          balls[i] = new Ball(
              p.random(p.width),
              p.random(p.height),
              diameter,
              i,
              balls,
              ballsInfectionTime,
              status.SUSCEPTIBLE
          );
      }
      balls[numBalls-1].status = status.INFECTIOUS;
      ballsInfectionTime.push({time: Date.now(), index: numBalls-1});
  }
    
  p.draw = function() { 
      p.background(0, 87, 255); //0057ff
      balls.forEach(ball => {
          p.push();
              p.noStroke();
              p.fill(statusColor[ball.status]);
              ball.collide();
              ball.move();
              ball.checkForRecovered();
              ball.display();
          p.pop();
      });
  }

  
  

  class Ball {
      constructor(xin, yin, din, idin, oin, bitin, status) {
        this.x = xin;
        this.y = yin;
        this.vx = p.random(-1, 1) * 1.5;
        this.vy = p.random(-1, 1) * 1.5;
        this.diameter = din;
        this.id = idin;
        this.others = oin;
        this.infectionsTimesArray = bitin;
        this.status = status;
      }
    
      collide() {
        for (let i = 0/*this.id + 1*/; i < numBalls; i++) {
          let dx = this.others[i].x - this.x;
          let dy = this.others[i].y - this.y;
          let distance = p.sqrt(dx * dx + dy * dy);
          let minDist = 2 * diameter;
          if (distance < minDist) {
            let angle = p.atan2(dy, dx);
            let targetX = this.x + p.cos(angle) * minDist;
            let targetY = this.y + p.sin(angle) * minDist;
            let ax = (targetX - this.others[i].x) * spring;
            let ay = (targetY - this.others[i].y) * spring;
            this.vx -= ax;
            this.vy -= ay;
            this.others[i].vx += ax;
            this.others[i].vy += ay;
            
            
            //infection logic
            if ( this.status === status.SUSCEPTIBLE && this.others[i].status === status.INFECTIOUS 
                  && (Math.random() <= infectionProbability) ) {
                this.status = status.INFECTIOUS;
                this.infectionsTimesArray.push({time: Date.now(), index: this.id});
            } else {
                continue;
            }
          }
        }
      }
    
      move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x + this.diameter / 2 > p.width) {
          this.x = p.width - this.diameter / 2;
          //this.vx *= friction;
          this.vx *= -1;;
        } else if (this.x - this.diameter / 2 < 0) {
          this.x = this.diameter / 2;
          //this.vx *= friction;
          this.vx *= -1;
        }
        if (this.y + this.diameter / 2 > p.height) {
          this.y = p.height - this.diameter / 2;
          //this.vy *= friction;
          this.vy *= -1;
        } else if (this.y - this.diameter / 2 < 0) {
          this.y = this.diameter / 2;
          //this.vy *= friction;
          this.vy *= -1;
        }
      }

      checkForRecovered() {
          this.infectionsTimesArray.forEach(ball => {
              if( ball.time !== undefined && ( Date.now() - ball.time > recoveryTimeInMillis ) ) {
                  ball.time = undefined;
                  balls[ball.index].status = status.RECOVERED;
              } else {
                  return;
              }
          })
      }
    
      display() {
        p.circle(this.x, this.y, diameter);
      }
  }
}

var sirsim = new p5(sketch);
