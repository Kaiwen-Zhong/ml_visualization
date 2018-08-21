var graph = [1, 2, 3, 4, 5];


var margin = {top: 20, right: 20, bottom: 20, left: 20};
var svg = d3.select("#circular_graph").append("svg")
  .attr("width", 700)
  .attr("height", 700)
  .append("g")
  .attr("transform", "translate("
    + margin.left + "," + margin.top + ")");

svg.selectAll("rect")
  .data(graph)
  .enter()
  .append("rect")
  .attr('x', function(d, i){
    if(i === 0){
      return 400;
    }
    else if(i === 1){
      return 250;
    }
    else if(i === 2){
      return 300;
    }
    else if(i === 3){
      return 500;
    }
    else if(i === 4){
      return 550;
    }
  })
  .attr("y", function(d, i){
    if(i === 0){
      return 50;
    }
    else if(i === 1 | i === 4){
      return 200;
    }
    else {
      return 350;
    }
  })
  .attr("width", 75)
  .attr("height", 70)
  .attr("rx", 5)
  .attr("ry", 5)
  .attr("fill", "#fff")
  .attr("stroke", "#A9A9A9")
  .attr("stroke-width", "4px");




var path = d3.path();


path.moveTo(400, 85);
path.lineTo(287.5, 200);


svg.append("path")
  .attr("d", path.toString())
  .attr("stroke", "#76C04D")
  .attr("stroke-width", 7)
  .attr("fill", 'none');



//path.moveTo(475, 100);
//path.bezierCurveTo(525, 100, 575, 150, 575, 200);

path.moveTo(287.5, 270);
path.lineTo(337.5, 350);


svg.append("path")
  .attr("d", path.toString())
  .attr("stroke", "#76C04D")
  .attr("stroke-width", 7)
  .attr("fill", "none");

//path.moveTo(300, 270);
//path.bezierCurveTo(250, 350, 350, 350, 350, 350);

path.moveTo(375, 385);
path.lineTo(500, 385);

svg.append("path")
  .attr("d", path.toString())
  .attr("stroke", "#76C04D")
  .attr("stroke-width", 7)
  .attr("fill", "none");

path.moveTo(537.5, 350);
path.lineTo(585.5, 270);

svg.append("path")
  .attr("d", path.toString())
  .attr("stroke", "#76C04D")
  .attr("stroke-width", 7)
  .attr("fill", "none");

path.moveTo(587.5, 200);
path.lineTo(475, 85);

svg.append("path")
  .attr("d", path.toString())
  .attr("stroke", "#76C04D")
  .attr("stroke-width", 7)
  .attr("fill", "none");





svg.selectAll('text')
  .data(graph)
  .enter()
  .append('text')
  .attr('x', function(d, i){
    if(i === 0) {
      return 420;
    }
    else if(i === 1){
      return 75;
    }
    else if(i === 2){
      return 260;
    }
    else if(i === 3){
      return 475;
    }
    else if(i === 4){
      return 625;
    }
  })
  .attr('y', function(d, i){
    if(i === 0) {
      return 40;
    }
    else if(i === 1 | i === 4){
      return 235;
    }
    else {
      return 440;
    }
  })
  .text(function(d, i){
    if(i === 0) {
      return "WHO?";
    }
    else if(i === 1){
      return "HOW FREQUENTLY?";
    }
    else if(i === 2){
      return "WHAT MESSAGE?";
    }
    else if(i === 3){
      return "HOW TO DELIVER?";
    }
    else if(i === 4){
      return "WHEN?";
    }
  })
  .style("font-size", "15px")
  .attr("text-align", "center")
  .attr("font-weight", "bold")
  .attr("fill", "#000");



