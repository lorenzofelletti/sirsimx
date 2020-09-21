# sirsimx
This project reproduces the [SIR Model](https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_SIR_model "SIR Model Wikipedia") for spread of diseases using HTML canvas and the JavaScript [p5.js](https://p5js.org/) library. Some scripts were minified with Google's [Closure Compiler](https://developers.google.com/closure/compiler).<br>

## Simple SIR Model Simulation
A box simulates the space where the individuals - represesented by the balls - of a population move. The individuals, according to the model, can be in each moment in one of three possible status:
* Susceptible (S) - individuals that haven't contracted the disease
* Infectious (I) - individuals that has the disease and can spread it to others
* Recovered (R) - ex-infectious that no longer have the disease, can't spread it and are now immune to it.

## Final Result
The final result can be found at https://lorenzofelletti.github.io/sirsimx/.
