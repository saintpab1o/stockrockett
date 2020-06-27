import { IEXCloudClient } from "node-iex-cloud";
import axios from 'axios'

const iex = new IEXCloudClient(fetch, {
    sandbox: true,
    publishable: "pk_16c53f86dc16458ea7482e9a864f0a99",
    version: "stable"
});


axios.get('https://cloud.iexapis.com/stable/stock/SQ/chart/1m?&filter=changePercent,date&token=pk_16c53f86dc16458ea7482e9a864f0a99')
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
        console.log(mondayMonthlyPercent)
        console.log(tuesdayMonthlyPercent) 
        console.log(wednesdayMonthlyPercent) 
        console.log(thursdayMonthlyPercent) 
        console.log(fridayMonthlyPercent)  
})
















    






