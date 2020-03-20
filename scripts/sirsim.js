//import { SVG } from '@svgdotjs/svg.js';
//
/*const svgSize = {width: 312, height: 288};

const defaultPopsize = 200;
const circleSize = 3;

var draw;

var populationArray = new Array();*/

/**
 * SIR status -> color 
 */
/*const status = {
    SUSCEPTIBLE: '#ffff00',
    INFECIOUS: '#ff0000',
    RECOVERED: '#00ff00'
}
**/




// wait for the DOM content to be loaded
// unnecessary since if the script is included at the bottom
// but you never know
/*SVG.on(document, 'DOMContentLoaded', function() {
    draw = SVG().addTo('#sirsim-container').size(svgSize.width, svgSize.height);
    svgInit(defaultPopsize);
});*/
/*
function svgInit(popsize) { 
    draw.click( () => {
        // better to get the play status (?)
        var play = true;
        return function() {
            if ( play ) {
                //stop play
                play = false;
            } else {
                //star play
                play = true;
            }
        }
    });

    for ( let i = 0; i < popsize-1; i++ ) {
        let x, y;
        
        x = Math.round(Math.random() * (svgSize.width - 2));
        y = Math.round(Math.random() * (svgSize.height - 2));*/
        // draw circle x,y,size, susceptibe color
        // let circle = draw.makecircle
        //populationArray.push(circle)
        //
        //or
        //
        //populationArray.push(svg.makeCircle(...))
        /*let circle = draw.circle(circleSize);
        circle.center(x,y).fill(status.SUSCEPTIBLE);
        populationArray.push(circle);
        particleMotion();

        if(popsize === 0) {
            x = Math.round(Math.random() * (svgSize.width - 2));
            y = Math.round(Math.random() * (svgSize.height - 2));
            let circle = draw.circle(circleSize);
            circle.center(x,y).fill(status.INFECIOUS);
            particleMotion();
            populationArray.push(circle);
        }

    }*/
    //draw circle x,y,radius, infectious color
    /*
    let circle = draw.circle(circleSize);
    circle.center(x,y).fill(status.INFECIOUS);
    populationArray.push(circle);
    */
   /*
}*/

/**
 * Sets up random initial velocities for the particles.
 */
/*function particleMotion(element) {
    (element) => {
        let vx, vy;
        vx = Math.random() * svgSize.width;
        vy = Math.random() * 2;
        element.animate().dmove(vx, vy);
        element.play();
    };
}*/
