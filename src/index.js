import { IEXCloudClient } from "node-iex-cloud";
import axios from 'axios'

 import * as d3 from 'd3'


const iex = new IEXCloudClient(fetch, {
    sandbox: true,
    publishable: "Tpk_7191aab3200940d588ebad397e1e7e0d",
    version: "stable"
});


//  export const getSqThirtyDayAvg = () => { 
axios.get('https://sandbox.iexapis.com/stable/stock/SQ/chart/1m?&filter=changePercent,date&token=Tpk_7191aab3200940d588ebad397e1e7e0d')
    .then(function (response) {


        const monday = ["2020-06-01", "2020-06-08", "2020-06-15", "2020-06-22"]
        const tuesday = ["2020-06-02", "2020-06-09", "2020-06-16", "2020-06-23"]
        const wednesday = ["2020-06-03", "2020-06-10", "2020-06-17", "2020-06-24"]
        const thursday = ["2020-06-04", "2020-06-11", "2020-06-18", "2020-06-25"]
        const friday = ["2020-06-05", "2020-06-12", "2020-06-19", "2020-06-26"]


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
   

    let sqData = response.data
      
    sqData.forEach(el => {
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
        console.log(mondayMonthlyPercent, 'sq monday')
        console.log(tuesdayMonthlyPercent, 'sq tuesday') 
        console.log(wednesdayMonthlyPercent, 'sq wednesday') 
        console.log(thursdayMonthlyPercent, 'sq thursday') 
        console.log(fridayMonthlyPercent, 'sq friday')  

         var data = [mondayMonthlyPercent, tuesdayMonthlyPercent, wednesdayMonthlyPercent, thursdayMonthlyPercent, fridayMonthlyPercent]
        // let sqArray = [50, 20, 5, 30, 10]


        // var data = [100, -100, -150, 55, 150, 120, 450, 980, 1200];

        var leftMargin = 50;  // Space to the left of first bar; accomodates y-axis labels
        var rightMargin = 10; // Space to the right of last bar
        var margin = { left: leftMargin, right: rightMargin, top: 10, bottom: 10 };
        var barWidth = 30;  // Width of the bars
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
            .style("fill", "grey")
            .style("stroke", "black")
            .style("stroke-width", "1px")
            .style("opacity", function (d, i) { return 1 /*- (i * (1/data.length)); */ });

        var yAxis = d3.axisLeft(yAxisScale);

        svg.append('g')
            .attr('transform', function (d) {
                return 'translate(' + margin.left + ', 0)';
            })
            .call(yAxis);

    /*
    var xScale = d3.scaleLinear()
                    .domain(0, data.length * barWidth)
                    .range(0, chartWidth);

    var xAxis = d3.axisBottom();
    */

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
    })



// // export const getAaplThirtyDayAvg = () => {
//     axios.get('https://cloud.iexapis.com/stable/stock/aapl/chart/1m?&filter=changePercent,date&token=pk_16c53f86dc16458ea7482e9a864f0a99')
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
// // }



// // export const getTslaThirtyDayAvg = () => {
//     axios.get('https://cloud.iexapis.com/stable/stock/tsla/chart/1m?&filter=changePercent,date&token=pk_16c53f86dc16458ea7482e9a864f0a99')
//         .then(function (response) {


//             const monday = ["2020-06-01", "2020-06-08", "2020-06-15", "2020-06-22"]
//             const tuesday = ["2020-06-02", "2020-06-09", "2020-06-16", "2020-06-23"]
//             const wednesday = ["2020-06-03", "2020-06-10", "2020-06-17", "2020-06-24"]
//             const thursday = ["2020-06-04", "2020-06-11", "2020-06-18", "2020-06-25"]
//             const friday = ["2020-06-05", "2020-06-12", "2020-06-19", "2020-06-26"]


//             let mondayChange = 0
//             let tuesdayChange = 0
//             let wednesdayChange = 0
//             let thursdayChange = 0
//             let fridayChange = 0

//             let mondayCount = 0
//             let tuesdayCount = 0
//             let wednesdayCount = 0
//             let thursdayCount = 0
//             let fridayCount = 0

//             let mondayMonthlyPercent = 0
//             let tuesdayMonthlyPercent = 0
//             let wednesdayMonthlyPercent = 0
//             let thursdayMonthlyPercent = 0
//             let fridayMonthlyPercent = 0


//             let tslaData = response.data

//             tslaData.forEach(el => {
//                 let dailyChange = el.changePercent
//                 let quoteDate = el.date

//                 if (monday.includes(el.date)) {
//                     mondayCount += 1
//                     mondayChange += dailyChange
//                     mondayMonthlyPercent = (mondayChange / mondayCount)


//                 } else if (tuesday.includes(el.date)) {
//                     tuesdayCount += 1
//                     tuesdayChange += dailyChange
//                     tuesdayMonthlyPercent = (tuesdayChange / tuesdayCount)

//                 } else if (wednesday.includes(el.date)) {
//                     wednesdayCount += 1
//                     wednesdayChange += dailyChange
//                     wednesdayMonthlyPercent = (wednesdayChange / wednesdayCount)

//                 } else if (thursday.includes(el.date)) {
//                     thursdayCount += 1
//                     thursdayChange += dailyChange
//                     thursdayMonthlyPercent = (thursdayChange / thursdayCount)

//                 } else if (friday.includes(el.date)) {
//                     fridayCount += 1
//                     fridayChange += dailyChange
//                     fridayMonthlyPercent = (fridayChange / fridayCount)

//                 }

//             })
//             console.log('')
//             console.log(mondayMonthlyPercent, 'tsla monday')
//             console.log(tuesdayMonthlyPercent, 'tsla tuesday')
//             console.log(wednesdayMonthlyPercent, 'tsla wednesday')
//             console.log(thursdayMonthlyPercent, 'tsla thursday')
//             console.log(fridayMonthlyPercent, 'tsla friday')  
//         })
// // }



// // export const getamznThirtyDayAvg = () => {
//     axios.get('https://cloud.iexapis.com/stable/stock/amzn/chart/1m?&filter=changePercent,date&token=pk_16c53f86dc16458ea7482e9a864f0a99')
//         .then(function (response) {


//             const monday = ["2020-06-01", "2020-06-08", "2020-06-15", "2020-06-22"]
//             const tuesday = ["2020-06-02", "2020-06-09", "2020-06-16", "2020-06-23"]
//             const wednesday = ["2020-06-03", "2020-06-10", "2020-06-17", "2020-06-24"]
//             const thursday = ["2020-06-04", "2020-06-11", "2020-06-18", "2020-06-25"]
//             const friday = ["2020-06-05", "2020-06-12", "2020-06-19", "2020-06-26"]


//             let mondayChange = 0
//             let tuesdayChange = 0
//             let wednesdayChange = 0
//             let thursdayChange = 0
//             let fridayChange = 0

//             let mondayCount = 0
//             let tuesdayCount = 0
//             let wednesdayCount = 0
//             let thursdayCount = 0
//             let fridayCount = 0

//             let mondayMonthlyPercent = 0
//             let tuesdayMonthlyPercent = 0
//             let wednesdayMonthlyPercent = 0
//             let thursdayMonthlyPercent = 0
//             let fridayMonthlyPercent = 0


//             let amznData = response.data

//             amznData.forEach(el => {
//                 let dailyChange = el.changePercent
//                 let quoteDate = el.date

//                 if (monday.includes(el.date)) {
//                     mondayCount += 1
//                     mondayChange += dailyChange
//                     mondayMonthlyPercent = (mondayChange / mondayCount)


//                 } else if (tuesday.includes(el.date)) {
//                     tuesdayCount += 1
//                     tuesdayChange += dailyChange
//                     tuesdayMonthlyPercent = (tuesdayChange / tuesdayCount)

//                 } else if (wednesday.includes(el.date)) {
//                     wednesdayCount += 1
//                     wednesdayChange += dailyChange
//                     wednesdayMonthlyPercent = (wednesdayChange / wednesdayCount)

//                 } else if (thursday.includes(el.date)) {
//                     thursdayCount += 1
//                     thursdayChange += dailyChange
//                     thursdayMonthlyPercent = (thursdayChange / thursdayCount)

//                 } else if (friday.includes(el.date)) {
//                     fridayCount += 1
//                     fridayChange += dailyChange
//                     fridayMonthlyPercent = (fridayChange / fridayCount)

//                 }

//             })
//             console.log('')
//             console.log(mondayMonthlyPercent, 'amzn monday')
//             console.log(tuesdayMonthlyPercent, 'amzn tuesday')
//             console.log(wednesdayMonthlyPercent, 'amzn wednesday')
//             console.log(thursdayMonthlyPercent, 'amzn thursday')
//             console.log(fridayMonthlyPercent, 'amzn friday')  
//         })
// // }




