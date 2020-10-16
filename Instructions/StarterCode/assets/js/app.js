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
       
    // create x and y scales for the plot
    var xScale = d3.scaleLinear()
    .domain([d3.min(healthDataPoints, d => d.poverty) * 0.9, d3.max(healthDataPoints, d => d.poverty) * 1.1])
    .range([0, width]);
    
    var yScale = d3.scaleLinear()
    .domain([d3.min(healthDataPoints, d => d.healthcare) * 0.8, d3.max(healthDataPoints, d => d.healthcare) * 1.1])
    .range([height, 0]);

    // create x and y axis
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // append axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    // create circles
    var circlesGroup = chartGroup.selectAll("circle")
    // console.log(circlesGroup)
        .data(healthDataPoints)
        .enter()
        .append("circle")
        .classed("circle", true)
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d=> yScale(d.healthcare))
        .attr("r", 16)
        .attr("fill", "lightblue")