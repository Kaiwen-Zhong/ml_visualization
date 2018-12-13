var width = 800,
  height = 700;

var margin = { top: 80, left: 50, bottom: 40, right: 10 };

var svg_intuition = d3.select("#intuition_viz")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


var color = ["#F47421", "#76C04D"];



function distance(node1, node2) {
  return Math.sqrt( (node1.x - node2.x) * (node1.x - node2.x) + (node1.y - node2.y) * (node1.y - node2.y));
}

function create_close_links(nodes, distance_from_node) {
  var links = [];
  var num_nodes = nodes.length;
  console.log(num_nodes);
  for (i = 0; i < num_nodes; i++) {
    var source = i;
    for (j = i + 1; j < num_nodes; j++) {
      var target = j;
      if (distance(nodes[source], nodes[target]) < distance_from_node) {
        var value = 2 * Math.random() + 1;
        links.push({"source" : source, "target": target, "value" : value});
      }
    }
  }
  return links;
}

function max_min_val(graph){
  var x_value = [];
  var y_value = [];
  //console.log(graph.nodes.length);
  for(i = 0; i < graph.nodes.length; i++){
    x_value.push(graph.nodes[i].x);
    y_value.push(graph.nodes[i].y);
  }
  //console.log(x_value);
  //console.log(y_value);
  return [x_value, y_value];
}

console.log("Hi");
d3.json("../static/js/brain.json").then(function(graph) {
  var nodes = graph.nodes;


  var links = create_close_links(nodes, 100);

  svg_intuition.selectAll(".link")
    .data(links)
    .enter()
    .append("line")

    .attr("class", "link_i")
    .attr("x1", function (d) {
      return (nodes[d.source].x / 2) + 170;
    })
    .attr("y1", function (d) {
      return (nodes[d.source].y / 2) + 250;
    })
    .attr("x2", function (d) {
      return (nodes[d.target].x / 2) + 170;
    })
    .attr("y2", function (d) {
      return (nodes[d.target].y / 2) + 250;
    })
    .attr("stroke-width", function (d) {
      return d.value;
    });

  var k = -1;

  svg_intuition.selectAll(".node")
    .data(nodes)
    .enter()
    .append("circle")

    .attr("class", "node")
    .attr("cx", function (d) {
      return (d.x / 2) + 170;
    })
    .attr("cy", function (d) {
      return (d.y / 2) + 250;
    })
    .attr("r", function (d) {
      return 5 + Math.random();
    })
    .attr("fill", "#000")
    .transition()
    //.delay(500)
    .attr("fill", function (d) {
      return color[(Math.floor(Math.random() * 2))];
    })
    .duration(3000)
    //.duration(function (d, i) {
    //return i / nodes.length * 5000;
    //})
    .on("end", function repeat_pattern() {

      if (k === 2) {
        k = 0;
      }
      else {
        k = k + 1;
      }
      d3.select(this)
        .attr("fill", function (d) {
          return color[(Math.floor(Math.random() * 2))];
        })
        .transition()
        .duration(3500)
        .on("end", repeat_pattern);
    });
  var x_array = [];
  var y_array = [];
  var array = [];

  array = max_min_val(graph);
  x_array = array[0];
  y_array = array[1];

  x_max = (d3.max(x_array) / 2) + 170;
  x_min = (d3.min(x_array) / 2) + 170;
  y_max = (d3.max(y_array) / 2) + 250;
  y_min = (d3.min(y_array) / 2) + 250;


  svg_intuition.append("rect")
    .attr('x', (x_min - 15))
    .attr('y', (y_min - 15))
    .attr("width", (x_max - x_min) + 30)
    .attr("height", (y_max - y_min) + 30)
    .attr("fill", "none")
    .attr("stroke", "#000")
    .attr("stroke-width", "1px");


  //PUTTING ICONS

  var icon_intuition = [
    /*{
      name: "Who?",
      name_link: "https://static.thenounproject.com/png/23420-200.png",
      x_inp: 380,
      y_inp: 100,
      x_op: 75,
      y_op: y_max + 185,
      transform: "rotate(-90)"
    },*/
    {
      name : "How to Deliver?",
      name_link:"https://static.thenounproject.com/png/858444-200.png",
      x_inp: 220,
      y_inp: 195,
      x_op: 225,
      y_op: y_max + 150,
      x_text: 180,
      x_res_icon: 160,
      y_res_icon: y_max + 40
    },
    {
      name : "What Message?",
      name_link: "https://png.icons8.com/metro/1600/secured-letter.png" ,
      x_inp: 375,
      y_inp: 150,
      transform: "rotate(0)",
      x_op: 375,
      y_op: y_max + 150,
      x_text: 342,
      x_res_icon: 320,
      y_res_icon: y_max + 40
    },
    {
      name : "When?",
      name_link: "https://cdn3.iconfinder.com/data/icons/times-with-hands/100/TIME-HANDS-4-L-512.png" ,
      x_inp: 530,
      y_inp: 195,
      transform: "rotate(30)",
      x_op: 525,
      y_op: y_max + 150,
      x_text: 528,
      x_res_icon: 480,
      y_res_icon: y_max + 40
    }
  ];

  //ICON TEXT

  svg_intuition.selectAll("img")
    .data(icon_intuition)
    .enter()
    .append('image')
    .attr("xlink:href", function(d){ return d.name_link})
    .attr("x", function(d, i){
      return d.x_inp;
    })
    .attr("y", function(d){
      return d.y_inp + 5;
    })
    .attr("width", 30)
    .attr("height", 30);

  svg_intuition.selectAll('text_icon_name')
    .data(icon_intuition)
    .enter()
    .append('text')
    .attr('class', 'text_icon_name')
    .attr('x', function(d){
      return d.x_text;
    })
    .attr('y', function(d){
      return d.y_inp;
    })
    .text(function(d){
      return d.name;
    })
    .style("opacity", 1)
    .attr("fill", "#000")
    .attr("stroke-width", 1)
    .attr("stroke", "#000")
    .style("font-size", "15px");


  //OUTER RECTANGLE

  svg_intuition.append("rect")
    .attr('x', 90)
    .attr('y', 100)
    .attr("width", 625)
    .attr("height", (y_max + 15))

    .attr("fill", "none")
    .attr("stroke", "#000")
    .attr("stroke-width", "1px");


  //INPUT DATA CATEGORIES

  var input_data_categories = [
    {
      name: "Physician Demographic Data",
      x: 10,
      y: 42,
    },
    {
      name : "Physician Medical Information",
      x: 140,
      y: 70,
    },
    {
      name : "Promotion Data",
      x: 345,
      y: 42,
    },
    {
      name : "Engagement Data",
      x: 495,
      y: 70,
    },
    {
      name : "Prescription Data",
      x: 675,
      y: 42,
    }
  ];


  svg_intuition.selectAll("text_input_data_category")
    .data(input_data_categories)
    .enter()
    .append("text")
    .attr('class', 'text_input_data_category')
    .attr("x", function(d){
      return d.x;
    })
    .attr("y", function(d){
      return d.y;
    })
    .text(function(d){
      return d.name;
    })
    .attr("fill", "#000")
    .attr("stroke-width", 1)
    .attr("stroke", "#000")
    .style("font-size", "15px");

  //RESULT ICONS OF MODEL SHOWING PROBABILITY

  /*svg.selectAll("img")
    .data(icon_intuition)
    .enter()
    .append('image')
    .attr('class', 'img_result_probability')
    .attr("xlink:href", function(d){ return d.name_link})
    .attr("x", function(d, i){
      return d.x_res_icon;
    })
    .attr("y", function(d){
      return d.y_res_icon;
    })
    .attr("width", 30)
    .attr("height", 30);

  svg.append('image')
    .attr("xlink:href", "https://cdn2.iconfinder.com/data/icons/shopping-set-1/512/e1-512.png")
    .attr("x", 640)
    .attr("y", y_max + 38)
    .attr("width", 30)
    .attr("height", 30);*/

  /*svg.selectAll("img")
    .data(icon_intuition)
    .enter()
    .append('image')
    .attr('class', 'img_result_output')
    .attr("xlink:href", function(d){ return d.name_link})
    .attr("x", function(d, i){
      return d.x_op;
    })
    .attr("y", function(d){
      return d.y_op;
    })
    .attr("width", 30)
    .attr("height", 30);*/

  //ARROWS FOR ALL THE INPUTS

  var arrows_inputs = [
    'M50,47 l0,100 l32,0',    //Patient Demographic Data
    'M235,75 l0,18',         //Physician Medical Information
    'M390,47 l0,47',       //Promotion Data
    'M545,75 l0,18',       //Engagement Data
    'M755,47 l0,100 l-32,0',      //Prescription Data
    'M235,230 l0,40 l9,0',    //How To Deliver
    'M390,185 l0,52',      //What Message
    'M545,235 l0,40 l-12,0',  //When
    'M240,'+(y_max+115)+' l0,25', //output_how to deliver
    'M390,'+(y_max+115)+' l0,25',  //output_what message
    'M540,'+(y_max+115)+' l0,25',    //When
    //'M525,'+(y_max+55)+' l80,0'
  ];

  var path_intuition_input  = svg_intuition.selectAll("path_input")
    .data(arrows_inputs)
    .enter()
    .append("path")
    .attr('class', 'path_input')
    .attr('d', function (d) {
      return d;
    });


  path_intuition_input.attr("fill", "#fff")
    .attr('stroke', "#000")
    .attr("stroke-width", "1px")
    .attr("stroke-dasharray", function(d, i){
      return path_intuition_input.nodes()[i].getTotalLength() + " " + path_intuition_input.nodes()[i].getTotalLength();
    })
    .attr("stroke-dashoffset", function(d, i){
      return path_intuition_input.nodes()[i].getTotalLength();
    })
    .transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0);


  //ARROWS

  svg_intuition.append("svg:defs")
    .append("svg:marker")
    .attr("id", "arrow_intuition")
    .attr("refX", 2)
    .attr("refY", 6)
    .attr("markerWidth", 13)
    .attr("markerHeight", 13)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M2,2 L2,8 L7,5 L2,2");

  for(var i = 0; i < path_intuition_input.nodes().length; i++){
    var arrow_intuition = svg_intuition.append("svg:path")
      .attr("d", d3.symbol().size([50]).type(d3.symbolTriangle));
    if(i === 0){
      var num = -105;
    }
    else if(i === 4){
      var num = -75;
    }
    else if(i === 5){
      var num = -105
    }
    else if(i === 7){
      var num = -73;
    }
    else{
      var num = 90;
    }
    arrow_intuition.transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attrTween("transform", translateAlong(path_intuition_input.nodes()[i], num));
  }




  function translateAlong(path, num) {
    var l = path.getTotalLength();
    //console.log(l);
    var ps = path.getPointAtLength(0);
    //console.log(ps);
    var pe = path.getPointAtLength(l);
    //console.log(pe);
    var angl = Math.atan2(pe.y - ps.y, pe.x - ps.x) * (180 / Math.PI) + num;
    //console.log(angl);
    var rot_tran = "rotate(" + angl + ")";
    //console.log(rot_tran);
    return function() {
      //console.log(d);

      return function(t) {
        //console.log(t);
        var p = path.getPointAtLength(t * l);
        //console.log("translate(" + p.x + "," + p.y + ") " + rot_tran);
        return "translate(" + p.x + "," + p.y + ") " + rot_tran;
      };
    };
  }



  //Date Transitions

  var num_text_dat = [1, 2, 3, 4, 5];

  svg_intuition.selectAll("text_date_text")
    .data(num_text_dat)
    .enter()
    .append('text')
    .attr('class', 'text_date_text')
    .attr('x', function(d, i){
      if(i===0){
        return 45;
      }
      else if(i===1){
        return 190;
      }
      else if(i===2){
        return 346;
      }
      else if(i===3){
        return 500;
      }
      else{
        return 678;
      }
    })
    .attr('y', function(d, i){
      if(i===0 | i===2 | i===4){
        return 25;
      }
      else{
        return 55;
      }
    })
    .text('Date as of: ')
    .style("opacity", 1)
    .attr("fill", "#76C04D")
    .attr("stroke-width", 1)
    .attr("stroke", "#76C04D")
    .style("font-size", "15px");

  var date_text_variable_intuition = new Date("5/31/2018");

  svg_intuition.selectAll("date_intuition")
    .data(num_text_dat)
    .enter()
    .append('text')
    //.attr('class', 'date_text')
    .attr('class', function(d, i){
      if(i === 2 | i === 3 | i === 4){
        return 'date_text_change_freq_intuition date_text_intuition';
      }
      else{
        return 'date_text_intuition';
      }
    })
    .attr('x', function(d, i){
      if(i===0){
        return 115;
      }
      else if(i===1){
        return 260;
      }
      else if(i===2){
        return 416;
      }
      else if(i===3){
        return 570;
      }
      else{
        return 748;
      }
    })
    .attr('y', function(d, i){
      if(i===0 | i===2 | i===4){
        return 25;
      }
      else{
        return 55;
      }
    })
    .text((date_text_variable_intuition.getMonth() + 1) + '/' + (date_text_variable_intuition.getDate()))
    .style("opacity", 1)
    .attr("fill", "#76C04D")
    .attr("stroke-width", 1)
    .attr("stroke", "#76C04D")
    .style("font-size", "15px")
    .transition()
    .duration(3000);

  var x = 0;
  var interval2 = setInterval(increment, 12000);


  function increment() {
    x = x + 1;
    date_text_variable_intuition.setDate(date_text_variable_intuition.getDate() + 7);
    if(x != 3){
      svg_intuition.selectAll(".date_text_change_freq_intuition")
        .transition()
        .delay(2500)
        .text((date_text_variable_intuition.getMonth() + 1) + '/' + (date_text_variable_intuition.getDate()));

    }
    else{
      svg_intuition.selectAll(".date_text_intuition")
        .transition()
        .delay(2500)
        .text((date_text_variable_intuition.getMonth() + 1) + '/' + (date_text_variable_intuition.getDate()));
    }

  }









  var channel = ["Email", "Direct Mail", "Rep Call"];
  var content = ["Safety", "Efficacy", "New Indication", "Drug Sample"];
  var when = [
    "Monday Morning", "Monday Afternoon", "Monday Evening",
    "Tuesday Morning", "Tuesday Afternoon", "Tuesday Evening",
    "Wednesday Morning", "Wednesday Afternoon", "Wednesday Evening",
    "Thursday Morning", "Thursday Afternoon", "Thursday Evening",
    "Friday Morning", "Friday Afternoon", "Friday Evening",
  ];

  var interval = setInterval(increment_time_intuition, 12000);

  function increment_time_intuition() {
    var array_prob = [];
    for(var t = 0; t < 3; t++){
      array_prob.push(Math.ceil(Math.random()*100));
    }
    array_prob.sort();
    var output_probability = [
      [channel[Math.floor(Math.random()*channel.length)], content[Math.floor(Math.random()*content.length)], when[Math.floor(Math.random()*when.length)], array_prob[0]+'%'],
      [channel[Math.floor(Math.random()*channel.length)], content[Math.floor(Math.random()*content.length)], when[Math.floor(Math.random()*when.length)], array_prob[1]+'%'],
      [channel[Math.floor(Math.random()*channel.length)], content[Math.floor(Math.random()*content.length)], when[Math.floor(Math.random()*when.length)], array_prob[2]+'%']

    ];
    var output_final = [];
    temp = output_probability[2];
    for(var z = 0; z<3; z++){
      output_final.push(temp[z]);
    }

    var s = 0;

    var interval1 = setInterval(function(){
      y=40+s*30;
      svg_intuition.selectAll("text_output_probability")
        .data(output_probability[s])
        .enter()
        .append("text")
        .attr('class', function(d, i){
          if(s===2){
            return 'text_output_probability_green text_output_probability'
          }
          else{
            return 'text_output_probability';
          }
        })
        .attr('x', function(d, i){
          if(i===0){
            return 225;
          }
          else if(i===1){
            return 345;
          }
          else if(i===2){
            return 473;
          }
          else{
            return 650;
          }
        })
        .attr('y', y_max+y)
        .text(function(d){
          return d;
        })
        .attr("fill", "#000")
        .attr("stroke-width", 1)
        .attr("stroke", "#000")
        .style("font-size", "15px")
        .style("opacity", 1);


      //console.log(s);


      if(s===2){
        svg_intuition.selectAll('.text_output_probability_green')
          .transition()
          .delay(1000)
          .attr("fill", "#76C04D")
          .attr("stroke-width", 1)
          .attr("stroke", "#76C04D")
          .style("font-size", "15px")
          .style("opacity", 1);


        svg_intuition.selectAll("text_output_final")
          .data(output_final)
          .enter()
          .append("text")
          //.transition()
          //.delay(2000)
          .attr('class', 'text_output_final')
          .attr('x', function(d, i){
            if(i===0){
              return 225;
            }
            else if(i===1){
              return 345;
            }
            else if(i===2){
              return 473;
            }
          })
          .attr('y', y_max+175)
          .text(function(d){
            return d;
          })
          .attr("fill", "#76C04D")
          .attr("stroke-width", 1)
          .attr("stroke", "#76C04D")
          .style("font-size", "15px")
          .style("opacity", 0)
          .transition()
          .delay(2000)
          .style('opacity', 1);
      }
      s = s + 1;
      if(s===3){
        window.clearInterval(interval1);
      }


    }, 3000);

    svg_intuition.selectAll(".text_output_probability")
      .transition()
      .delay(1750)
      .style('opacity', 0)
      .remove();

    svg_intuition.selectAll(".text_output_final")
      .transition()
      .delay(1750)
      .style("opacity", 0)
      .remove();

  }














});
