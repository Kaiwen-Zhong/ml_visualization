var test_true = [
  1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0,
  1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0,
  0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0,
  1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0,
  1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1
];

var pred_test = [
  1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0,
  1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0,
  0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0,
  1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0,
  1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1
];



var comp = [];
var count = 0;


for(var i = 0; i < test_true.length; i++){
  if(test_true[i] === pred_test[i]){
    comp[i] = pred_test[i];
  }
  else if((test_true[i] != pred_test[i]) && pred_test[i] === 0){
    comp[i] = 2;
    count = count + 1;
  }
  else if((test_true[i] != pred_test[i]) && pred_test[i] === 1){
    comp[i] = 3;
    count = count + 1;
  }
}

var accuracy = Math.floor(((pred_test.length - count) / pred_test.length) * 100);

accuracy = (accuracy) + "%";

var acc = [accuracy, "Test Accuracy"];







var margin = {top: 20, right: 20, bottom: 20, left: 20};
var svg = d3.select("#accuracy_num")
  .append("svg")
  .attr("width", 800)
  .attr("height", 500)
  .append("g")
  .attr("transform", "translate("
    + margin.left + "," + margin.top + ")");



var path = d3.path();


path.moveTo(0, 400);
path.lineTo(500, 400);

svg.append("path")
  .attr("d", path.toString())
  .attr("stroke", "#A9A9A9")
  .attr("stroke-width", 2)
  .attr("fill", "none");

var countx = 0;
var temp = 0;
var county = 0;
var cnt = 1;
var mar = 0;

svg.selectAll(".circle")
  .data(pred_test)
  .enter()
  .append("circle")
  .transition()
  .duration(function(d, i){
    return i / pred_test.length * 3000;
  })
  .ease(d3.easeCubicIn)
  .attr("cx", function(d, i){
    if(countx <= 25){
      temp = countx * 10;
      countx  = countx + 1
    }
    else{
      countx = 0;
      temp = countx * 10;
      mar = mar + 3;

    }

    return (temp + mar);




  })

  .attr("cy", function(d, i){
    if(county <= 25){
      county  = county + 1
    }
    else{
      county = 0;
      cnt = cnt + 1;

    }

    return (400 - (cnt * 10));
  })
  .attr("r", 4)
  .attr("fill", function(d, i){
    if(pred_test[i] === 0 && test_true[i] === 0){
      return "#EA3323";
    }
    else if(pred_test[i] === 1 && test_true[i] === 1){
      return "#76C04D";
    }
    else{
      return "#fff";
    }
  })
  .attr("stroke", function(d, i) {
    if (pred_test[i] === 0 && test_true[i] === 0) {
      return "#EA3323";
    }
    else if (pred_test[i] === 1 && test_true[i] === 1) {
      return "#76C04D";
    }
    else {
      return "#A9A9A9";
    }
  });

svg.selectAll("text")
  .data(acc)
  .enter()
  .append("text")
  .transition()
  .duration(3500)
  .attr("x", function(d, i) {
    if (i === 0) {
      return 335;
    }
    else {
      return 295;
    }
  })
  .attr("y", function(d, i){
    if(i === 0){
      return 392;
    }
    else{
      return 360;
    }
  })
  .text(function(d){
    return d;
  })
  .attr("fill", "#000")
  .attr("stroke-width", 1)
  .attr("stroke", "#000")
  .style("font-size", "20px");


