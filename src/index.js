import { IEXCloudClient } from "node-iex-cloud";
import axios from 'axios'
import * as d3 from 'd3'


 //WHEN PAGE LOADS
console.log('hello')





const iex = new IEXCloudClient(fetch, {
    sandbox: true,
    publishable: "Tpk_7191aab3200940d588ebad397e1e7e0d",
    version: "stable"
});



var svg = d3.select("svg");


axios.get('https://sandbox.iexapis.com/stable/stock/fb/chart/1m?token=Tsk_4fc15c0c3dab49d284a00d5c440fc609')
    .then(function (response) {

        const monday = [
            "2022-01-03", "2022-01-10", "2022-01-17", "2022-01-24",
            "2022-02-01", "2022-02-08", "2022-02-15", "2022-02-22",
            "2021-01-04", "2021-01-11", "2021-01-28", "2021-01-25",
            "2021-01-31", "2021-02-1", "2021-02-08", "2021-02-15",
            "2021-02-22", "2021-03-01", "2021-03-08", "2021-03-15", "2021-03-22",
            "2021-04-05", "2021-04-12", "2021-04-19", "2021-04-26",
            "2021-05-03", "2021-05-10", "2021-05-17", "2021-05-24",
            "2021-05-31", "2021-06-07", "2021-06-14", "2021-06-21", "2021-06-28",
            "2021-07-05", "2021-07-12", "2021-07-19", "2021-07-26",
            "2021-08-02", "2021-08-09", "2021-08-16", "2021-08-23", "2021-08-30",
            "2021-09-06", "2021-09-13", "2021-09-20", "2021-09-27",
            "2021-10-04", "2021-10-11", "2021-10-18", "2021-10-25",
            "2021-11-01", "2021-11-08", "2021-11-15", "2021-11-22", "2021-11-29",
            "2021-12-06", "2021-12-13", "2021-12-20", "2021-12-27",
        ]

        const tuesday = [
            "2022-01-04", "2022-01-11", "2022-01-18", "2022-01-25",
            "2022-02-01", "2022-02-08", "2022-02-15", "2022-02-22",
            "2021-01-05", "2021-01-12", "2021-01-19", "2021-01-26",
            "2021-02-02", "2021-02-09", "2021-02-16", "2021-02-23",
            "2021-03-02", "2021-03-09", "2021-03-16", "2021-03-23", "2021-03-30",
            "2021-04-06", "2021-04-13", "2021-04-20", "2021-04-27",
            "2021-05-04", "2021-05-11", "2021-05-18", "2021-05-25",
            "2021-06-06", "2021-06-08", "2021-06-15", "2021-06-22", "2021-06-29",
            "2021-07-07", "2021-07-13", "2021-07-20", "2021-07-27",
            "2021-08-03", "2021-08-10", "2021-08-17", "2021-08-24",
            "2021-09-01", "2021-09-08", "2021-09-15", "2021-09-22", "2021-09-28",
            "2021-10-05", "2021-10-12", "2021-10-19", "2021-10-26",
            "2021-11-02", "2021-11-09", "2021-11-16", "2021-11-23", "2021-11-30",
            "2021-12-07", "2021-12-14", "2021-12-21", "2021-12-28",
        ]

        const wednesday = [
            "2022-01-05", "2022-01-12", "2022-01-19", "2022-01-26",
            "2022-02-02", "2022-02-09", "2022-02-16", "2022-02-23",
            "2021-01-06", "2021-01-13", "2021-01-20", "2021-01-227",
            "2021-02-03", "2021-02-10", "2021-02-17", "2021-02-24",
            "2021-03-03", "2021-03-10", "2021-03-17", "2021-03-24",
            "2021-03-31", "2021-04-07", "2021-04-14", "2021-04-21", "2021-04-28",
            "2021-05-05", "2021-05-12", "2021-05-19", "2021-05-26",
            "2021-06-02", "2021-06-09", "2021-06-16", "2021-06-23",
            "2021-07-07", "2021-07-14", "2021-07-21", "2021-07-28",
            "2021-08-04", "2021-08-11", "2021-08-18", "2021-08-25",
            "2021-09-01", "2021-09-08", "2021-09-15", "2021-09-22", "2021-09-29",
            "2021-10-06", "2021-10-14", "2021-10-20", "2021-10-27",
            "2021-11-03", "2021-11-10", "2021-11-17", "2021-11-24", "2021-11-29",
            "2021-12-01", "2021-12-08", "2021-12-15", "2021-12-22", "2021-12-29"
        ]

        const thursday = [
            "2022-01-06", "2022-01-13", "2022-01-20", "2022-01-27",
            "2022-02-03", "2022-02-10", "2022-02-17", "2022-02-24",
            "2021-01-07", "2021-01-14", "2021-01-21", "2021-01-28",
            "2021-02-04", "2021-02-11", "2021-02-18", "2021-02-25",
            "2021-03-03", "2021-03-11", "2021-03-18", "2021-03-25",
            "2021-04-01", "2021-04-08", "2021-04-15", "2021-04-22",
            "2021-05-06", "2021-05-13", "2021-05-20", "2021-05-27",
            "2021-06-03", "2021-06-10", "2021-06-17", "2021-06-24",
            "2021-07-01", "2021-07-08", "2021-07-15", "2021-07-22", "2021-07-29",
            "2021-08-05", "2021-08-12", "2021-08-19", "2021-08-26",
            "2021-09-02", "2021-09-09", "2021-09-16", "2021-09-23", "2021-09-30",
            "2021-10-07", "2021-10-14", "2021-10-21", "2021-10-28",
            "2021-11-04", "2021-11-11", "2021-11-18", "2021-11-25",
            "2021-12-02", "2021-12-09", "2021-12-16", "2021-12-23", "2021-12-30"
        ]

        const friday = [
            "2022-01-07", "2022-01-14", "2022-01-21", "2022-01-28",
            "2022-02-04", "2022-02-11", "2022-02-18", "2022-02-25",
            "2021-01-01", "2021-01-08", "2021-01-15", "2021-01-22", "2021-01-29",
            "2021-02-05", "2021-02-12", "2021-02-19", "2021-02-26",
            "2021-03-05", "2021-03-12", "2021-03-19", "2021-03-26",
            "2021-04-02", "2021-04-09", "2021-04-16", "2021-04-23", "2021-04-30",
            "2021-05-07", "2021-05-14", "2021-05-21", "2021-05-28",
            "2021-06-04", "2021-06-11", "2021-06-18", "2021-06-25",
            "2021-07-02", "2021-07-09", "2021-07-16", "2021-07-23", "2021-07-30",
            "2021-08-06", "2021-08-13", "2021-08-20", "2021-08-27",
            "2021-09-03", "2021-09-10", "2021-09-17", "2021-09-24",
            "2021-10-01", "2021-10-08", "2021-10-15", "2021-10-22", "2021-10-29",
            "2021-11-05", "2021-11-12", "2021-11-19", "2021-11-26",
            "2021-12-03", "2021-12-10", "2021-12-17", "2021-12-24", ,
        ]
    let mondayChange = 0
    let tuesdayChange = 0
    let wednesdayChange = 0
    let thursdayChange = 0
    let fridayChange = 0

    let mondayCount = 0
    let tuesdayCount = 0
    let wednesdayCount = 0
    let thursdayCount = 0
    let fridayCount = 0

    let mondayMonthlyPercent = 0
    let tuesdayMonthlyPercent = 0
    let wednesdayMonthlyPercent = 0
    let thursdayMonthlyPercent = 0
    let fridayMonthlyPercent = 0
   
    let stockData = response.data
      
    stockData.forEach(el => {
        
        
        let quoteDate = el.date

     

        let stockOpen = el.open
        let stockClose = el.close
        let dailyDifference = (stockClose - stockOpen)
        let dailyDivision = (dailyDifference / stockOpen)
        let dailyChange = dailyDivision * 100

        
        // console.log(stockClose + ' stock close')
        // console.log(dailyDifference + ' diff')
        // console.log(dailyDivision + ' divison')
        // console.log(dailyChange + ' daily change')
        // console.log('date: ' + quoteDate)

          
        if(monday.includes(el.date)){
            mondayCount += 1
            mondayChange += dailyChange
            mondayMonthlyPercent = (mondayChange / mondayCount) 
            
            
        } if (tuesday.includes(el.date)){
            tuesdayCount += 1
            tuesdayChange += dailyChange
            tuesdayMonthlyPercent = (tuesdayChange / tuesdayCount)  
             
        } else if(wednesday.includes(el.date)){
            wednesdayCount += 1
            wednesdayChange += dailyChange
            wednesdayMonthlyPercent = (wednesdayChange / wednesdayCount)  
             
        } else if(thursday.includes(el.date)){
            thursdayCount += 1
            thursdayChange += dailyChange
            thursdayMonthlyPercent = (thursdayChange / thursdayCount)  
             
        } else if(friday.includes(el.date)){
            fridayCount += 1
            fridayChange += dailyChange
            fridayMonthlyPercent = (fridayChange / fridayCount)
        }
    })

      
  


        //D3
        var data = [mondayMonthlyPercent, tuesdayMonthlyPercent, wednesdayMonthlyPercent, thursdayMonthlyPercent, fridayMonthlyPercent]


        var leftMargin = 50;  // Space to the left of first bar; accomodates y-axis labels
        var rightMargin = 0; // Space to the right of last bar
        var margin = { left: leftMargin, right: rightMargin, top: 10, bottom: 10 };
        var barWidth = 80;  // Width of the bars
        var chartHeight = 400;  // Height of chart, from x-axis (ie. y=0)
        var chartWidth = margin.left + data.length * barWidth + margin.right;

        /* This scale produces negative output for negatve input */
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, chartHeight]);

        /*
         * We need a different scale for drawing the y-axis. It needs
         * a reversed range, and a larger domain to accomodate negaive values.
         */
        var yAxisScale = d3.scaleLinear()
            .domain([d3.min(data), d3.max(data)])
            .range([chartHeight - yScale(d3.min(data)), 0]);



        var svg = d3.select('svg');
        svg
            .attr('height', chartHeight + 100)
            .attr('width', chartWidth)
            .style('border', '1px solid');

        svg
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .transition()
            .duration(1500)
            .attr("height", d => d + 200)
            .attr("x", function (d, i) { return margin.left + i * barWidth; })
            .attr("y", function (d, i) { return chartHeight - Math.max(0, yScale(d)); })
            .attr("height", function (d) { return Math.abs(yScale(d)); })
            .attr("width", barWidth)
            .style("fill", "#110552")
            .style("stroke", "white")
            .style("stroke-width", "1px")
            .style("opacity", function (data, i) { return 1 /*- (i * (1/data.length)); */ })


        var yAxis = d3.axisLeft(yAxisScale);

        svg.append('g')
            .attr('transform', function (d) {
                return 'translate(' + margin.left + ', 0)';
            })
            .call(yAxis);

    })



  // code for negative values with diffrent colors

        // var maxHeight = d3.max(dataset, function (d) { return d });
        // var w = 500;
        // var h = maxHeight * 10 * 2 + 100;
        // var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

        // var barpadding = 2;
        // var bars = svg.selectAll("rect").data(dataset).enter().append("rect");
        // bars.attr("x", function (d, i) {
        //     return i * (w / dataset.length);
        // })
        //     .attr("y", function (d) {
        //         if (d > 0) {
        //             return h / 2 - 10 * d;
        //         }
        //         else {
        //             return h / 2
        //         }
        //     })//for bottom to top
        //     .attr("width", w / dataset.length - barpadding)
        //     .attr("height", function (d) {
        //         return Math.abs(100 * d);
        //     });
        // bars.attr("fill", function (d) {
        //     if (d < 0) {
        //         return "red";
        //     }
        //     else {
        //         return "green";
        //     }
        //     //return "rgb(0,"+Math.abs(d*10)+",0)"
        // });

        // //add tag to every bar chart
        // var tags = svg.selectAll("text").data(dataset).enter().append("text").text(function (d) {
        //     return d;
        // });
        // tags.attr("x", function (d, i) {
        //     return i * (w / dataset.length) + 13;
        // })
        //     .attr("y", function (d) {
        //         if (d > 0) {
        //             return h / 2 - 10 * d + 15;
        //         }
        //         else {
        //             return h / 2 + 10 * Math.abs(d) - 5;
        //         }
        //     })//for bottom to top
        //     .attr("fill", "white");
