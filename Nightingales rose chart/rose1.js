var dataArrObj = [{
    coords: [0, 1 / 6],
    date: "Apr 1854",
    army_size: "8571",
    d_disease: "1",
    d_wounds: "0",
    d_other: "5",
    disease: "1.4",
    wounds: "0",
    other: "7"
}, {
    coords: [1 / 6, 1 / 3],
    date: "May 1854",
    army_size: "23333",
    d_disease: "12",
    d_wounds: "0",
    d_other: "9",
    disease: "6.2",
    wounds: "0",
    other: "4.6"
}, {
    coords: [1 / 3, 1 / 2],
    date: "Jun 1854",
    army_size: "28333",
    d_disease: "11",
    d_wounds: "0",
    d_other: "6",
    disease: "4.7",
    wounds: "0",
    other: "2.5"
}, {
    coords: [1 / 2, 2 / 3],
    date: "Jul 1854",
    army_size: "28722",
    d_disease: "359",
    d_wounds: "0",
    d_other: "23",
    disease: "150",
    wounds: "0",
    other: "9.6"
}, {
    coords: [2 / 3, 5 / 6],
    date: "Aug 1854",
    army_size: "30246",
    d_disease: "828",
    d_wounds: "1",
    d_other: "30",
    disease: "328.5",
    wounds: "0.4",
    other: "11.9"
}, {
    coords: [5 / 6, 1],
    date: "Sep 1854",
    army_size: "30290",
    d_disease: "788",
    d_wounds: "81",
    d_other: "70",
    disease: "312.2",
    wounds: "32.1",
    other: "27.7"
}, {
    coords: [1, 7 / 6],
    date: "Oct 1854",
    army_size: "30643",
    d_disease: "503",
    d_wounds: "132",
    d_other: "128",
    disease: "197",
    wounds: "51.7",
    other: "50.1"
}, {
    coords: [7 / 6, 4 / 3],
    date: "Nov 1854",
    army_size: "29736",
    d_disease: "844",
    d_wounds: "287",
    d_other: "106",
    disease: "340.6",
    wounds: "115.8",
    other: "42.8"
}, {
    coords: [4 / 3, 3 / 2],
    date: "Dec 1854",
    army_size: "32779",
    d_disease: "1725",
    d_wounds: "114",
    d_other: "131",
    disease: "631.5",
    wounds: "41.7",
    other: "48"
}, {
    coords: [3 / 2, 5 / 3],
    date: "Jan 1855",
    army_size: "32393",
    d_disease: "2761",
    d_wounds: "83",
    d_other: "324",
    disease: "1022.8",
    wounds: "30.7",
    other: "120"
}, {
    coords: [5 / 3, 11 / 6],
    date: "Feb 1855",
    army_size: "30919",
    d_disease: "2120",
    d_wounds: "42",
    d_other: "361",
    disease: "822.8",
    wounds: "16.3",
    other: "140.1"
}, {
    coords: [11 / 6, 2],
    date: "Mar 1855",
    army_size: "30107",
    d_disease: "1205",
    d_wounds: "32",
    d_other: "172",
    disease: "480.3",
    wounds: "12.8",
    other: "68.6"
}];
var diseaseArr = [];
var woundsArr = [];
var othersArr = [];
var margin = {
        top: -5,
        right: -5,
        bottom: -5,
        left: -5
    },
    width = 460 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

for (var i = 0; i < dataArrObj.length; i++) {
    diseaseArr.push(dataArrObj[i].disease);
    woundsArr.push(dataArrObj[i].wounds);
    othersArr.push(dataArrObj[i].other);
}
var minD = Math.min(...diseaseArr);
var maxD = Math.max(...diseaseArr);
var minW = Math.min(...woundsArr);
var maxW = Math.max(...woundsArr);
var minO = Math.min(...othersArr);
var maxO = Math.max(...diseaseArr);
var dScale = d3
    .scaleLinear()
    .domain([minD, maxD])
    .range([0, 200]);
var wScale = d3
    .scaleLinear()
    .domain([minW, maxW])
    .range([0, 200]);
var oScale = d3
    .scaleLinear()
    .domain([minO, maxO])
    .range([0, 200]);
var container = d3
    .select("div#container")
    .append("section")
    .attr("class", "vis")
    .append("div");

var legendData = [{
    label: "disease",
    color: "#67b7dc"
}, {
    label: "wounds",
    color: "#6771dc"
}, {
    label: "others",
    color: "#dc6789"
}];

var svgContainer = container
    .append("svg")
    .attr("width", "1000")
    .attr("height", "1000");

//ghost arc: start
var groupContainer = svgContainer.append("g")
    .attr("transform", "translate(50,300)");
var roseChart = groupContainer
    .append("g")
    .attr("transform", "translate(400,300)");
var arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(function(d) {
        return 400;
    })
    .startAngle(function(d) {
        return Math.PI * d.coords[0];
    })
    .endAngle(function(d) {
        return Math.PI * d.coords[1];
    }); //just radians

var arcs = roseChart
    .selectAll("path")
    .data(dataArrObj)
    .enter()
    .append("path")
    .attr("id", function(d, i) {
        return "label-path-second" + i;
    })
    .attr("d", arc)
    // .attr("fill-opacity", "0.5")
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-dasharray", "5,5")
    .attr("stroke-width", 0.1);

arcs.append("svg:title").text(function(d) {
    return "Disease Deaths : " + d.d_disease;
});

roseChart
    .selectAll(".label")
    .data(dataArrObj)
    .enter()
    .append("svg:text")
    .attr("dy", -20)
    .attr("dx", 20)
    .attr("class", "label")
    .style("font-size", "10px")
    .append("textPath")
    .attr("xlink:href", function(d, i) {
        return "#label-path-second" + i;
    })
    .text(function(d) {
        return d.date;
    })
    .style("fill", "white");
//ghost arc: end


//wound arc:start
var drawArcfunction = function(type, color) {

        roseChart = groupContainer
            .append("g")
            .attr("id", "group-wound")
            .attr("transform", "translate(400,300)");

        arc = d3
            .arc()
            .innerRadius(0)
            .outerRadius(function(d) {
                return (type == "wounds" ? d.wounds : (type == "disease" ? d.disease : d.other)) / 3;
            })
            .startAngle(function(d, i) {
                return Math.PI / 6 * i;
            })
            .endAngle(function(d, i) {
                return Math.PI / 6 * (i + 1);
            }); //just radians

        arcs = roseChart
            .selectAll("path")
            .data(dataArrObj)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", color)
            .attr("stroke", "blue")
            .attr("stroke-width", 0.8);

        arcs.append("svg:title").text(function(d) {
            return "Wounds Deaths : " + (type == "wounds" ? d.d_wounds : (type == "disease" ? d.d_disease : d.d_other));
        });
    }
    //wound arc:end



legendData.forEach(element => {
    drawArcfunction(element.label, element.color);
});



// var legendRectSize = 15;
// var legendSpacing = 4;
// legendGroup = svgContainer
//     .append("g")
//     .attr("class", "legend-group")
//     .attr("transform", "translate(50,30)")
//     .style("font-size", "12px");

// var legend = legendGroup
//     .selectAll(".legend")
//     .data(legendData)
//     .enter()
//     .append("g")
//     .attr("class", "legend")
//     .attr("transform", function(d, i) {
//         var height = legendRectSize + legendSpacing;
//         var offset = (height * 5) / 4;
//         var horz = -2 * legendRectSize;
//         var vert = i * height - offset;
//         return "translate(" + horz + "," + vert + ")";
//     })

// legend
//     .append("rect")
//     .attr("width", legendRectSize)
//     .attr("height", legendRectSize)
//     .style("fill", function(d) {
//         return d.color;
//     })
//     .style("stroke", function(d) {
//         return d.color;
//     });

// legend
//     .append("text")
//     .attr("x", legendRectSize + legendSpacing)
//     .attr("y", legendRectSize - legendSpacing)
//     .style("fill", "white")
//     .text(function(d) {
//         return d.label;
//     });