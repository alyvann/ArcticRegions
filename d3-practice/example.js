if (!/iPad|iPod|iPhone/.test(navigator.userAgent)) defer(function() {
  
  var width,
      height,
      nativeHeight = 1000,
      scale,
      y0,
      y1;
  
  var y = d3.scale.linear()
      .range([0, .045, .08, .09,.143,.155,.19,.45,.54, .63, .73,.975,  1]);

  var y2 = d3.scale.linear()
      .range([0, .05,  .09, .095,.17, .202,.23, .48, .555,  .63, .74,.975, 1]);
  
  
  var resizeTimeout,
      render1 = function() {};
      render2 = function() {};
  
  var path1 = d3.geo.path()
      .projection(d3.geo.transform({point: function(x, y) { this.stream.point(x * scale, y * scale);
           }}));
           
  var path2 = d3.geo.path()
      .projection(d3.geo.transform({point: function(x, y) { this.stream.point(x * scale, y * scale);
           }}));
  
  var section = d3.select(".map-top");
  
  var svg = section.append("svg");
  var g = svg.append("g");
  var h = svg.append("g");

  var marker = d3.selectAll([]);
  var article = d3.select(".article");
  
  
  d3.select(window)
      .on("resize.map-top", resized)
      .on("load.map-top", resized)
      .call(resized);
  
  function resized() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(afterresized, 10);
  }
  
  function afterresized() {
    width = document.body.clientWidth;
    height = document.body.clientWidth;
    scale = document.body.clientWidth/1000;
    y0 = article.node().offsetTop;
    y1 = y0 + article.node().offsetHeight - innerHeight;
  
    svg.attr("width", width)
      .attr("height", height*.233);
  
    g.attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
    
    h.attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

    y
        .domain(marker
          .each(function(d) { d.properties.position = this.offsetTop; })
          .data().map(function(d) { return d.properties.position; }));
          
    y2
        .domain(marker
          .each(function(d) { d.properties.position = this.offsetTop; })
          .data().map(function(d) { return d.properties.position; }));
  
    render1();
    render2();
  }
  
  d3.json("http://web.stanford.edu/group/spatialhistory/CRRW/assets/cpr_rotated_shorter.json", function(error, topo) {
    var road = topojson.feature(topo, topo.objects.road),
        roadLength = length(road.geometry.coordinates),
        cities = topojson.feature(topo, topo.objects.cities).features;
        
    marker = d3.selectAll(".map-marker")
        .data(cities, function(d) { return d ? d.properties.name : this.getAttribute("data-key"); })
        .each(function(d, i) { d.properties.position = this.offsetTop; d.properties.top = y.range()[i]; });
  
    y.domain(cities.map(function(d) { return d.properties.position; }));
  
    g.append("path")
        .datum(road)
        .attr("class", "map-road");
  
    var feature = g.append("path")
        .datum(road)
        .attr("class", "map-road map-road--story");
  
    var label = g.append("g")
        .attr("class", "map-label map-label--road")
      .selectAll("g")
        .data(cities)
      .enter().append("g")
        .on("click", clicked1);
  
    label.append("circle")
        .attr("r", 4);
  
    render1 = function() {
      g.selectAll("path").attr("d", path1);
      label.attr("transform", function(d) { d = d.geometry.coordinates; return "translate(" + d[0] * scale + "," + d[1] * scale + ")"; });
      scrolled1();

    };
  
    d3.select(window)
        .on("scroll.map-top", scrolled1)
        .call(render1);
  
    function scrolled1() {
      var top = y(pageYOffset+width/4), maxTop = 0;
  
      section
          .style("top", pageYOffset > y1 ? y1 - pageYOffset + "px" : pageYOffset < y0 ? y0 - pageYOffset + "px" : null);
  
      feature
          .style("stroke-dasharray", top * roadLength * scale + "," + roadLength * scale);
  
      label
          .classed("map-label--visited", function(d) { var t = d.properties.top; if (t < top) { if (t > maxTop) maxTop = t; return true; }})
          .classed("map-label--visiting", function(d) { return d.properties.top === maxTop; });
    }
  
    function clicked1(d, i) {
      d3.transition()
          .duration(750)
          .tween("scroll", function() {
            var offset = d3.interpolateNumber(pageYOffset, d.properties.position + (i ? 40 : 0));
            return function(t) { scrollTo(0, -width/4.5+offset(t)); };
          });
    }
  });
  
  
    d3.json("http://web.stanford.edu/group/spatialhistory/CRRW/assets/profile_rotated_shorter.json", function(error, topo) {
    var road = topojson.feature(topo, topo.objects.road),
        roadLength = length(road.geometry.coordinates),
        cities = topojson.feature(topo, topo.objects.cities).features;
        
  
    marker2 = d3.selectAll(".map-marker")
        .data(cities, function(d) { return d ? d.properties.name : this.getAttribute("data-key"); })
        .each(function(d, i) { d.properties.position = this.offsetTop; d.properties.top = y2.range()[i]; });
  
    y.domain(cities.map(function(d) { return d.properties.position; }));
  
    h.append("path")
        .datum(road)
        .attr("class", "map-road2");
  
    var feature2 = h.append("path")
        .datum(road)
        .attr("class", "map-road map-road--story2");
  
    var label2 = h.append("g")
        .attr("class", "map-label map-label--road2")
        .selectAll("g")
        .data(cities)
        .enter().append("g")
        .on("click", clicked2);
  
    label2.append("circle")
        .attr("r", 4);
  
    render2 = function() {
      h.selectAll("path").attr("d", path2);
      label2.attr("transform", function(d) { d = d.geometry.coordinates; return "translate(" + d[0] * scale + "," + d[1] * scale + ")"; });
      scrolled2();
    };
  
    d3.select(window)
        .on("scroll.section", scrolled2)
        .call(render2);
  
    function scrolled2() {
      var top = y2(pageYOffset+width/4), maxTop = 0;
  
      section.style("top", pageYOffset > y1 ? y1 - pageYOffset + "px" : pageYOffset < y0 ? y0 - pageYOffset + "px" : null);

      feature2.style("stroke-dasharray", top * roadLength * scale + "," + roadLength * scale);
  
      label2
          .classed("map-label--visited", function(d) { var t = d.properties.top; if (t < top) { if (t > maxTop) maxTop = t; return true; }})
          .classed("map-label--visiting", function(d) { return d.properties.top === maxTop; });
    }
  
    function clicked2(d, i) {
      d3.transition()
          .duration(750)
          .tween("scroll", function() {
            var offset = d3.interpolateNumber(pageYOffset, d.properties.position + (i ? 40 : 0));
            return function(t) { scrollTo(0, -width/4.5+offset(t)); };
          });
    }
  });
  
  
  function length(line) {
    var i = 0,
        n = line.length,
        p0,
        p1 = line[0],
        length = 0,
        dx,
        dy;
  
    while (++i < n) {
      p0 = p1;
      p1 = line[i];
      dx = p1[0] - p0[0];
      dy = p1[1] - p0[1];
      length += Math.sqrt(dx * dx + dy * dy);
    }
  
    return length;
  }
  
  });
  