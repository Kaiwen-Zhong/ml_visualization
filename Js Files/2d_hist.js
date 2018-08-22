

d3.csv("data_viz_full_new.csv").then(function(data) {
  var dat = [];
  for(var i = 0; i < data.length; i++){

    dat.push([+data[i].national_provider_identifier,
      +data[i].channel,
      +data[i].content,
      +data[i].response]);
  }
  generate(dat);

});






function generate(data){

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

  var item = [1, 2, 3];

  var result = groupBy(data, function(item)
  {
    return [item[1], item[2], item[3]];
  });

  var data_refined = [];

  for(var i = 0; i < result.length; i++){

    data_refined.push([result[i][0][1], result[i][0][2], result[i][0][3], result[i].length]);

  };

  var data_refined_response = [];

  for(var j = 0; j < data_refined.length; j++) {
    var temp = data_refined[j];
    var temp_comp = temp[2];
    if (temp_comp === 1)
      data_refined_response.push(data_refined[j]);
  }

  item = [1, 2];

  result = groupBy(data, function(item)
  {
    return [item[1], item[2]];
  });


  var data_refined_all = [];

  for(var k = 0; k < result.length; k++){

    data_refined_all.push([result[k][0][1], result[k][0][2], result[k][0][3], result[k].length]);

  };
  var label = ['Email', 'Direct Mail', 'Rep Call'];



  var chart_width     =   900;
  var chart_height    =   500;
  var padding         =   50;



// Create SVG Element
  var svg             =   d3.select( '#histogram' )
    .append( 'svg' )
    .attr( 'width', chart_width )
    .attr( 'height', chart_height );


  var x_scale = d3.scaleLinear()
    .domain([d3.min(data_refined_all, function(d){
      return d[0];
    })
      , d3.max(data_refined_all, function(d){
        return d[0];
      })])
    .range([padding * 2, chart_width - padding * 10]);

  var y_scale = d3.scaleLinear()
    .domain([d3.min(data_refined_all, function(d){
      return d[1];
    })
      , d3.max(data_refined_all, function(d){
        return d[1];
      })])
    .range([chart_height - padding * 3, padding * 3]);



  var r_scale         =   d3.scaleLinear()
    .domain([d3.min(data_refined_all, function(d){
      return d[3];
      })
      , d3.max(data_refined_all, function(d){
      return d[3];
    })])
    .range([15, 30]);

  var x_axis          =   d3.axisBottom(x_scale).ticks(3);

  svg.append( 'g' )
    .attr( 'class', 'x-axis' )
    .attr(
      'transform',
      'translate(0,' + (chart_height - 125) + ')'
    )
    .call( x_axis );




  var y_axis          =   d3.axisLeft( y_scale )
    .ticks( 5 );

  svg.append( 'g' )
    .attr( 'class', 'y-axis' )
    .attr(
      'transform',
      'translate( ' + 65 + ', 0 )'
    )
    .call( y_axis );

  svg.
  selectAll('circle').

  data(data_refined_all).

  enter().
  append('circle').
  transition().
  duration(500)
    .attr("cx", function(d) {
      return x_scale(d[0]);
    })
    .attr("cy", function(d) {
      return chart_height - y_scale(d[1]);
    })
    .attr("r", function(d){
      return r_scale(d[3]);

  }).
  attr("fill", '#A9A9A9')
  .
  style('fill-opacity', 0.2);

  svg.
  selectAll('circle_response').

  data(data_refined_response).

  enter().
  append('circle').
  transition().
  duration(1000)
    .attr("cx", function(d) {
      return x_scale(d[0]);
    })
    .attr("cy", function(d) {
      return chart_height - y_scale(d[1]);
    })
    .attr("r", function(d){
      return r_scale(d[3]);

    }).
  attr("fill", '#76C04D')
    .
    style('fill-opacity', 0.8)
  ;






};
