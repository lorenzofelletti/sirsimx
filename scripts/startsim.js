// variable that holds the simulation
var sirsim;
// variable holding the graph
var graph;
// Event to change graph play status
var changeGraphPlayStatusEvent = new Event('change-graph-play-status');
// Event to reset the graph
var resetGraphEvent = new Event('reset-graph');
$(() => {
  sirsim = new p5(sketch);
  graph = new p5(graphSketch);
});