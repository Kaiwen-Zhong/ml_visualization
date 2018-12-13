var hcp1 = [
  [1, 0, 1, 1, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 0, 0],
  [1, 0, 1, 0, 1, 1, 0],
  [1, 0, 0, 0, 1, 1, 0],
  [0, 0, 1, 1, 0, 0, 1]
];



function test(array, name) {


  var margin = {top: 5, right: 5, bottom: 5, left: 5};

  var svg = d3.select(name).append("svg")
    .attr("width", 500)
    .attr("height", 400)
    .append("g")
    .attr("transform", "translate("
      + margin.left + "," + margin.top + ")");


  var g = svg.append("g");

  g.selectAll("rect")
    .data(array)
    .enter()
    .append('g')
    .append("rect")
    .attr("x", function (d, i) {
      return (i * 60);
    })         // position the left of the rectangle
    .attr("y", 180)          // position the top of the rectangle
    .attr("height", 30)    // set the height
    .attr("width", 60)     // set the width
    .attr("fill", "#fff")
    .attr("stroke", "#000")
    .attr("stroke-width", "2px");


  g.selectAll('text')
    .data(array)
    .enter()
    .append('text')
    .attr('x', function (d, i) {
      return ((i * 60) + 10);
    })
    .attr('y', 198)
    .text(function (d) {

      var count = foo(d);

      if (count[1] > count[0]) {
        var num = Math.random() * 100;
        if (num > 0 & num < 25) {
          return "Email";
        }
        else if (num > 25 & num < 55) {
          return "DirectMail";
        }
        else {
          return "RepCall";
        }
      }
    })
    .style("font-size", "10px")
    .attr("text-align", "center")
    .attr("font-weight", "bold")
    .attr("fill", "#76C04D");


  g.selectAll('circle')
    .data(array)
    .enter()
    .append('g')
    //.transition()
    //.duration(500)
    .each(function (d, i) {
      var temp0 = 204;
      var temp1 = 186;
      //console.log(d);
      d3.select(this).selectAll('circle')
        .data(d)
        .enter().append('circle')
        .transition()
        .duration(1000)
        .attr('cx', function (d) {
          return ((i * 60) + 30);
        })
        .attr('cy', function (d) {
          if (d === 0) {
            temp0 = temp0 + 20;
            return temp0;

          }
          else {
            temp1 = temp1 - 20;
            return temp1;
          }

        })
        .attr('r', 10)
        .attr('fill', function (d) {
          if (d === 1) {
            return '#76C04D';
          }
          else {
            //return '#EA3323';
            return '#999999';
          }
        })
        .attr('stroke', function (d) {
          if (d === 1) {
            return '#76C04D';
          }
          else {
            //return '#EA3323';
            return '#999999';
          }
        })
        .attr("stroke-width", "2px");

    });

}



function foo(arr) {
  var counts = {};

  for (var i = 0; i < arr.length; i++) {
    var num = arr[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  return counts;

}

test(hcp1, "#voting");
