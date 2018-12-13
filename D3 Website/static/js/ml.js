var width = 700;
var height = 500;

var margin = { top: 80, left: 50, bottom: 40, right: 10 };

var svg_new = d3.select("#ml_viz")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
//.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.csv("../../Data/mock_data_final_int_3.csv").then(function(data) {

  console.log('YYYYOOOOOO');

  var dat_calc_channel = [];
  for (var i = 0; i < data.length; i++) {
    dat_calc_channel.push([+data[i].age,
      +data[i].channel,
      +data[i].response]);
  }
  generate_ml(dat_calc_channel)
});

function generate_ml(data_calculate_channel){

  console.log('YYYYOOOOOOOOOOOOOOOOOOOOOO');
  function groupBy( array , f )
  {
    var groups = {};
    array.forEach( function( o )
    {
      var group = JSON.stringify( f(o) );
      groups[group] = groups[group] || [];
      groups[group].push( o );
    });
    return Object.keys(groups).map( function( group )
    {
      return groups[group];
    })
  };

  var item = [1, 2];

  var result_channel = groupBy(data_calculate_channel, function(item)
  {
    return [item[0], item[1], item[2]];
  });
  //console.log(result);
  console.log(result_channel[0][0][1]);

  var data_refined_channel = [];

  for(var i = 0; i < result_channel.length; i++){
    //console.log(result);

    data_refined_channel.push([result_channel[i][0][0], result_channel[i][0][1], result_channel[i][0][2], result_channel[i].length]);

  };

  svg_new.selectAll('user_input_viz')
    .data(data_refined_channel)
    .enter()
    .append('circle')
    //.transition()
    //.delay('1500')
    //.duration(function(d, i){
    //  return i / data_refined_channel.length * 3000;
    //})
    .attr('class', 'user_input_viz')
    .attr('cx', function(d){
      //console.log(d[0]);
      return d[0]*10;
    })
    .attr('cy', function(d){
      return (d[1]*100)+50;
    })
    .attr('r', 7)
    .attr("fill", function(d){
      if(d[2] === 0){
        return '#999999';
      }
      else{
        return 'green';
      }
    })
    .attr('stroke', '1px')
    .attr('stroke-width', '1px')
    .style('opacity', function(d) {
      return d[3] * 0.0003;
    })


  var channel_name = ['Email', 'Direct Mail', 'Rep Call'];

  svg_new.selectAll('text_inp_y')
    .data(channel_name)
    .enter()
    .append('text')
    .attr('class', 'text_inp_y')
    .attr('x', function(d){
      return 200;
    })
    .attr('y', function(d,i){
      return (i*100)+55;
    })
    .text(function(d){
      return d;
    })
    .style("opacity", 1)
    .attr("fill", "#000")
    .attr("stroke-width", 0.5)
    .attr("stroke", "#000")
    .style("font-size", "12px");

  var age_name = [30, 40, 50, 60, 70];

  svg_new.selectAll('text_inp_x')
    .data(age_name)
    .enter()
    .append('text')
    .attr('class', 'text_inp_x')
    .attr('x', function(d, i){
      if(i===0){
        return 300;
      }
      else if(i===1){
        return 395;
      }
      else if(i===2){
        return 500;
      }
      else if(i===3){
        return 580;
      }
      else if(i===4){
        return 670;
      }
    })
    .attr('y', function(d,i){
      return 300;
    })
    .text(function(d){
      return d;
    })
    .style("opacity", 1)
    .attr("fill", "#000")
    .attr("stroke-width", 0.5)
    .attr("stroke", "#000")
    .style("font-size", "12px");


  var rect = [
    {
      x:290,
      y:20,
      width:110,
      height:80
    },
    {
      x:400,
      y:100,
      width:110,
      height:100
    },
    {
      x:510,
      y:200,
      width:170,
      height:75
    },
    {
      x:400,
      y:20,
      width:280,
      height:80
    },
    {
      x:290,
      y:100,
      width:110,
      height:100
    },
    {
      x:510,
      y:100,
      width:170,
      height:100
    },

    {
      x:290,
      y:200,
      width:220,
      height:75
    }
  ];


  svg_new.selectAll('partition')
    .data(rect)
    .enter()
    .append('rect')
    .attr('class', 'partition_ml')
    .transition()
    .duration(function(d, i){
      return i / rect.length * 3000;
    })
    .attr('x', function(d){
      return d.x;
    })
    .attr('y', function(d){
      return d.y;
    })
    .attr('width', function(d){
      return d.width;
    })
    .attr('height', function(d){
      return d.height;
    })
    .style("opacity", 0.3)
    .attr("fill", function(d, i){
      if(i===0 | i===1 | i===2){
        return "green";
      }
      else{
        return "#999999";
      }
    })
    .attr("stroke-width", 0.1)
    .attr("stroke", "green")


};
