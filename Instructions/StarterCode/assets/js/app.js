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

  
  // Step 3:
// Import data from the donuts.csv file
// =================================
// d3.csv("donuts.csv").then(function(donutData) {
    // Step 4: Parse the data
    // Format the data and convert to numerical and date values
    // =================================
    // Create a function to parse date and time

    
// import data from csv
d3.csv("data.csv").then(function(healthDataPoints){
    console.log(healthDataPoints);
    
    healthDataPoints.forEach(function(data){
        console.log(data);
        // grab the necessary variables for the plot,
        //make sure poverty and healthcare variables are integers
        data.poverty = + data.poverty;
        data.healthcare = + data.healthcare
    });