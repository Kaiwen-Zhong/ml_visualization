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
        return d.children || d._children ? d.data.label : "";
      }).
    style("fill-opacity", 1);

    if(name === '#chart6'){
      nodeEnter.append('title')
        .text(function (d) {
          if(d.data.Condition_school != "NA"){
            return d.data.Condition_school;
          }
        })
    }


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
          return r_scale(d.data.sample_count);
        }
      })
      .style("stroke", function(d){
        if(d.data.type === 'split') {
          return '#000';
        }
        else if(d.data.sample_count < 60 & d.data.type === 'leaf')
          return '#76C04D';
        else
        //return '#8A93A2';
          return '#EA3323';
        //return '#000080';


      })
      .style("fill", function (d) {
        if(d.data.type === 'split') {
          return '#fff';
        }
        else if(d.data.sample_count < 60 & d.data.type === 'leaf')
          return '#76C04D';
        else
        //return '#8A93A2';
          return '#EA3323';
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
var age_day_tree = {
  "label": "age <= 29.5", "condition": "29.50", "type": "split", "leaf_num": "100", "sample_count": "0",
  "children": [
    {
      "label": "day <= Thursday", "condition": "4.50", "type": "split", "leaf_num": "100", "sample_count": "0",
      "children": [
        {
          "label": "day <= Tuesday", "condition": "2.50", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "age <= 27.5", "condition": "27.50", "type": "split", "leaf_num": "100", "sample_count": "0",
              "children": [
                {
                  "label": "Leaf - 4", "condition": 0, "type": "leaf", "leaf_num": "4", "sample_count": "56"}, {
                  "label": "Leaf - 5", "condition": 0, "type": "leaf", "leaf_num": "5", "sample_count": "33"}]}, {
              "label": "age <= 27.5", "condition": "27.50", "type": "split", "leaf_num": "100", "sample_count": "0",
              "children": [
                {
                  "label": "Leaf - 7", "condition": 0, "type": "leaf", "leaf_num": "7", "sample_count": "48"}, {
                  "label": "Leaf - 8", "condition": 0, "type": "leaf", "leaf_num": "8", "sample_count": "39"}]}]}, {
          "label": "age <= 25.0", "condition": "25.00", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "Leaf - 10", "condition": 0, "type": "leaf", "leaf_num": "10", "sample_count": "107"}, {
              "label": "age <= 27.5", "condition": "27.50", "type": "split", "leaf_num": "100", "sample_count": "0",
              "children": [
                {
                  "label": "Leaf - 12", "condition": 0, "type": "leaf", "leaf_num": "12", "sample_count": "36"}, {
                  "label": "Leaf - 13", "condition": 0, "type": "leaf", "leaf_num": "13", "sample_count": "103"}]}]}]}, {
      "label": "age <= 43.5", "condition": "43.50", "type": "split", "leaf_num": "100", "sample_count": "0",
      "children": [
        {
          "label": "day <= Thursday", "condition": "4.50", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "age <= 40.0", "condition": "40.00", "type": "split", "leaf_num": "100", "sample_count": "0",
              "children": [
                {
                  "label": "Leaf - 17", "condition": 0, "type": "leaf", "leaf_num": "17", "sample_count": "367"}, {
                  "label": "Leaf - 18", "condition": 0, "type": "leaf", "leaf_num": "18", "sample_count": "140"}]}, {
              "label": "age <= 35.5", "condition": "35.50", "type": "split", "leaf_num": "100", "sample_count": "0",
              "children": [
                {
                  "label": "Leaf - 20", "condition": 0, "type": "leaf", "leaf_num": "20", "sample_count": "56"}, {
                  "label": "Leaf - 21", "condition": 0, "type": "leaf", "leaf_num": "21", "sample_count": "102"}]}]}, {
          "label": "day <= Monday", "condition": "1.50", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "age <= 54.0", "condition": "54.00", "type": "split", "leaf_num": "100", "sample_count": "0",
              "children": [
                {
                  "label": "Leaf - 24", "condition": 0, "type": "leaf", "leaf_num": "24", "sample_count": "86"}, {
                  "label": "Leaf - 25", "condition": 0, "type": "leaf", "leaf_num": "25", "sample_count": "38"}]}, {
              "label": "age <= 44.5", "condition": "44.50", "type": "split", "leaf_num": "100", "sample_count": "0",
              "children": [
                {
                  "label": "Leaf - 27", "condition": 0, "type": "leaf", "leaf_num": "27", "sample_count": "50"}, {
                  "label": "Leaf - 28", "condition": 0, "type": "leaf", "leaf_num": "28", "sample_count": "615"}]}]}]}]};



generate(age_day_tree, "#chart1");

var gradyear_week_tree = {
  "label": "week <= 3", "condition": "3.50", "type": "split", "leaf_num": "100", "sample_count": "0",
  "children": [
    {
      "label": "grad_year <= 2014", "condition": "2014.50", "type": "split", "leaf_num": "100", "sample_count": "0",
      "children": [
        {
          "label": "grad_year <= 2003", "condition": "2003.00", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "Leaf - 3", "condition": 0, "type": "leaf", "leaf_num": "3", "sample_count": "342"}, {
              "label": "Leaf - 4", "condition": 0, "type": "leaf", "leaf_num": "4", "sample_count": "687"}]}, {
          "label": "week <= 1", "condition": "1.50", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "Leaf - 6", "condition": 0, "type": "leaf", "leaf_num": "6", "sample_count": "42"}, {
              "label": "Leaf - 7", "condition": 0, "type": "leaf", "leaf_num": "7", "sample_count": "60"}]}]}, {
      "label": "grad_year <= 2013", "condition": "2013.00", "type": "split", "leaf_num": "100", "sample_count": "0",
      "children": [
        {
          "label": "grad_year <= 2011", "condition": "2011.50", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "Leaf - 10", "condition": 0, "type": "leaf", "leaf_num": "10", "sample_count": "309"}, {
              "label": "Leaf - 11", "condition": 0, "type": "leaf", "leaf_num": "11", "sample_count": "37"}]}, {
          "label": "grad_year <= 2014", "condition": "2014.50", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "Leaf - 13", "condition": 0, "type": "leaf", "leaf_num": "13", "sample_count": "19"}, {
              "label": "Leaf - 14", "condition": 0, "type": "leaf", "leaf_num": "14", "sample_count": "40"}]}]}]};


generate(gradyear_week_tree, "#chart2");

var age_channel_tree = {
  "label": "channel = Email", "condition": "0.50", "type": "split", "leaf_num": "100", "sample_count": "0",
  "children": [
    {
      "label": "age <= 43.5", "condition": "43.50", "type": "split", "leaf_num": "100", "sample_count": "0",
      "children": [
        {
          "label": "age <= 41.5", "condition": "41.50", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "Leaf - 3", "condition": 0, "type": "leaf", "leaf_num": "3", "sample_count": "396"}, {
              "label": "Leaf - 4", "condition": 0, "type": "leaf", "leaf_num": "4", "sample_count": "88"}]}, {
          "label": "age <= 45.5", "condition": "45.50", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "Leaf - 6", "condition": 0, "type": "leaf", "leaf_num": "6", "sample_count": "44"}, {
              "label": "Leaf - 7", "condition": 0, "type": "leaf", "leaf_num": "7", "sample_count": "418"}]}]}, {
      "label": "age <= 27.5", "condition": "27.50", "type": "split", "leaf_num": "100", "sample_count": "0",
      "children": [
        {
          "label": "channel = Email/Direct Mail", "condition": "1.50", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "Leaf - 10", "condition": 0, "type": "leaf", "leaf_num": "10", "sample_count": "58"}, {
              "label": "Leaf - 11", "condition": 0, "type": "leaf", "leaf_num": "11", "sample_count": "33"}]}, {
          "label": "channel = Email/Direct Mail", "condition": "1.50", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "Leaf - 13", "condition": 0, "type": "leaf", "leaf_num": "13", "sample_count": "109"}, {
              "label": "Leaf - 14", "condition": 0, "type": "leaf", "leaf_num": "14", "sample_count": "440"}]}]}]};

generate(age_channel_tree, "#chart3");

var timesent_content_tree = {
  "label": "Time of Promotion = Morning", "condition": "0.50", "type": "split", "leaf_num": "100", "sample_count": "0",
  "children": [
    {
      "label": "Content = Safety", "condition": "0.50", "type": "split", "leaf_num": "100", "sample_count": "0",
      "children": [
        {
          "label": "Leaf - 2", "condition": 0, "type": "leaf", "leaf_num": "2", "sample_count": "25"}, {
          "label": "Content = Safety/New Indication", "condition": "1.50", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "Leaf - 4", "condition": 0, "type": "leaf", "leaf_num": "4", "sample_count": "36"}, {
              "label": "Leaf - 5", "condition": 0, "type": "leaf", "leaf_num": "5", "sample_count": "253"}]}]}, {
      "label": "Content = Safety/New Indication/Efficacy", "condition": "2.50", "type": "split", "leaf_num": "100", "sample_count": "0",
      "children": [
        {
          "label": "Content = Safety", "condition": "0.50", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "Leaf - 8", "condition": 0, "type": "leaf", "leaf_num": "8", "sample_count": "269"}, {
              "label": "Leaf - 9", "condition": 0, "type": "leaf", "leaf_num": "9", "sample_count": "520"}]}, {
          "label": "Time of Promotion = Morning/Afternoon", "condition": "1.50", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "Leaf - 11", "condition": 0, "type": "leaf", "leaf_num": "11", "sample_count": "58"}, {
              "label": "Leaf - 12", "condition": 0, "type": "leaf", "leaf_num": "12", "sample_count": "55"}]}]}]}

generate(timesent_content_tree, "#chart4");

var popularity_Day_tree = {
  "label": "Popularity = Low", "condition": "0.50", "type": "split", "leaf_num": "100", "sample_count": "0",
  "children": [
    {
      "label": "Day <= Monday", "condition": "1.50", "type": "split", "leaf_num": "100", "sample_count": "0",
      "children": [
        {
          "label": "Leaf - 2", "condition": 0, "type": "leaf", "leaf_num": "2", "sample_count": "33"}, {
          "label": "Day <= Thursday", "condition": "4.50", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "Leaf - 4", "condition": 0, "type": "leaf", "leaf_num": "4", "sample_count": "190"}, {
              "label": "Leaf - 5", "condition": 0, "type": "leaf", "leaf_num": "5", "sample_count": "45"}]}]}, {
      "label": "Day <= Thursday", "condition": "4.50", "type": "split", "leaf_num": "100", "sample_count": "0",
      "children": [
        {
          "label": "Day <= Monday", "condition": "1.50", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "Leaf - 8", "condition": 0, "type": "leaf", "leaf_num": "8", "sample_count": "206"}, {
              "label": "Leaf - 9", "condition": 0, "type": "leaf", "leaf_num": "9", "sample_count": "846"}]}, {
          "label": "Popularity = Low/Medium", "condition": "1.50", "type": "split", "leaf_num": "100", "sample_count": "0",
          "children": [
            {
              "label": "Leaf - 11", "condition": 0, "type": "leaf", "leaf_num": "11", "sample_count": "59"}, {
              "label": "Leaf - 12", "condition": 0, "type": "leaf", "leaf_num": "12", "sample_count": "177"}]}]}]};

generate(popularity_Day_tree, "#chart5");

var school_channel_tree = {
  "label": "Channel = Email", "condition": "0.50", "type": "split", "leaf_num": "100", "sample_count": "0", "Condition_school": "Channel = ", "node": "0",
  "children": [
    {
      "label": "School = Hover to view Condition", "condition": "24.50", "type": "split", "leaf_num": "100", "sample_count": "0", "Condition_school": "School = /Stanford/Rutgers/NYU/UCLA/Purdue/Johns Hopkins/Columbia/Harvard/NYU Langone/UCSF/University of Alabama/RWJ University/UCB/UCSD/University of Texas at Dallas/Dell Medical School/USF/Georgetown University/Medical College of Georgia/University of Washington/University of Rochester/Syracuse/Drexel University/UR/UB", "node": "1",
      "children": [
        {
          "label": "School = Hover to view Condition", "condition": "17.50", "type": "split", "leaf_num": "100", "sample_count": "0", "Condition_school": "School = /Stanford/Rutgers/NYU/UCLA/Purdue/Johns Hopkins/Columbia/Harvard/NYU Langone/UCSF/University of Alabama/RWJ University/UCB/UCSD/University of Texas at Dallas/Dell Medical School/USF/Georgetown University", "node": "2",
          "children": [
            {
              "label": "Leaf - 3", "condition": 0, "type": "leaf", "leaf_num": "3", "sample_count": "825", "Condition_school": "NA", "node": "3"}, {
              "label": "Leaf - 4", "condition": 0, "type": "leaf", "leaf_num": "4", "sample_count": "59", "Condition_school": "NA", "node": "4"}]}, {
          "label": "Leaf - 5", "condition": 0, "type": "leaf", "leaf_num": "5", "sample_count": "99", "Condition_school": "NA", "node": "5"}]}, {
      "label": "Channel = Email/Direct Mail", "condition": "1.50", "type": "split", "leaf_num": "100", "sample_count": "0", "Condition_school": "Channel = ", "node": "6",
      "children": [
        {
          "label": "School = Hover to view Condition", "condition": "23.50", "type": "split", "leaf_num": "100", "sample_count": "0", "Condition_school": "School = /Stanford/Rutgers/NYU/UCLA/Purdue/Johns Hopkins/Columbia/Harvard/NYU Langone/UCSF/University of Alabama/RWJ University/UCB/UCSD/University of Texas at Dallas/Dell Medical School/USF/Georgetown University/Medical College of Georgia/University of Washington/University of Rochester/Syracuse/Drexel University/UR", "node": "7",
          "children": [
            {
              "label": "Leaf - 8", "condition": 0, "type": "leaf", "leaf_num": "8", "sample_count": "188", "Condition_school": "NA", "node": "8"}, {
              "label": "Leaf - 9", "condition": 0, "type": "leaf", "leaf_num": "9", "sample_count": "46", "Condition_school": "NA", "node": "9"}]}, {
          "label": "School = Hover to view Condition", "condition": "14.50", "type": "split", "leaf_num": "100", "sample_count": "0", "Condition_school": "School = /Stanford/Rutgers/NYU/UCLA/Purdue/Johns Hopkins/Columbia/Harvard/NYU Langone/UCSF/University of Alabama/RWJ University/UCB/UCSD/University of Texas at Dallas", "node": "10",
          "children": [
            {
              "label": "Leaf - 11", "condition": 0, "type": "leaf", "leaf_num": "11", "sample_count": "418", "Condition_school": "NA", "node": "11"}, {
              "label": "Leaf - 12", "condition": 0, "type": "leaf", "leaf_num": "12", "sample_count": "15", "Condition_school": "NA", "node": "12"}]}]}]};


generate(school_channel_tree, "#chart6");

var channel_content_tree = {
  "label": "Channel = Email", "condition": "0.50", "type": "split", "leaf_num": "100", "sample_count": "0", "node": "0",
  "children": [
    {
      "label": "Content = Safety", "condition": "0.50", "type": "split", "leaf_num": "100", "sample_count": "0", "node": "1",
      "children": [
        {
          "label": "Leaf - 2", "condition": 0, "type": "leaf", "leaf_num": "2", "sample_count": "301", "node": "2"}, {
          "label": "Content = Safety/New Indication/Efficacy", "condition": "2.50", "type": "split", "leaf_num": "100", "sample_count": "0", "node": "3",
          "children": [
            {
              "label": "Leaf - 4", "condition": 0, "type": "leaf", "leaf_num": "4", "sample_count": "557", "node": "4"}, {
              "label": "Leaf - 5", "condition": 0, "type": "leaf", "leaf_num": "5", "sample_count": "59", "node": "5"}]}]}, {
      "label": "Content = Safety/New Indication/Efficacy", "condition": "2.50", "type": "split", "leaf_num": "100", "sample_count": "0", "node": "6",
      "children": [
        {
          "label": "Content = Safety/New Indication", "condition": "1.50", "type": "split", "leaf_num": "100", "sample_count": "0", "node": "7",
          "children": [
            {
              "label": "Leaf - 8", "condition": 0, "type": "leaf", "leaf_num": "8", "sample_count": "375", "node": "8"}, {
              "label": "Leaf - 9", "condition": 0, "type": "leaf", "leaf_num": "9", "sample_count": "179", "node": "9"}]}, {
          "label": "Channel = Email/Direct Mail", "condition": "1.50", "type": "split", "leaf_num": "100", "sample_count": "0", "node": "10",
          "children": [
            {
              "label": "Leaf - 11", "condition": 0, "type": "leaf", "leaf_num": "11", "sample_count": "46", "node": "11"}, {
              "label": "Leaf - 12", "condition": 0, "type": "leaf", "leaf_num": "12", "sample_count": "98", "node": "12"}]}]}]};



generate(channel_content_tree, "#chart7");




