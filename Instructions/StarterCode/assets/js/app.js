// Note: You'll need to use python -m http.server to run the visualization. 
// This will host the page at localhost:8000 in your web browser.

//after testing with live server and opening it up at:
// http://127.0.0.1:5500/Instructions/StarterCode/index.html it seems the 
//code is working as well



// set up our chart - see 3.1 solved app.js for example
// Step 1: Set up our chart
var svgWidth = 960;
var svgHeight = 600;

// create the margin variable
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 50
  };

 
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
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

           // add the text to the circles
    var textSelection = chartGroup.selectAll('.text')
    console.log(textSelection)
        textSelection.data(healthDataPoints)
        .enter()
        .append("text")
        .classed('text', true)
        .attr("x", d => xScale(d.poverty))
        .attr("y", d => yScale(d.healthcare))
        .attr("transform", `translate(-10, 6)`)
        .text(d => {
            return d.abbr
        })
        .style("fill", "white" )


    // create a label group for x and y abels    
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20 })`);

    // create x label variable
    var xLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .text("In Poverty (%) ")
        .style("font-weight", "bold")

    
    // create y label variable
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - (height/2))
        .attr("y", 0 - margin.left)
        .attr("dy", "1em")
        .text("Locks Healthcare (%)")
        .style("font-weight", "bold")
});
