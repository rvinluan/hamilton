//from: http://stackoverflow.com/questions/14388452/how-do-i-load-a-json-object-from-a-file-with-ajax
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}

// this requests the file and executes a callback with the parsed result once
//   it is available
fetchJSONFile('motifs.json', function(data){
    // do something with your data
    init(data);
});

//translate timecode from MM:SS to S
function timecode(orig) {
    var str = orig.toString();
    var n;
    if(str.length > 2) {
        var sec = str.slice(-2);
        var min = str.slice(0, -2);
        sec = parseInt(sec, 10);
        min = parseInt(min, 10);
        return min * 60 + sec;
    } else {
        return orig;
    }
}

//pad single digit indexes (1 -> 01)
//returns a string
function pad(num) {
    return ("00" + num).slice(-2);
}

/*
/  acts
*/

var songHeight = 60;
var pxScale = d3.scaleLinear()
    .domain([0, 385]) //longest song, Non-Stop, clocks in at 6:25 (385 seconds)
    .range([0, 1000]) //that should be 1000px I guess? this is arbitrary for now

function init(motifs) {
    var container = d3.select("#container")
        .attr("width", 1000)

    var acts = container.selectAll("g.act")
        .data(motifs)
        .enter().append("g")
        .attr("class", "act")

    var song = acts.selectAll(".song")
        .data(function (d) { return d.songs })
        .enter().append("g")
        .attr("class", "song")
        .attr("transform", function(d, i) { return "translate(0, " + i * songHeight + ")"; })

    var label = song.append("text")
        .attr("class", "label")
        .attr("color", "black")
        .attr("x", 0)
        .attr("y", songHeight/2)
        .text(function (d, i) { return pad(i+1) + " " + d.title })

    var music = song.append("rect")
        .attr("class", "music")
        .attr("fill", "#eeeeee")
        .attr("x", 250)
        .attr("width", (d) => pxScale( timecode(d.length) ))
        .attr("height", 40)

    var motif = song.selectAll(".motif")
        .data(d => d.motifs)
        .enter().append("rect")
        .attr("fill", "rgba(255,0,0,0.3)")
        .attr("width", d => pxScale(timecode(d.end) - timecode(d.start)))
        .attr("height", 40)
        .attr("x", d => 250 + pxScale(timecode(d.start)))

}
