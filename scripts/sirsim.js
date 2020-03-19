import { SVG } from '@svgdotjs/svg.js';

const defaultPopsize = 200;
const circleSize = 2;

var draw;

var populationArray;

/**
 * SIR status -> color 
 */
const status = {
    SUSCEPTIBLE: '#ffff00',
    INFECIOUS: '#ff0000',
    RECOVERED: '#00ff00'
}





// wait for the DOM content to be loaded
// unnecessary since if the script is included at the bottom
// but you never know
SVG.on(document, 'DOMContentLoaded', function() {
    draw = SVG().addTo('#sirsim-container');
    svgInit(defaultPopsize);
})

function svgInit(popsize) {
    populationArray = new Array(); 
    for ( let i = 0; i < popsize-1; i++ ) {
        let x, y;
        x = Math.round(Math.random() * (draw));
        y = Math.round(Math.random() * (draw));
        // draw circle x,y,size, susceptibe color
        // let circle = draw.makecircle
        //populationArray.push(circle)
        //
        //or
        //
        //populationArray.push(svg.makeCircle(...))
        let circle = draw.circle(circleSize);
        circle.center(x,y).fill(status.SUSCEPTIBLE);
        populationArray.push(circle);
    }
    //draw circle x,y,radius, infectious color
    /*
    let circle = draw.circle(circleSize);
    circle.center(x,y).fill(status.INFECIOUS);
    populationArray.push(circle);
    */
}


