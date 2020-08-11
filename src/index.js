import { IEXCloudClient } from "node-iex-cloud";
import axios from 'axios'

 import * as d3 from 'd3'


const iex = new IEXCloudClient(fetch, {
    sandbox: true,
    publishable: "Tpk_7191aab3200940d588ebad397e1e7e0d",
    version: "stable"
});



axios.get('https://sandbox.iexapis.com/stable/stock/FB/chart/1m?&filter=changePercent,date&token=Tpk_7191aab3200940d588ebad397e1e7e0d')
    .then(function (response) {


        const monday = [
            "2020-01-06", "2020-01-13", "2020-01-20", "2020-01-27",
            "2020-02-03", "2020-02-10", "2020-02-17", "2020-02-24",
            "2020-03-02", "2020-03-09", "2020-03-16", "2020-03-23", "2020-03-30",
            "2020-04-06", "2020-04-13", "2020-04-20", "2020-04-27",
            "2020-05-04", "2020-05-11", "2020-05-18", "2020-05-25",
            "2020-06-01", "2020-06-08", "2020-06-15", "2020-06-22", "2020-06-29",
            "2020-07-06", "2020-07-13", "2020-07-20", "2020-07-27",
            "2020-08-03", "2020-08-10", "2020-08-17", "2020-08-24", "2020-08-31",
            "2020-09-07", "2020-09-14", "2020-09-21", "2020-09-28",
            "2020-10-05", "2020-10-12", "2020-10-19", "2020-10-26",
            "2020-11-02", "2020-11-09", "2020-11-16", "2020-11-23", "2020-11-30",
            "2020-12-07", "2020-12-14", "2020-12-21", "2020-12-28",
        ]

        const tuesday = [
            "2020-01-07", "2020-01-14", "2020-01-21", "2020-01-28",
            "2020-02-04", "2020-02-11", "2020-02-18", "2020-02-25",
            "2020-03-03", "2020-03-10", "2020-03-17", "2020-03-24", "2020-03-31",
            "2020-04-07", "2020-04-14", "2020-04-21", "2020-04-28",
            "2020-05-05", "2020-05-12", "2020-05-19", "2020-05-26",
            "2020-06-02", "2020-06-09", "2020-06-16", "2020-06-23", "2020-06-30",
            "2020-07-07", "2020-07-14", "2020-07-21", "2020-07-28",
            "2020-08-04", "2020-08-11", "2020-08-18", "2020-08-25",
            "2020-09-01", "2020-09-08", "2020-09-15", "2020-09-22", "2020-09-29",
            "2020-10-06", "2020-10-13", "2020-10-20", "2020-10-27",
            "2020-11-03", "2020-11-10", "2020-11-17", "2020-11-24",
            "2020-12-01", "2020-12-08", "2020-12-15", "2020-12-22", "2020-12-29",
        ]

        const wednesday = [
            "2020-01-01", "2020-01-08", "2020-01-15", "2020-01-22", "2020-01-29",
            "2020-02-05", "2020-02-12", "2020-02-19", "2020-02-26",
            "2020-03-04", "2020-03-11", "2020-03-18", "2020-03-25",
            "2020-04-01", "2020-04-08", "2020-04-15", "2020-04-22", "2020-04-29",
            "2020-05-06", "2020-05-13", "2020-05-20", "2020-05-27",
            "2020-06-03", "2020-06-10", "2020-06-17", "2020-06-24",
            "2020-07-01", "2020-07-08", "2020-07-15", "2020-07-22", "2020-07-29",
            "2020-08-05", "2020-08-12", "2020-08-19", "2020-08-26",
            "2020-09-02", "2020-09-09", "2020-09-16", "2020-09-23", "2020-09-30",
            "2020-10-07", "2020-10-14", "2020-10-21", "2020-10-28",
            "2020-11-04", "2020-11-11", "2020-11-18", "2020-11-25",
            "2020-12-02", "2020-12-09", "2020-12-16", "2020-12-23", "2020-12-30"
        ]

        const thursday = [
            "2020-01-02", "2020-01-09", "2020-01-16", "2020-01-23", "2020-01-30",
            "2020-02-06", "2020-02-13", "2020-02-20", "2020-02-27",
            "2020-03-05", "2020-03-12", "2020-03-19", "2020-03-26",
            "2020-04-02", "2020-04-09", "2020-04-16", "2020-04-23", "2020-04-30",
            "2020-05-07", "2020-05-14", "2020-05-21", "2020-05-28",
            "2020-06-04", "2020-06-11", "2020-06-18", "2020-06-25",
            "2020-07-02", "2020-07-09", "2020-07-16", "2020-07-23", "2020-07-30",
            "2020-08-06", "2020-08-13", "2020-08-20", "2020-08-27",
            "2020-09-03", "2020-09-10", "2020-09-17", "2020-09-24",
            "2020-10-01", "2020-10-08", "2020-10-15", "2020-10-22", "2020-10-29",
            "2020-11-05", "2020-11-12", "2020-11-19", "2020-11-26",
            "2020-12-03", "2020-12-10", "2020-12-17", "2020-12-24", "2020-12-31"
        ]

        const friday = [
            "2020-01-03", "2020-01-10", "2020-01-17", "2020-01-24", "2020-01-31",
            "2020-02-07", "2020-02-14", "2020-02-21", "2020-02-28",
            "2020-03-06", "2020-03-13", "2020-03-20", "2020-03-27",
            "2020-04-03", "2020-04-10", "2020-04-17", "2020-04-24",
            "2020-05-01", "2020-05-08", "2020-05-15", "2020-05-22", "2020-05-29",
            "2020-06-05", "2020-06-12", "2020-06-19", "2020-06-26",
            "2020-07-03", "2020-07-10", "2020-07-17", "2020-07-24", "2020-07-31",
            "2020-08-07", "2020-08-14", "2020-08-21", "2020-08-28",
            "2020-09-04", "2020-09-11", "2020-09-18", "2020-09-25",
            "2020-10-02", "2020-10-09", "2020-10-16", "2020-10-23", "2020-10-30",
            "2020-11-06", "2020-11-13", "2020-11-20", "2020-11-27",
            "2020-12-04", "2020-12-11", "2020-12-18", "2020-12-25",
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
        // console.log(mondayMonthlyPercent, 'sq monday')
        // console.log(tuesdayMonthlyPercent, 'sq tuesday') 
        // console.log(wednesdayMonthlyPercent, 'sq wednesday') 
        // console.log(thursdayMonthlyPercent, 'sq thursday') 
        // console.log(fridayMonthlyPercent, 'sq friday')  

         var data = [mondayMonthlyPercent, tuesdayMonthlyPercent, wednesdayMonthlyPercent, thursdayMonthlyPercent, fridayMonthlyPercent]
        // let sqArray = [50, 20, 5, 30, 10]


        // var data = [100, -100, -150, 55, 150, 120, 450, 980, 1200];

        var leftMargin = 50;  // Space to the left of first bar; accomodates y-axis labels
        var rightMargin = 0; // Space to the right of last bar
        var margin = { left: leftMargin, right: rightMargin, top: 10, bottom: 10 };
        var barWidth = 80;  // Width of the bars
        var chartHeight = 450;  // Height of chart, from x-axis (ie. y=0)
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
            .attr("x", function (d, i) { return margin.left + i * barWidth; })
            .attr("y", function (d, i) { return chartHeight - Math.max(0, yScale(d)); })
            .attr("height", function (d) { return Math.abs(yScale(d)); })
            .attr("width", barWidth)
            .style("fill", "#110552")
            .style("stroke", "white")
            .style("stroke-width", "1px")
            .style("opacity", function (data, i) { return 1 /*- (i * (1/data.length)); */ });

        var yAxis = d3.axisLeft(yAxisScale);

        svg.append('g')
            .attr('transform', function (d) {
                return 'translate(' + margin.left + ', 0)';
            })
            .call(yAxis);

            



    

    
  })


       



// }



export const getTslaThirtyDayAvg = () => {
    axios.get('https://sandbox.iexapis.com/stable/stock/TSLA/chart/1m?&filter=changePercent,date&token=Tpk_7191aab3200940d588ebad397e1e7e0d')
        .then(function (response) {


            const monday = [
                "2020-01-06", "2020-01-13", "2020-01-20", "2020-01-27",
                "2020-02-03", "2020-02-10", "2020-02-17", "2020-02-24",
                "2020-03-02", "2020-03-09", "2020-03-16", "2020-03-23", "2020-03-30",
                "2020-04-06", "2020-04-13", "2020-04-20", "2020-04-27",
                "2020-05-04", "2020-05-11", "2020-05-18", "2020-05-25",
                "2020-06-01", "2020-06-08", "2020-06-15", "2020-06-22", "2020-06-29",
                "2020-07-06", "2020-07-13", "2020-07-20", "2020-07-27",
            ]
            const tuesday = [
                "2020-01-07", "2020-01-14", "2020-01-21", "2020-01-28",
                "2020-02-04", "2020-02-11", "2020-02-18", "2020-02-25",
                "2020-03-03", "2020-03-10", "2020-03-17", "2020-03-24", "2020-03-31",
                "2020-04-07", "2020-04-14", "2020-04-21", "2020-04-28",
                "2020-05-05", "2020-05-12", "2020-05-19", "2020-05-26",
                "2020-06-02", "2020-06-09", "2020-06-16", "2020-06-23", "2020-06-30",
                "2020-07-07", "2020-07-14", "2020-07-21", "2020-07-28",
            ]
            const wednesday = [
                "2020-01-01", "2020-01-08", "2020-01-15", "2020-01-22", "2020-01-29",
                "2020-02-05", "2020-02-12", "2020-02-19", "2020-02-26",
                "2020-03-04", "2020-03-11", "2020-03-18", "2020-03-25",
                "2020-04-01", "2020-04-08", "2020-04-15", "2020-04-22", "2020-04-29",
                "2020-05-06", "2020-05-13", "2020-05-20", "2020-05-27",
                "2020-06-03", "2020-06-10", "2020-06-17", "2020-06-24",
                "2020-07-01", "2020-07-08", "2020-07-15", "2020-07-22", "2020-07-29",
            ]
            const thursday = [
                "2020-01-02", "2020-01-09", "2020-01-16", "2020-01-23", "2020-01-30",
                "2020-02-06", "2020-02-13", "2020-02-20", "2020-02-27",
                "2020-03-05", "2020-03-12", "2020-03-19", "2020-03-26",
                "2020-04-02", "2020-04-09", "2020-04-16", "2020-04-23", "2020-04-30",
                "2020-05-07", "2020-05-14", "2020-05-21", "2020-05-28",
                "2020-06-04", "2020-06-11", "2020-06-18", "2020-06-25",
                "2020-07-02", "2020-07-09", "2020-07-16", "2020-07-23", "2020-07-30",
            ]

            const friday = [
                "2020-01-03", "2020-01-10", "2020-01-17", "2020-01-24", "2020-01-31",
                "2020-02-07", "2020-02-14", "2020-02-21", "2020-02-28",
                "2020-03-06", "2020-03-13", "2020-03-20", "2020-03-27",
                "2020-04-03", "2020-04-10", "2020-04-17", "2020-04-24",
                "2020-05-01", "2020-05-08", "2020-05-15", "2020-05-22", "2020-05-29",
                "2020-06-05", "2020-06-12", "2020-06-19", "2020-06-26",
                "2020-07-03", "2020-07-10", "2020-07-17", "2020-07-24", "2020-07-31",
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


            let tslaData = response.data

            tslaData.forEach(el => {
                let dailyChange = el.changePercent
                let quoteDate = el.date

                if (monday.includes(el.date)) {
                    mondayCount += 1
                    mondayChange += dailyChange
                    mondayMonthlyPercent = (mondayChange / mondayCount)


                } else if (tuesday.includes(el.date)) {
                    tuesdayCount += 1
                    tuesdayChange += dailyChange
                    tuesdayMonthlyPercent = (tuesdayChange / tuesdayCount)

                } else if (wednesday.includes(el.date)) {
                    wednesdayCount += 1
                    wednesdayChange += dailyChange
                    wednesdayMonthlyPercent = (wednesdayChange / wednesdayCount)

                } else if (thursday.includes(el.date)) {
                    thursdayCount += 1
                    thursdayChange += dailyChange
                    thursdayMonthlyPercent = (thursdayChange / thursdayCount)

                } else if (friday.includes(el.date)) {
                    fridayCount += 1
                    fridayChange += dailyChange
                    fridayMonthlyPercent = (fridayChange / fridayCount)
                }
            })


            // console.log(sqArray)
            console.log(mondayMonthlyPercent, 'tsla monday')
            console.log(tuesdayMonthlyPercent, 'tsla tuesday')
            console.log(wednesdayMonthlyPercent, 'tsla wednesday')
            console.log(thursdayMonthlyPercent, 'tsla thursday')
            console.log(fridayMonthlyPercent, 'tsla friday')

            var data = [mondayMonthlyPercent, tuesdayMonthlyPercent, wednesdayMonthlyPercent, thursdayMonthlyPercent, fridayMonthlyPercent]
            // let sqArray = [50, 20, 5, 30, 10]


            // var data = [100, -100, -150, 55, 150, 120, 450, 980, 1200];

            var leftMargin = 50;  // Space to the left of first bar; accomodates y-axis labels
            var rightMargin = 0; // Space to the right of last bar
            var margin = { left: leftMargin, right: rightMargin, top: 10, bottom: 10 };
            var barWidth = 50;  // Width of the bars
            var chartHeight = 450;  // Height of chart, from x-axis (ie. y=0)
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
                .attr("x", function (d, i) { return margin.left + i * barWidth; })
                .attr("y", function (d, i) { return chartHeight + 50 - Math.max(0, yScale(d)); })
                .attr("height", function (d) { return Math.abs(yScale(d)); })
                .attr("width", barWidth)
                .style("fill", "2F81BD")
                .style("stroke", "black")
                .style("stroke-width", "1px")
                .style("opacity", function (d, i) { return 1 /*- (i * (1/data.length)); */ });

            var yAxis = d3.axisLeft(yAxisScale);

            svg.append('g')
                .attr('transform', function (d) {
                    return 'translate(' + margin.left + ', 0)';
                })
                .call(yAxis);


            var xScale = d3.scaleLinear()
                .domain(0, data.length * barWidth)
                .range(0, chartWidth);

            var xAxis = d3.axisBottom();
            

        })

}






//         // console.log(sqArray)
//         console.log(mondayMonthlyPercent, 'sq monday')
//         console.log(tuesdayMonthlyPercent, 'sq tuesday')
//         console.log(wednesdayMonthlyPercent, 'sq wednesday')
//         console.log(thursdayMonthlyPercent, 'sq thursday')
//         console.log(fridayMonthlyPercent, 'sq friday')

//         var data = [mondayMonthlyPercent, tuesdayMonthlyPercent, wednesdayMonthlyPercent, thursdayMonthlyPercent, fridayMonthlyPercent]
//         // let sqArray = [50, 20, 5, 30, 10]


//         // var data = [100, -100, -150, 55, 150, 120, 450, 980, 1200];

//         var leftMargin = 50;  // Space to the left of first bar; accomodates y-axis labels
//         var rightMargin = 0; // Space to the right of last bar
//         var margin = { left: leftMargin, right: rightMargin, top: 10, bottom: 10 };
//         var barWidth = 50;  // Width of the bars
//         var chartHeight = 450;  // Height of chart, from x-axis (ie. y=0)
//         var chartWidth = margin.left + data.length * barWidth + margin.right;

//         /* This scale produces negative output for negatve input */
//         var yScale = d3.scaleLinear()
//             .domain([0, d3.max(data)])
//             .range([0, chartHeight]);

//         /*
//          * We need a different scale for drawing the y-axis. It needs
//          * a reversed range, and a larger domain to accomodate negaive values.
//          */
//         var yAxisScale = d3.scaleLinear()
//             .domain([d3.min(data), d3.max(data)])
//             .range([chartHeight - yScale(d3.min(data)), 0]);

//         var svg = d3.select('svg');
//         svg
//             .attr('height', chartHeight + 100)
//             .attr('width', chartWidth)
//             .style('border', '1px solid');

//         svg
//             .selectAll("rect")
//             .data(data)
//             .enter()
//             .append("rect")
//             .attr("x", function (d, i) { return margin.left + i * barWidth; })
//             .attr("y", function (d, i) { return chartHeight + 50 - Math.max(0, yScale(d)); })
//             .attr("height", function (d) { return Math.abs(yScale(d)); })
//             .attr("width", barWidth)
//             .style("fill", "grey")
//             .style("stroke", "black")
//             .style("stroke-width", "1px")
//             .style("opacity", function (d, i) { return 1 /*- (i * (1/data.length)); */ });

//         var yAxis = d3.axisLeft(yAxisScale);

//         svg.append('g')
//             .attr('transform', function (d) {
//                 return 'translate(' + margin.left + ', 0)';
//             })
//             .call(yAxis);


//         var xScale = d3.scaleLinear()
//             .domain(0, data.length * barWidth)
//             .range(0, chartWidth);

//         var xAxis = d3.axisBottom();


        // var svgWidth = 500, svgHeight = 350, barPadding = 10;
        // var barWidth = (svgWidth / sqArray.length - 5 );


        // var svg = d3.select('svg')
        //     .attr("width", svgWidth)
        //     .attr("height", svgHeight);

        // var barChart = svg.selectAll("rect")
        //     .data(sqArray)
        //     .enter()
        //     .append("rect")
        //     .attr("y", function (d) {
        //         return svgHeight - d * 2
        //     })
        //     .attr("height", function (d) {
        //         return d * 2
        //     })
        //     .attr("width", barWidth - barPadding)
        //     .attr("transform", function (d, i) {
        //         var translate = [barWidth * i, 0];
        //         return "translate(" + translate + ")";
    















// axios.get('https://sandbox.iexapis.com/stable/stock/AAPL/chart/1m?&filter=changePercent,date&token=Tpk_7191aab3200940d588ebad397e1e7e0d')
//     .then(function (response) {

        
//         const monday = [   
//                 "2020-01-06", "2020-01-13", "2020-01-20", "2020-01-27", 
//                 "2020-02-03", "2020-02-10", "2020-02-17", "2020-02-24",
//                 "2020-03-02", "2020-03-09", "2020-03-16", "2020-03-23", "2020-03-30",
//                 "2020-04-06", "2020-04-13", "2020-04-20", "2020-04-27",
//                 "2020-05-04", "2020-05-11", "2020-05-18", "2020-05-25",
//                 "2020-06-01", "2020-06-08", "2020-06-15", "2020-06-22", "2020-06-29",
//                 "2020-07-06", "2020-07-13", "2020-07-20", "2020-07-27",
//             ]
//         const tuesday = [   
//                 "2020-01-07", "2020-01-14", "2020-01-21", "2020-01-28", 
//                 "2020-02-04", "2020-02-11", "2020-02-18", "2020-02-25",
//                 "2020-03-03", "2020-03-10", "2020-03-17", "2020-03-24", "2020-03-31",
//                 "2020-04-07", "2020-04-14", "2020-04-21", "2020-04-28",
//                 "2020-05-05", "2020-05-12", "2020-05-19", "2020-05-26",
//                 "2020-06-02", "2020-06-09", "2020-06-16", "2020-06-23", "2020-06-30",
//                 "2020-07-07", "2020-07-14", "2020-07-21", "2020-07-28",
//             ]
//         const wednesday = [   
//                 "2020-01-01", "2020-01-08", "2020-01-15", "2020-01-22", "2020-01-29", 
//                 "2020-02-05", "2020-02-12", "2020-02-19", "2020-02-26",
//                 "2020-03-04", "2020-03-11", "2020-03-18", "2020-03-25",
//                 "2020-04-01", "2020-04-08", "2020-04-15", "2020-04-22", "2020-04-29",
//                 "2020-05-06", "2020-05-13", "2020-05-20", "2020-05-27",
//                 "2020-06-03", "2020-06-10", "2020-06-17", "2020-06-24",
//                 "2020-07-01", "2020-07-08", "2020-07-15", "2020-07-22", "2020-07-29",
//             ]
//         const thursday = [   
//                 "2020-01-02", "2020-01-09", "2020-01-16", "2020-01-23", "2020-01-30", ,
//                 "2020-02-06", "2020-02-13", "2020-02-20", "2020-02-27",
//                 "2020-03-05", "2020-03-12", "2020-03-19", "2020-03-26",
//                 "2020-04-02", "2020-04-09", "2020-04-16", "2020-04-23", "2020-04-30",
//                 "2020-05-07", "2020-05-14", "2020-05-21", "2020-05-28",
//                 "2020-06-04", "2020-06-11", "2020-06-18", "2020-06-25",
//                 "2020-07-02", "2020-07-09", "2020-07-16", "2020-07-23", "2020-07-30",
//             ]

//         const friday = [   
//                 "2020-01-03", "2020-01-10", "2020-01-17", "2020-01-24", "2020-01-31", ,
//                 "2020-02-07", "2020-02-14", "2020-02-21", "2020-02-28",
//                 "2020-03-06", "2020-03-13", "2020-03-20", "2020-03-27",
//                 "2020-04-03", "2020-04-10", "2020-04-17", "2020-04-24",
//                 "2020-05-01" ,"2020-05-08", "2020-05-15", "2020-05-22", "2020-05-29",
//                 "2020-06-05", "2020-06-12", "2020-06-19", "2020-06-26",
//                 "2020-07-03", "2020-07-10", "2020-07-17", "2020-07-24", "2020-07-31",
//             ]



//         let mondayChange = 0
//         let tuesdayChange = 0
//         let wednesdayChange = 0
//         let thursdayChange = 0
//         let fridayChange = 0

//         let mondayCount = 0
//         let tuesdayCount = 0
//         let wednesdayCount = 0
//         let thursdayCount = 0
//         let fridayCount = 0

//         let mondayMonthlyPercent = 0
//         let tuesdayMonthlyPercent = 0
//         let wednesdayMonthlyPercent = 0
//         let thursdayMonthlyPercent = 0
//         let fridayMonthlyPercent = 0


//         let aaplData = response.data

//         aaplData.forEach(el => {
//             let dailyChange = el.changePercent
//             let quoteDate = el.date

//             if (monday.includes(el.date)) {
//                 mondayCount += 1
//                 mondayChange += dailyChange
//                 mondayMonthlyPercent = (mondayChange / mondayCount)


//             } else if (tuesday.includes(el.date)) {
//                 tuesdayCount += 1
//                 tuesdayChange += dailyChange
//                 tuesdayMonthlyPercent = (tuesdayChange / tuesdayCount)

//             } else if (wednesday.includes(el.date)) {
//                 wednesdayCount += 1
//                 wednesdayChange += dailyChange
//                 wednesdayMonthlyPercent = (wednesdayChange / wednesdayCount)

//             } else if (thursday.includes(el.date)) {
//                 thursdayCount += 1
//                 thursdayChange += dailyChange
//                 thursdayMonthlyPercent = (thursdayChange / thursdayCount)

//             } else if (friday.includes(el.date)) {
//                 fridayCount += 1
//                 fridayChange += dailyChange
//                 fridayMonthlyPercent = (fridayChange / fridayCount)

//             }

//         })
//         console.log('')
//         console.log(mondayMonthlyPercent, 'aapl monday')
//         console.log(tuesdayMonthlyPercent, 'aapl tuesday')
//         console.log(wednesdayMonthlyPercent, 'aapl wednesday')
//         console.log(thursdayMonthlyPercent, 'aapl thursday')
//         console.log(fridayMonthlyPercent, 'aapl friday')  
//     })









// export const getamznThirtyDayAvg = () => {
    //  axios.get('https://sandbox.iexapis.com/stable/stock/AMZN/chart/1m?&filter=changePercent,date&token=Tpk_7191aab3200940d588ebad397e1e7e0d')
    //     .then(function (response) {


    //         const monday = ["2020-06-01", "2020-06-08", "2020-06-15", "2020-06-22"]
    //         const tuesday = ["2020-06-02", "2020-06-09", "2020-06-16", "2020-06-23"]
    //         const wednesday = ["2020-06-03", "2020-06-10", "2020-06-17", "2020-06-24"]
    //         const thursday = ["2020-06-04", "2020-06-11", "2020-06-18", "2020-06-25"]
    //         const friday = ["2020-06-05", "2020-06-12", "2020-06-19", "2020-06-26"]


    //         let mondayChange = 0
    //         let tuesdayChange = 0
    //         let wednesdayChange = 0
    //         let thursdayChange = 0
    //         let fridayChange = 0

    //         let mondayCount = 0
    //         let tuesdayCount = 0
    //         let wednesdayCount = 0
    //         let thursdayCount = 0
    //         let fridayCount = 0

    //         let mondayMonthlyPercent = 0
    //         let tuesdayMonthlyPercent = 0
    //         let wednesdayMonthlyPercent = 0
    //         let thursdayMonthlyPercent = 0
    //         let fridayMonthlyPercent = 0


    //         let amznData = response.data

    //         amznData.forEach(el => {
    //             let dailyChange = el.changePercent
    //             let quoteDate = el.date

    //             if (monday.includes(el.date)) {
    //                 mondayCount += 1
    //                 mondayChange += dailyChange
    //                 mondayMonthlyPercent = (mondayChange / mondayCount)


    //             } else if (tuesday.includes(el.date)) {
    //                 tuesdayCount += 1
    //                 tuesdayChange += dailyChange
    //                 tuesdayMonthlyPercent = (tuesdayChange / tuesdayCount)

    //             } else if (wednesday.includes(el.date)) {
    //                 wednesdayCount += 1
    //                 wednesdayChange += dailyChange
    //                 wednesdayMonthlyPercent = (wednesdayChange / wednesdayCount)

    //             } else if (thursday.includes(el.date)) {
    //                 thursdayCount += 1
    //                 thursdayChange += dailyChange
    //                 thursdayMonthlyPercent = (thursdayChange / thursdayCount)

    //             } else if (friday.includes(el.date)) {
    //                 fridayCount += 1
    //                 fridayChange += dailyChange
    //                 fridayMonthlyPercent = (fridayChange / fridayCount)

    //             }

    //         })
    //         console.log('')
    //         console.log(mondayMonthlyPercent, 'amzn monday')
    //         console.log(tuesdayMonthlyPercent, 'amzn tuesday')
    //         console.log(wednesdayMonthlyPercent, 'amzn wednesday')
    //         console.log(thursdayMonthlyPercent, 'amzn thursday')
    //         console.log(fridayMonthlyPercent, 'amzn friday')  
    //     })





    