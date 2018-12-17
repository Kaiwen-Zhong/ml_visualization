var width = 700;
var height = 500;

var margin = { top: 80, left: 50, bottom: 40, right: 10 };

var svg_dat_new = d3.select("#data_dive_viz")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
//.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


function getData(e) {
  console.log("hi");
  e.preventDefault();
  var xaxis = $('#xaxis').val();
  var yaxis = $('#yaxis').val();
  //console.log(xaxis)
  //console.log(yaxis)

  $.post("/data_dive",
    {
      x_axis: xaxis,
      y_axis: yaxis
    },
    function (data) {


      function groupBy(array, f) {
        var groups = {};
        array.forEach(function (o) {
          var group = JSON.stringify(f(o));
          groups[group] = groups[group] || [];
          groups[group].push(o);
        });
        return Object.keys(groups).map(function (group) {
          return groups[group];
        })
      };

      //var var1 = xaxis;
      //var var2 = yaxis;
      console.log(xaxis);
      console.log(yaxis)
      //data_array = json.loads(data);
      //console.log(data_array)
      data = JSON.parse(data);
      var data_viz = [];
      //console.log(data[0][xaxis]);
      //console.log(data_viz[0].xaxis);
      for (var i = 0; i < data.length; i++) {

        data_viz.push([+data[i][xaxis],
          +data[i][yaxis],
          +data[i].response]);

      }

      var item = [1, 2];

      var result = groupBy(data_viz, function(item)
      {
        return [item[0], item[1], item[2]];
      });
      //console.log(result);
      console.log(result[0][0][1]);

      var data_refined = [];

      for(var i = 0; i < result.length; i++){
        //console.log(result);

        data_refined.push([result[i][0][0], result[i][0][1], result[i][0][2], result[i].length]);

      };

      if(xaxis=='age' & yaxis=='channel'){

        svg_dat_new.selectAll('.user_input_viz')
          .remove();

        svg_dat_new.selectAll('.text_inp_x')
          .remove();

        svg_dat_new.selectAll('.text_inp_y')
          .remove();


        svg_dat_new.selectAll('user_input_viz')
          .data(data_refined)
          .enter()
          .append('circle')
          .transition()
          .delay('1500')
          .duration(function(d, i){
            return i / data_refined.length * 3000;
          })
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

        svg_dat_new.selectAll('text_inp_y')
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

        svg_dat_new.selectAll('text_inp_x')
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


      }
      else if(xaxis=='age' && yaxis=='content'){
        svg_dat_new.selectAll('.user_input_viz')
          .remove();

        svg_dat_new.selectAll('.text_inp_x')
          .remove();

        svg_dat_new.selectAll('.text_inp_y')
          .remove();



        svg_dat_new.selectAll('user_input_viz')
          .data(data_refined)
          .enter()
          .append('circle')
          .transition()
          .delay('1500')
          .duration(function(d, i){
            return i / data_refined.length * 3000;
          })
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


        var channel_name = ['Safety', 'Efficacy', 'New Indication', 'Drug Sample'];

        svg_dat_new.selectAll('text_inp_y')
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

        svg_dat_new.selectAll('text_inp_x')
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
            return 380;
          })
          .text(function(d){
            return d;
          })
          .style("opacity", 1)
          .attr("fill", "#000")
          .attr("stroke-width", 0.5)
          .attr("stroke", "#000")
          .style("font-size", "12px");

      }

      else if(xaxis=='age' && yaxis=='patient_count_new'){
        svg_dat_new.selectAll('.user_input_viz')
          .remove();

        svg_dat_new.selectAll('.text_inp_x')
          .remove();

        svg_dat_new.selectAll('.text_inp_y')
          .remove();



        svg_dat_new.selectAll('user_input_viz')
          .data(data_refined)
          .enter()
          .append('circle')
          .transition()
          .delay('1500')
          .duration(function(i){
            return i/data_refined.length + 3000;
          })
          .attr('class', '.user_input_viz')
          .attr('cx', function(d){
            //console.log(d[0]);
            return d[0]*10;
          })
          .attr('cy', function(d){
            return d[1]*2;
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
          .style('opacity', function(d){
            return d[3] *0.03;

          });



        var age_name = [30, 40, 50, 60, 70];

        svg_dat_new.selectAll('text_inp_x')
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
            return 380;
          })
          .text(function(d){
            return d;
          })
          .style("opacity", 1)
          .attr("fill", "#000")
          .attr("stroke-width", 0.5)
          .attr("stroke", "#000")
          .style("font-size", "12px");
      }

    })
}


