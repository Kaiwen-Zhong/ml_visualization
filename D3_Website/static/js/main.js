var width = 800,
  height = 700;

var margin = { top: 80, left: 50, bottom: 40, right: 10 };

var svg = d3.select("#brain_intro")
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
  for(var i = 0; i < graph.nodes.length; i++){
    x_value.push(graph.nodes[i].x);
    y_value.push(graph.nodes[i].y);
  }
  return [x_value, y_value];
}

console.log("Hi");
d3.json("../static/js/brain.json").then(function(graph) {
  //if (error) throw error;
  console.log(graph.nodes);
  var nodes = graph.nodes;


  var links = create_close_links(nodes, 100);

  var k = -1;

  svg.selectAll(".link")
    .data(links)
    .enter()
    .append("line")

    .attr("class", "link_i")
    .attr("x1", function (d) {
      return (nodes[d.source].x / 1.5) + 130;
    })
    .attr("y1", function (d) {
      return (nodes[d.source].y / 1.5) + 170;
    })
    .attr("x2", function (d) {
      return (nodes[d.target].x / 1.5) + 130;
    })
    .attr("y2", function (d) {
      return (nodes[d.target].y / 1.5) + 170;
    })
    .attr("stroke-width", function (d) {
      return d.value;
    });

  svg.selectAll(".node")
    .data(nodes)
    .enter()
    .append("circle")

    .attr("class", "node")
    .attr("cx", function (d) {
      return (d.x / 1.5) + 130;
    })
    .attr("cy", function (d) {
      return (d.y / 1.5) + 170;
    })
    .attr("r", function (d) {
      return 5 + 2 * Math.random();
    })
    .attr("fill", "#000")
    .transition()
    .attr("fill", function (d) {
      return color[(Math.floor(Math.random() * 2))];
    })
    .duration(4000)
    .on("end", function repeat_pattern(){

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
        .duration(4500)
        .on("end", repeat_pattern);
    });
  var x_array = [];
  var y_array = [];
  var array = [];

  array = max_min_val(graph);
  x_array = array[0];
  y_array = array[1];


  x_max = (d3.max(x_array) / 1.5) + 130;
  x_min = (d3.min(x_array) / 1.5) + 130;
  y_max = (d3.max(y_array) / 1.5) + 170;
  y_min = (d3.min(y_array) / 1.5) + 170;



  var icon_intro = [
    //{
    //name: "https://static.thenounproject.com/png/23420-200.png",
    //y: "520"
    //},
    {
      name: "https://cdn3.iconfinder.com/data/icons/times-with-hands/100/TIME-HANDS-4-L-512.png",
      y: "560"
    },
    {
      name: "https://static.thenounproject.com/png/858444-200.png",
      y: "600"
    },
    {
      name: "https://png.icons8.com/metro/1600/secured-letter.png",
      y: "640"
    }
    //{
    //name: "https://orig00.deviantart.net/9c92/f/2014/241/e/f/audio_frequency_icon_by_ariesmusiq-d7x68rm.png",
    //y: "680"
  ];





  var data_type = [
    {
      name: "Physician Demographic Data",
      x: 40,
      y: 50,
      transform: "rotate(-90)"
    },
    {
      name : "Physician Medical Information",
      x: 180,
      y: 100,
      transform: "rotate(-30)"
    },
    {
      name : "Promotion Data",
      x: 385,
      y: 50,
      transform: "rotate(0)"
    },
    {
      name : "Engagement Data",
      x: 520,
      y: 100,
      transform: "rotate(30)"
    },
    {
      name : "Prescription Data",
      x: 675,
      y: 50,
      transform: "rotate(90)"
    }
  ];

  var lines = [
    {
      line_path: "M125,55 l0,180 l110,0",
      transform: "rotate(-10)"
    },
    {
      line_path: "M125,55 l0,180 l110,0",
      transform: "rotate(-10)"
    },
    {
      line_path: "M275,105 l0,55",
      transform: "rotate(-10)"
    },
    {
      line_path: "M425,55 l0,105",
      transform: "rotate(-10)"
    },
    {
      line_path: "M565,105 l0,55",
      transform: "rotate(20)"
    },
    {
      line_path: "M720,55 l0,180 l-113,0",
      transform: "rotate(20)"
    },
    // {
    //   line_path: 'M275,'+(y_max+15)+' l0,25'
    // },
    {
      line_path: 'M425,'+(y_max+15)+' l0,20'
    },
    // {
    //   line_path: 'M565,'+(y_max+15)+' l0,25'
    // }
  ];


  var num_text = [1, 2, 3, 4, 5];

  //TEXT FOR DATA IN

  svg.selectAll("text")
    .data(data_type)
    .enter()
    .append("text")
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

  //ARROWS

  svg.append("svg:defs")
    .append("svg:marker")
    .attr("id", "arrow")
    .attr("refX", 2)
    .attr("refY", 6)
    .attr("markerWidth", 13)
    .attr("markerHeight", 13)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M2,2 L2,11 L10,6 L2,2");


  var path  = svg.selectAll("path")
    .data(lines)
    .enter()
    .append("path")
    .attr('d', function (d) {
      return d.line_path;
    });


  path.attr("fill", "#fff")
    .attr('stroke', "#000")
    .attr("stroke-width", "1px")
    .attr("stroke-dasharray", function(d, i){
      return path.nodes()[i - 1].getTotalLength() + " " + path.nodes()[i - 1].getTotalLength();
    })
    .attr("stroke-dashoffset", function(d, i){
      return path.nodes()[i - 1].getTotalLength();
    })
    .transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0);



  for(var i = 0; i < path.nodes().length; i++){
    var arrow = svg.append("svg:path")
      .attr("d", d3.symbol().size([50]).type(d3.symbolTriangle));
    if(i === 0){
      var num = -90;
    }
    else if(i === 4){
      var num = -87;
    }
    else{
      var num = 90;
    }
    arrow.transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attrTween("transform", translateAlong(path.nodes()[i], num));
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



  svg.selectAll("img")
    .data(icon_intro)
    .enter()
    .append('image')
    .attr('class', 'img_result_intro')
    .attr("xlink:href", function(d){ return d.name})
    .attr('x', ((width / 2)-20))
    .attr('y', function(d, i){
      return (525 + (i * 40));
    })
    .attr("width", 30)
    .attr("height", 30);


  //SUGGESTIONS BY THE NBA ENGINE

  var channel = ["Email", "Direct Mail", "Rep Call"];
  var content = ["Safety", "Efficacy", "New Indication", "Drug Sample"];
  var when = [
    "Monday Morning", "Monday Afternoon", "Monday Evening",
    "Tuesday Morning", "Tuesday Afternoon", "Tuesday Evening",
    "Wednesday Morning", "Wednesday Afternoon", "Wednesday Evening",
    "Thursday Morning", "Thursday Afternoon", "Thursday Evening",
    "Friday Morning", "Friday Afternoon", "Friday Evening",
  ];



  var output_intro = [channel[Math.floor(Math.random() * channel.length)], content[Math.floor(Math.random() * content.length)]
    , when[Math.floor(Math.random() * when.length)]];

  svg.selectAll("text_output_probability_intro")
    .data(output_intro)
    .enter()
    .append("text")
    .attr('class', 'text_output_probability_intro')
    .attr('x', ((width / 2)+15))
    .attr('y', function(d, i){
      return (545 + (i * 40));
    })
    .text(function (d) {
      return d;
    })
    .attr("fill", "#000")
    .attr("stroke-width", 1)
    .attr("stroke", "#000")
    .style("font-size", "15px")
    .style("opacity", 1);

  setInterval(increment_time_introduction, 2500);
  console.log("ys");
  //console.log(svg.selectAll(".text_output_probability_intro"));

  function increment_time_introduction() {

    output_intro = [channel[Math.floor(Math.random() * channel.length)], content[Math.floor(Math.random() * content.length)]
      , when[Math.floor(Math.random() * when.length)]];



    d3.select('svg').selectAll(".text_output_probability_intro")
      //.remove();
      .transition()
      .delay(2400)
      .remove()
      .text(function(d, i) {

        return output_intro[i];
      })
  }



  //MAKING A BOUNDING BOX TO HOST THE BRAIN IN

  svg.append("rect")
    .attr('x', (x_min - 15))
    .attr('y', (y_min - 15))
    .attr("width", (x_max - x_min) + 30)
    .attr("height", (y_max - y_min) + 30)
    .attr("fill", "none")
    .attr("stroke", "#000")
    .attr("stroke-width", "1px");



  svg.selectAll("text_datetext")
    .data(num_text)
    .enter()
    .append('text')
    .attr('class', 'text_datetext')
    .attr('x', function(d, i){
      if(i===0){
        return 75;
      }
      else if(i===1){
        return 230;
      }
      else if(i===2){
        return 386;
      }
      else if(i===3){
        return 525;
      }
      else{
        return 678
      }
    })
    .attr('y', function(d, i){
      if(i===0 | i===2 | i===4){
        return 30;
      }
      else{
        return 80;
      };
    })
    .text('Week of: ')
    .style("opacity", 1)
    .attr("fill", "#76C04D")
    .attr("stroke-width", 1)
    .attr("stroke", "#76C04D")
    .style("font-size", "15px");

  var date_text_variable = new Date("5/31/2018");

  svg.selectAll("date_text")
    .data(num_text)
    .enter()
    .append('text')
    //.attr('class', 'date_text')
    .attr('class', function(d, i){
      if(i === 2 | i === 3 | i === 4){
        return 'date_text_change_freq date_text';
      }
      else{
        return 'date_text';
      }
    })
    .attr('x', function(d, i){
      if(i===0){
        return 145;
      }
      else if(i===1){
        return 300;
      }
      else if(i===2){
        return 456;
      }
      else if(i===3){
        return 595;
      }
      else{
        return 748;
      }
    })
    .attr('y', function(d, i){
      if(i===0 | i===2 | i===4){
        return 30;
      }
      else{
        return 80;
      };
    })
    .text((date_text_variable.getMonth() + 1) + '/' + (date_text_variable.getDate()))
    .style("opacity", 1)
    .attr("fill", "#76C04D")
    .attr("stroke-width", 1)
    .attr("stroke", "#76C04D")
    .style("font-size", "15px")
    .transition()
    .duration(3000);


  var l = 0;
  var interval_date = setInterval(increment, 10000);


  function increment() {
    l = l + 1;
    date_text_variable.setDate(date_text_variable.getDate() + 7);
    if(l != 3){
      d3.select('svg').selectAll(".date_text_change_freq")
        .text((date_text_variable.getMonth() + 1) + '/' + (date_text_variable.getDate()));

    }
    else{
      d3.select('svg').selectAll(".date_text")
        .text((date_text_variable.getMonth() + 1) + '/' + (date_text_variable.getDate()));
    }

  }

  /*var channel = ["Email", "Direct Mail", "Rep Call"];
  var content = ["Safety", "Efficacy", "New Indication", "Drug Sample"];
  var when = [
    "Monday Morning", "Monday Afternoon", "Monday Evening",
    "Tuesday Morning", "Tuesday Afternoon", "Tuesday Evening",
    "Wednesday Morning", "Wednesday Afternoon", "Wednesday Evening",
    "Thursday Morning", "Thursday Afternoon", "Thursday Evening",
    "Friday Morning", "Friday Afternoon", "Friday Evening",
  ];

  output_intro = [channel[Math.floor(Math.random() * channel.length)], content[Math.floor(Math.random() * content.length)]
    , when[Math.floor(Math.random() * when.length)]];

  svg.selectAll("text_output_probability_intro")
    .data(output_intro)
    .enter()
    .append("text")
    .attr('class', 'text_output_probability_intro')
    .attr('x', function (d, i) {
      if (i === 0) {
        if(d==='Email'){
          return 255;
        }
        else{
          return 245;
        }

      }
      else if (i === 1) {
        if(d==='Safety' | d==='Efficacy'){
          return 400;
        }
        else{
          return 370;
        }

      }
      else if (i === 2) {
        return 500;
      }
      else {
        return 650;
      }
    })
    .attr('y', y_max + 70)
    .text(function (d) {
      return d;
    })
    .attr("fill", "#000")
    .attr("stroke-width", 1)
    .attr("stroke", "#000")
    .style("font-size", "15px")
    .style("opacity", 1);



  var interval = setInterval(increment_time_introduction, 2500);

  function increment_time_introduction() {


    output_intro = [channel[Math.floor(Math.random() * channel.length)], content[Math.floor(Math.random() * content.length)]
      , when[Math.floor(Math.random() * when.length)]];


    svg.selectAll(".text_output_probability_intro")
      .transition()
      .delay(2400)
      .attr('x', function (d, i) {
        if (i === 0) {
          if(output_intro[i]==='Email'){
            return 255;
          }
          else{
            return 245;
          }

        }
        else if (i === 1) {
          if(output_intro[i]==='Safety' | output_intro[i]==='Efficacy'){
            return 400;
          }
          else{
            return 368;
          }

        }
        else if (i === 2) {
          return 500;
        }
        else {
          return 650;
        }
      })
      .attr('y', y_max + 70)
      .text(function(d, i){
        return output_intro[i];
      });

  }
*/




});
