/*function Hello() {
   alert("Hello, World");
}*/

window.onload=function() {
    var PLOTA = document.getElementById('plota');
    var PLOTB = document.getElementById('plotb');
    var PLOTC = document.getElementById('plotc');
    var PLOTD = document.getElementById('plotd');
    var PLOTE = document.getElementById('plote');
    var PLOTF = document.getElementById('plotf');
    var PLOTG = document.getElementById('plotg');
    var TABLA = document.getElementById('tablea');

    graphA(PLOTA);
    graphB(PLOTB);
    graphC(PLOTC);
    graphD(PLOTD);
    graphE(PLOTE);
    graphF(PLOTF);
    graphG(PLOTG);
    tableA(TABLA);

    /* Current Plotly.js version */
    console.log( Plotly.BUILD );
}

// line-plot
function graphA(fig){
    var datax = [1, 2, 3, 4, 5, 6, 7, 8];
    var datay = [1, 2, 4, 8, 16, 24, 28, 30];
    Plotly.plot(fig, 
        [{
            x : datax, 
            y : datay 
        }], 
        { 
            margin: { t: 0 } 
        });
}

// time-series plot
function graphB(fig){
    Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv", function(err, rows){
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }

        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: 'AAPL High',
            x: unpack(rows, 'Date'),
            y: unpack(rows, 'AAPL.High'),
            line: {color: '#17BECF'}
        }

        var trace2 = {
            type: "scatter",
            mode: "lines",
            name: 'AAPL Low',
            x: unpack(rows, 'Date'),
            y: unpack(rows, 'AAPL.Low'),
            line: {color: '#7F7F7F'}
        }

        var data = [trace1,trace2];
    
        var layout = {
            xaxis: {
                autorange: true, 
                range: ['2015-02-17', '2017-02-16'], 
                rangeselector: {buttons: [
                    {
                        count: 1, 
                        label: '1m', 
                        step: 'month', 
                        stepmode: 'backward'
                    }, 
                    {
                        count: 6, 
                        label: '6m', 
                        step: 'month', 
                        stepmode: 'backward'
                    }, 
                    {   step: 'all' }
                ]}, 
                rangeslider: {range: ['2015-02-17', '2017-02-16']}, 
                type: 'date'
            }, 
            yaxis: {
                autorange: true, 
                range: [86.8700008333, 138.870004167], 
                type: 'linear'
            }
        };

        //Plotly.newPlot(figb, data, layout);
        Plotly.plot(fig, data, layout);
    })
}

// box-plot
function graphC(fig){
    var xData = ['Carmelo<br>Anthony', 'Dwyane<br>Wade','Deron<br>Williams', 'Brook<br>Lopez',
                 'Damian<br>Lillard', 'David<br>West','Blake<br>Griffin', 'David<br>Lee',
                 'Demar<br>Derozan'];
    function getrandom(num , mul) {
        var value = [ ]	
	    for(i=0;i<=num;i++) {
	        rand=Math.random() * mul;
            value.push(rand);
	    }
	    return value
    }
    var yData = [
        getrandom(30 ,10),getrandom(30, 20),getrandom(30, 25),
        getrandom(30, 40),getrandom(30, 45),getrandom(30, 30),
        getrandom(30, 20),getrandom(30, 15),getrandom(30, 43)];

    var colors = ['rgba(93, 164, 214, 0.5)', 'rgba(255, 144, 14, 0.5)', 'rgba(44, 160, 101, 0.5)', 'rgba(255, 65, 54, 0.5)', 'rgba(207, 114, 255, 0.5)', 'rgba(127, 96, 0, 0.5)', 'rgba(255, 140, 184, 0.5)', 'rgba(79, 90, 117, 0.5)', 'rgba(222, 223, 0, 0.5)'];
    var data = [];

    for (var i=0; i<xData.length; i++ ) {
        var result = {
            type: 'box',
            y: yData[i],
            name: xData[i],
            boxpoints: 'all',
            jitter: 0.5,
            whiskerwidth: 0.2,
            fillcolor: 'cls',
            marker: {
                size: 2
            },
            line: {
                width: 1
            }
        };
        data.push(result);
    };

    layout = {
        yaxis: {
            autorange: true,
            showgrid: true,
            zeroline: true,
            dtick: 5,
            gridcolor: 'rgb(255, 255, 255)',
            gridwidth: 1,
            zerolinecolor: 'rgb(255, 255, 255)',
            zerolinewidth: 2
        },
      margin: {
            l: 40,
            r: 30,
            b: 30,
            t: 10
        },
        paper_bgcolor: 'rgb(243, 243, 243)',
        plot_bgcolor: 'rgb(243, 243, 243)',
        showlegend: false
    };

    Plotly.newPlot(fig, data, layout);
}

// map
function graphD(fig){
    Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2011_us_ag_exports.csv', function(err, rows){
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }
  
        var randomize = z => z.map(d => Math.pow(Math.random(), 2) * 30000);
        var data = unpack(rows, 'total exports');
        var frames = [{
                data: [{z: unpack(rows, 'total exports')}],
                traces: [0],
                name: '1990',
                layout: {title: '1990 US Agriculture Exports by State'}
            }, 
            {
                data: [{z: randomize(data)}],
                traces: [0],
                name: '1995',
                layout: {title: '1995 US Agriculture Exports by State'}
            }, 
            {
                data: [{z: randomize(data)}],
                traces: [0],
                name: '2000',
                layout: {title: '2000 US Agriculture Exports by State'}
            }, 
            {
                data: [{z: randomize(data)}],
                traces: [0],
                name: '2005',
                layout: {title: '2005 US Agriculture Exports by State'}
        }]

    var data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: unpack(rows, 'code'),
        z: unpack(rows, 'total exports'),
        text: unpack(rows, 'state'),
        zmin: 0,
        zmax: 17000,
        colorscale: [
            [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
            [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
            [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
        ],
        colorbar: {
            title: 'Millions USD',
            thickness: 0.2
        },
        marker: {
            line:{
                color: 'rgb(255,255,255)',
                width: 2
            }
        }
    }];

  var layout = {
    geo:{
      scope: 'usa',
      showlakes: true,
      lakecolor: 'rgb(255,255,255)'
    },
    xaxis: {autorange: false},
    yaxis: {autorange: false},
    sliders: [{
        currentvalue: {
            prefix: 'Year: ',
        },
        steps: frames.map(f => ({
            label: f.name,
            method: 'animate',
            args: [[f.name], {frame: {duration: 0}}]
        }))
    }]
  };

  Plotly.plot(fig, {
    data: data,
    layout: layout,
    frames: frames,
    config: {showLink: false}
  });
    });
}

// bar plot
function graphE(fig){
    var x1 = ['Gear', 'Bearing', 'Motor'];
    var x2 = ['Switch', 'Plug', 'Cord', 'Fuse', 'Bulb'];
    var x3 = ['Pump', 'Leak', 'Seals'];

    Plotly.plot(fig, [{
        type: 'bar',
        x: x1,  
        y: x1.map(randomizer)
    }, {
        type: 'bar',
        x: x2,  
        y: x2.map(randomizer)
    }, {
        type: 'bar',
        x: x3,  
        y: x3.map(randomizer)
    }], {
        showlegend: false,
        margin: { t:0 }
    });

    function randomizer() {
        return 20 * Math.random();
    }
}

// scatter plot
function graphF(fig){
    var myPlot = document.getElementById('myDiv'),
    d3 = Plotly.d3,
    N = 20,
    x = d3.range(N),
    y = d3.range(N).map( d3.random.normal() ),
    data = [{x:x, y:y, type:'scatter',
            mode:'markers', marker:{size:10}}
           ];

    Plotly.plot(fig, data, { 
            margin: { t: 0 } 
        });
}

// pyramid plot
function graphG(fig){
    var url = 'https://gist.githubusercontent.com/davenquinn/988167471993bc2ece29/raw/f38d9cb3dd86e315e237fde5d65e185c39c931c2/data.json';

    Plotly.d3.json(url, function(err, rawData) {
        if(err) throw err;
        plot(rawData);
    });

    function plot(rawData) {
        var data = Object.keys(rawData).map(function(k) {
            var pts = rawData[k];

            return {
                type: 'scatterternary',
                mode: 'lines',
                name: k,
                a: pts.map(function(d) { return d.clay }),
                b: pts.map(function(d) { return d.sand }),
                c: pts.map(function(d) { return d.silt }),
                line: { color: '#c00' }   
            };
        });
  
        var layout = {
            ternary: {
                sum: 100,
                aaxis: makeAxis('Clay'),
                baxis: makeAxis('Sand'),
                caxis: makeAxis('Silt')
            },
            showlegend: false,
            margin: {t:0},
            annotations: [{
                showarrow: false,
                text: 'Replica of Daven Quinn\'s <a href="https://bl.ocks.org/davenquinn/988167471993bc2ece29">block</a>',
                x: 0.15,
                y: 1.1
            }]
        };
  
        var gd = document.getElementById('graph');

        Plotly.plot(fig, data, layout);
  
        gd.on('plotly_afterplot', function() {
        console.log('done')
        })
    }

    function makeAxis(title) {
        return {
            title: title,
            ticksuffix: '%', 
            min: 0.01,
            linewidth: 2, 
            ticks: 'outside', 
            ticklen: 8, 
            showgrid: true,
        };
    }
}

// table
function tableA(fig){
    Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/Mining-BTC-180.csv", function(err, rows){
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }
   
        var headerNames = Plotly.d3.keys(rows[0]);
        var headerValues = [];
        var cellValues = [];
        for (i = 0; i < headerNames.length; i++) { 
            headerValue = [headerNames[i]];
            headerValues[i] = headerValue; 
            cellValue = unpack(rows, headerNames[i]); 
            cellValues[i] = cellValue;
        }
  
        // clean date
        for (i = 0; i < cellValues[1].length; i++) {
            var dateValue = cellValues[1][i].split(' ')[0]
            cellValues[1][i] = dateValue
        } 
  
        var data = [{
            type: 'table',
            columnwidth: [200,500,600,600,400,400,600,600,600],
            columnorder: [0,1,2,3,4,5,6,7,8,9],
            header: {
                values: headerValues, 
                align: "left",
                line: {width: 1, color: 'rgb(50, 50, 50)'},
                fill: {color: ['rgb(244, 66, 78)']},
                font: {family: "Calibri", size: 14, color: "white"}
            },
            cells: {
                values: cellValues,
                line: {color: "black", width: 1},
                fill: {color: ['rgba(228, 222, 249, 0.65)']},
                font: {family: "Calibri", size: 13, color: ["black"]}
            }
        }]

        var layout = {
            margin: {t:20}
        }

        Plotly.plot(fig, data, layout);

        results = 'No' + headerValues + '\n';
        for (i = 0; i < cellValues[1].length; i++) {
            results = results + Plotly.d3.values(rows[i]) + '\n';
        }
    });
}

// extract data from table
function download_csv(){
    Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/Mining-BTC-180.csv", function(err, rows){
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }
        var headerNames = Plotly.d3.keys(rows[0]);
        var headerValues = [];
        var cellValues = [];
        for (i = 0; i < headerNames.length; i++) { 
            headerValue = [headerNames[i]];
            headerValues[i] = headerValue; 
            cellValue = unpack(rows, headerNames[i]); 
            cellValues[i] = cellValue;
        }
        // clean date
        for (i = 0; i < cellValues[1].length; i++) {
            var dateValue = cellValues[1][i].split(' ')[0]
            cellValues[1][i] = dateValue
        }
        results = 'No' + headerValues + '\n';
        for (i = 0; i < cellValues[1].length; i++) {
            results = results + Plotly.d3.values(rows[i]) + '\n';
        }
    });
    exportCSV(results);
}

// export to csv
function exportCSV(csv){
    var filename, link;
    filename = "export.csv";

    if (csv == null) return;
    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}

// api test
function api_test(){
    var txt = document.getElementById('outputText');
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", processRequest, false);
    xhr.open('GET', "http://ipinfo.io/json",false);
    xhr.send();
    xhr.onreadystatechange = processRequest;

    function processRequest(e) {
        if (xhr.readyState == 4) {
            //alert(xhr.responseText);
            txt.innerHTML = "<p>JSON output:</p><p>" + xhr.responseText + "</p>";
            var response = JSON.parse(xhr.responseText);
            //alert(response.ip);
        }
    }

    
    
}

//ip, city, region, country, loc, org