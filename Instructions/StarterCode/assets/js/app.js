// create svgHeight and svgWidth variables 
var svgWidth = 960;
var svgHeight = 600;

// create the margin variable
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 50
  };

  // create width and height variable 
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG that will hold the chart
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group and move it with transform
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);