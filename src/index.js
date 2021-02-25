import { IEXCloudClient } from "node-iex-cloud";
import axios from 'axios'

 import * as d3 from 'd3'


const iex = new IEXCloudClient(fetch, {
    sandbox: true,
    publishable: "Tpk_7191aab3200940d588ebad397e1e7e0d",
    version: "stable"
});



axios.get('https://sandbox.iexapis.com/stable/stock/FB/chart/1m?&filter=open,close,date&token=Tpk_7191aab3200940d588ebad397e1e7e0d')
    .then(function (response) {
        console.log(response.data)


        const monday = [
            "2021-01-06", "2021-01-13", "2021-01-20", "2021-01-27",
            "2021-02-03", "2021-02-10", "2021-02-17", "2021-02-24",
            "2021-03-02", "2021-03-09", "2021-03-16", "2021-03-23", "2021-03-30",
            "2021-04-06", "2021-04-13", "2021-04-20", "2021-04-27",
            "2021-05-04", "2021-05-11", "2021-05-18", "2021-05-25",
            "2021-06-01", "2021-06-08", "2021-06-15", "2021-06-22", "2021-06-29",
            "2021-07-06", "2021-07-13", "2021-07-20", "2021-07-27",
            "2021-08-03", "2021-08-10", "2021-08-17", "2021-08-24", "2021-08-31",
            "2021-09-07", "2021-09-14", "2021-09-21", "2021-09-28",
            "2021-10-05", "2021-10-12", "2021-10-19", "2021-10-26",
            "2021-11-02", "2021-11-09", "2021-11-16", "2021-11-23", "2021-11-30",
            "2021-12-07", "2021-12-14", "2021-12-21", "2021-12-28",
        ]

        const tuesday = [
            "2021-01-07", "2021-01-14", "2021-01-21", "2021-01-28",
            "2021-02-04", "2021-02-11", "2021-02-18", "2021-02-25",
            "2021-03-03", "2021-03-10", "2021-03-17", "2021-03-24", "2021-03-31",
            "2021-04-07", "2021-04-14", "2021-04-21", "2021-04-28",
            "2021-05-05", "2021-05-12", "2021-05-19", "2021-05-26",
            "2021-06-02", "2021-06-09", "2021-06-16", "2021-06-23", "2021-06-30",
            "2021-07-07", "2021-07-14", "2021-07-21", "2021-07-28",
            "2021-08-04", "2021-08-11", "2021-08-18", "2021-08-25",
            "2021-09-01", "2021-09-08", "2021-09-15", "2021-09-22", "2021-09-29",
            "2021-10-06", "2021-10-13", "2021-10-20", "2021-10-27",
            "2021-11-03", "2021-11-10", "2021-11-17", "2021-11-24",
            "2021-12-01", "2021-12-08", "2021-12-15", "2021-12-22", "2021-12-29",
        ]

        const wednesday = [
            "2021-01-01", "2021-01-08", "2021-01-15", "2021-01-22", "2021-01-29",
            "2021-02-05", "2021-02-12", "2021-02-19", "2021-02-26",
            "2021-03-04", "2021-03-11", "2021-03-18", "2021-03-25",
            "2021-04-01", "2021-04-08", "2021-04-15", "2021-04-22", "2021-04-29",
            "2021-05-06", "2021-05-13", "2021-05-20", "2021-05-27",
            "2021-06-03", "2021-06-10", "2021-06-17", "2021-06-24",
            "2021-07-01", "2021-07-08", "2021-07-15", "2021-07-22", "2021-07-29",
            "2021-08-05", "2021-08-12", "2021-08-19", "2021-08-26",
            "2021-09-02", "2021-09-09", "2021-09-16", "2021-09-23", "2021-09-30",
            "2021-10-07", "2021-10-14", "2021-10-21", "2021-10-28",
            "2021-11-04", "2021-11-11", "2021-11-18", "2021-11-25",
            "2021-12-02", "2021-12-09", "2021-12-16", "2021-12-23", "2021-12-30"
        ]

        const thursday = [
            "2021-01-02", "2021-01-09", "2021-01-16", "2021-01-23", "2021-01-30",
            "2021-02-06", "2021-02-13", "2021-02-20", "2021-02-27",
            "2021-03-05", "2021-03-12", "2021-03-19", "2021-03-26",
            "2021-04-02", "2021-04-09", "2021-04-16", "2021-04-23", "2021-04-30",
            "2021-05-07", "2021-05-14", "2021-05-21", "2021-05-28",
            "2021-06-04", "2021-06-11", "2021-06-18", "2021-06-25",
            "2021-07-02", "2021-07-09", "2021-07-16", "2021-07-23", "2021-07-30",
            "2021-08-06", "2021-08-13", "2021-08-20", "2021-08-27",
            "2021-09-03", "2021-09-10", "2021-09-17", "2021-09-24",
            "2021-10-01", "2021-10-08", "2021-10-15", "2021-10-22", "2021-10-29",
            "2021-11-05", "2021-11-12", "2021-11-19", "2021-11-26",
            "2021-12-03", "2021-12-10", "2021-12-17", "2021-12-24", "2021-12-31"
        ]

        const friday = [
            "2021-01-03", "2021-01-10", "2021-01-17", "2021-01-24", "2021-01-31",
            "2021-02-07", "2021-02-14", "2021-02-21", "2021-02-28",
            "2021-03-06", "2021-03-13", "2021-03-20", "2021-03-27",
            "2021-04-03", "2021-04-10", "2021-04-17", "2021-04-24",
            "2021-05-01", "2021-05-08", "2021-05-15", "2021-05-22", "2021-05-29",
            "2021-06-05", "2021-06-12", "2021-06-19", "2021-06-26",
            "2021-07-03", "2021-07-10", "2021-07-17", "2021-07-24", "2021-07-31",
            "2021-08-07", "2021-08-14", "2021-08-21", "2021-08-28",
            "2021-09-04", "2021-09-11", "2021-09-18", "2021-09-25",
            "2021-10-02", "2021-10-09", "2021-10-16", "2021-10-23", "2021-10-30",
            "2021-11-06", "2021-11-13", "2021-11-20", "2021-11-27",
            "2021-12-04", "2021-12-11", "2021-12-18", "2021-12-25",
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
        let dailyChange = el.changePercent
        let quoteDate = el.date
          
        if(monday.includes(el.date)){
            mondayCount += 1
            mondayChange += dailyChange
            mondayMonthlyPercent = (mondayChange / mondayCount) 
            
            
        } else if(tuesday.includes(el.date)){
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

    












    
        // console.log(sqArray)
        console.log(fridayMonthlyPercent, 'fb friday day')
        // console.log(tuesdayMonthlyPercent, 'sq tuesday') 
        // console.log(wednesdayMonthlyPercent, 'sq wednesday') 
        // console.log(thursdayMonthlyPercent, 'sq thursday') 
        // console.log(fridayMonthlyPercent, 'sq friday')  





       



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
