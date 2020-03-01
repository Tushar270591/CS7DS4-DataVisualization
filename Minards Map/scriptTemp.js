var temp = [{
        "LONT": "37.6",
        "TEMP": "0",
        "DAYS": "6",
        "MON": "Oct",
        "DAY": "18"
    },
    {
        "LONT": "36",
        "TEMP": "0",
        "DAYS": "6",
        "MON": "Oct",
        "DAY": "24"
    },
    {
        "LONT": "33.2",
        "TEMP": "-9",
        "DAYS": "16",
        "MON": "Nov",
        "DAY": "9"
    },
    {
        "LONT": "32",
        "TEMP": "-21",
        "DAYS": "5",
        "MON": "Nov",
        "DAY": "14"
    },
    {
        "LONT": "29.2",
        "TEMP": "-11",
        "DAYS": "10"
    },
    {
        "LONT": "28.5",
        "TEMP": "-20",
        "DAYS": "4",
        "MON": "Nov",
        "DAY": "28"
    },
    {
        "LONT": "27.2",
        "TEMP": "-24",
        "DAYS": "3",
        "MON": "Dec",
        "DAY": "1"
    },
    {
        "LONT": "26.7",
        "TEMP": "-30",
        "DAYS": "5",
        "MON": "Dec",
        "DAY": "6"
    },
    {
        "LONT": "25.3",
        "TEMP": "-26",
        "DAYS": "1",
        "MON": "Dec",
        "DAY": "7"
    }
]


var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 1600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,
    xtemp, ytemp;

// append the svg object to the body of the page
var svg = d3.select("#temp")
    .append("svg")
    .attr("width", width + margin.left + margin.right + 50)
    .attr("height", height + margin.top + margin.bottom + 20)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

lineData = temp.map(function(point, index, arr) {
    return {
        LONT: parseFloat(point.LONT),
        TEMP: parseFloat(point.TEMP),
    };
});


var scaleArmySize = d3.scaleLinear()
    .domain([d3.min(lineData, function(d) { return d.SURV; }), d3.max(lineData, function(d) { return d.SURV; })])
    // .domain([22, 38])
    .range([1, 30]);

function renderAxis(data) {
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 20)
        .text("Longitude");

    // Y axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", width + margin.right + 20)
        .attr("x", -margin.top)
        .text("Temperature")

    xtemp = d3.scaleLinear()
        .domain([d3.min(data, function(d) { return d.LONT; }) - 2, d3.max(data, function(d) { return d.LONT; })])
        // .domain([22, 38])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    ytemp = d3.scaleLinear()
        .domain([d3.min(data, function(d) { return +d.TEMP; }) - 0.5, d3.max(data, function(d) { return +d.TEMP; })])
        // .domain([53, 56])
        .range([height, 0]);
    svg.append("g")
        .attr("transform", "translate(" + width + ",0)")
        .call(d3.axisRight(ytemp).ticks(5));
}
renderAxis(lineData)

function renderLines(data, temp) {

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)
        .attr("d", d3.line()
            .x(function(d) { return xtemp(d.LONT) })
            .y(function(d) { return ytemp(d.TEMP) })
        )

};

renderLines(lineData, "temp");