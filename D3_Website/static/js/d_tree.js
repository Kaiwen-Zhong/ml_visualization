function generate(treeData, name) {


// Set the dimensions and margins of the diagram
  var margin = {top: 30, right: 120, bottom: 20, left: 120},
    width = 1180 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
  var svg = d3.select(name).append("svg")
    .attr("width", 900)
    .attr("height", 400)
    .append("g")
    .attr("transform", "translate("
      + margin.left + "," + margin.top + ")");

  var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
  var treemap = d3.tree().size([height, width]);


// Assigns parent, children, height, depth
  root = d3.hierarchy(treeData, function (d) {
    //console.log(d);
    return d.children;
  });
  //console.log(root);
  root.x0 = height / 2;
  root.y0 = 0;

  console.log(root);

// Collapse after the second level
  //root.children.forEach(collapse);




  update(root, name);



  function update(source, name) {






    // Assigns the x and y position for the nodes
    var treeData = treemap(root);
    //console.log(treeData);

    // Compute the new tree layout.
    var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);



    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
      d.y = d.depth * 40;

    });

    //console.log(nodes);

    var r_scale         =   d3.scaleSqrt()
      .domain([0
        , d3.max(nodes, function(d){
          return d.data.sample_count;
        })])
      .range([3, 10]);
    // ****************** Nodes section ***************************

    // Update the nodes...
    var node = svg.selectAll('g.node')
      .data(nodes, function (d) {
        return d.id || (d.id = ++i);
      });
    //console.log(node);

    // Enter any new modes at the parent's previous position.
    var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function (d) {
        return "translate(" + source.x0 + "," + source.y0 + ")";
      })
      .on("click", click);

    // Add Circle for the nodes
    nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", "#fff");
    //});

    // Add labels for the nodes
    nodeEnter.append('text')
      .attr("y", function (d) {
        return d.children || d._children ? -18 : 18;
      })
      .attr("dy", ".35em")
      .attr("text-anchor", function (d) {
        return d.children || d._children ? "middle" : "middle";
      })
      .text(function (d) {
        //if(name === '#chart6'){
         // return 'Hover to view the condition'
        //}
        //else{
        return d.children || d._children ? d.data.label : "";
        //}

      }).
      style("fill-opacity", 1);

    // if(name === '#chart6'){
    //   nodeEnter.append('title')
    //     .text(function (d) {
    //       if(d.data.Condition_school != "NA"){
    //         return d.data.Condition_school;
    //       }
    //     })
    //}


    // UPDATE
    var nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.transition()

      .duration(duration)
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    // Update the node attributes and style
    nodeUpdate.select('circle.node')
      .attr('r', function(d){
        if(d.data.type === 'split'){
          return 10;
        }
        else{
          //return r_scale(d.data.sample_count);
          return 15;
        }
      })
      .style("stroke", function(d){
        if(d.data.type === 'split') {
          return '#000';
        }
        else if(d.data.sample_count < 5000 & d.data.type === 'leaf')
              return '#76C04D';
            else
              //return '#8A93A2';
              return '#999999';
              //return '#000080';


      })
      .style("fill", function (d) {
        if(d.data.type === 'split') {
          return '#fff';
        }
        else if(d.data.sample_count < 5000 & d.data.type === 'leaf')
          return '#76C04D';
        else
          //return '#8A93A2';
          return '#999999';
          //return '#000080';
      })
      .attr('cursor', 'pointer');


    // Remove any exiting nodes
    var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function (d) {
        return "translate(" + source.x + "," + source.y + ")";
      })
      .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    // ****************** links section ***************************

    // Update the links...
    var link = svg.selectAll('path.link')
      .data(links, function (d) {
        return d.id;
      });
    console.log(link);

    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function (d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal(o, o);
      });

    // UPDATE
    var linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate.transition()

      .duration(duration)
      .attr('d', function (d) {
        return diagonal(d, d.parent)
      });

    // Remove any exiting links
    var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function (d) {
        var o = {x: source.x, y: source.y};
        return diagonal(o, o)
      })
      .remove();

    // Store the old positions for transition.
    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {

      path = `M ${s.x} ${s.y}
            C ${(s.x + d.x) / 2} ${s.y},
              ${(s.x + d.x) / 2} ${d.y},
              ${d.x} ${d.y}`;

      return path;
    }

    // Toggle children on click.
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d, name);
    }

  }
}






/***********************************************/



d3.json("../static/json/agecontentpatientproduct_tree.json").then(function(data) {
  generate(data, "#chart1");
});

d3.json("../static/json/channelproduct_A_share_tree.json").then(function(data) {
  generate(data, "#chart2");
});

d3.json("../static/json/age-channel_content_tree.json").then(function(data) {
  generate(data, "#chart3");
});

d3.json("../static/json/contentgender_countryofbirthtree.json").then(function(data) {
  generate(data, "#chart4");
});

d3.json("../static/json/channel-datetimegender_tree.json").then(function(data) {
  generate(data, "#chart5");
});

d3.json("../static/json/agepatient-countschool-___tree.json").then(function(data) {
  generate(data, "#chart6");
});

d3.json("../static/json/contentgender_tree.json").then(function(data) {
  generate(data, "#chart7");
});



