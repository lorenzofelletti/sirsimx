let graphSketch = (p) => {
  p.setup = () => {

  }
  
  p.reset = () => {

  }

  p.draw = () => {
    let status = sirsim.getStatusArray();
    
  }
}

/*let balls = new Array(500);
let calln = 0;
function setup() {
  createCanvas(400, 400);
  background(200);
  frameRate(30);
  loop();
}

function draw() {
  calln++;
  frameRate(20);
  let a = [];
  let b =[];
  let c = [];
  for(let i = 0; i < balls.length; i++) {
    balls[i] = Math.floor(random(1,4));
  }
  //background(220);
  //balls.push(random(100,300));
  balls.forEach(ball => {
    if(ball === 1)
      a.push(ball);
    else if(ball===2)
      b.push(ball);
    else
      c.push(ball);
  });
  drawLinesa(a, 255, 0, 0);
  drawLinesb(b, 0, 255, 0);
  drawLinesc(c, 255, 255, 0);
  if(calln==400)
    noLoop();
  console.log(a.length +","+b.length+","+c.length);
}
let pxa = 0;
let pya = 0;
function drawLinesa(a, r,g,b){
  stroke(r,g,b);
 // draw lines
  let x = calln;
  let y = a.length;
  
  line(pxa, pya, x, y);
  pxa = x;
  pya = y;
}
let pxb = 0;
let pyb = 0;
function drawLinesb(a, r,g,b){
  stroke(r,g,b);
 // draw lines
  let x = calln;
  let y = a.length;
  
  line(pxb, pyb, x, y);
  pxb = x;
  pyb = y;
}
let pxc = 0;
let pyc = 0;
function drawLinesc(a, r,g,b){
  stroke(r,g,b);
 // draw lines
  let x = calln;
  let y = a.length;
  
  line(pxc, pyc, x, y);
  pxc = x;
  pyc = y;
}*/

var graph = new p5(graphSketch);