let  fiveDay = document.querySelector('.fiveDayContainer')
let apiKey = '363299d73e8f928e961676fcc902625c'
let pathImg = 'http://openweathermap.org/img/wn/'
let summFeelTemp = []
   let summ = 0
   let count = 0
   let result = 0

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=kyiv&lang=ua&units=metric&appid=${apiKey}`)
.then(data=> data.json())
.then(data=>{
    data.list.forEach(i => {
        if(i.dt_txt.split(' ')[1] =='21:00:00'){ 
            count++
            summ += i.main.feels_like + i.main.feels_like
            Math.ceil(summ)
            result = Math.trunc(summ/count)
            summFeelTemp.push(result)
            count= 0
            summ= 0
        }else{
            count++
            summ += i.main.feels_like + i.main.feels_like
            Math.ceil(summ)
        }
        console.log({summFeelTemp});
    });
})