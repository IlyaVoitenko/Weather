let fiveDay = document.querySelector(".fiveDay")
console.log({fiveDay});
let apiKey = '363299d73e8f928e961676fcc902625c'
let pathImg = 'http://openweathermap.org/img/wn/'
let daysOfWeel = [{'Mon':'Monday'},{'Tue':'Tuesday'},{'Wed':'Wednesday'},{'Thu':'Thursday'},{'Fri':'Friday'},{'Sat':'Saturday'},{'Sun':'Sunday'}]
let monthOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]
let data = new Date()
let resDay 
let summFeelTemp = []
let day = ''
let cutDay = ''
let summ = 0
let count = 0
let result = 0
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=kyiv&lang=ua&units=metric&appid=363299d73e8f928e961676fcc902625c`)
.then(data=> data.json())
.then(dataWeather=>{
    dataWeather.list.forEach(i => {
        if(i.dt_txt.split(' ')[1] =='21:00:00'){ 
            // daysOfWeel[data.getDay(' 2021-04-24 21:00:00')]
            // console.log(resDay+ ' '+i.dt_txt);
            data = new Date(i.dt_txt).getDate(); 
            month =new Date(i.dt_txt).getMonth()
            console.log(monthOfYear[month]); 
            let resdate = monthOfYear[month]
            count++
            summ += i.main.feels_like + i.main.feels_like
            Math.ceil(summ)
            result = Math.trunc(summ/count)
            summFeelTemp.push(result)
            count= 0
            summ= 0
            renderFiveDay(fiveDay,data,resdate,summFeelTemp[0],i.weather[0].icon,i.weather[0].description)
        }else{
            count++
            summ += i.main.feels_like + i.main.feels_like
            Math.ceil(summ)
        }
    });
    function renderFiveDay(container,dayOfWeek,mounth,feelTemp,img,description) {
        container.innerHTML+=`
        <div>
            <h3>${dayOfWeek} ${mounth}</h3>
            <img src="http://openweathermap.org/img/wn/${img}@2x.png">
            <h4>${feelTemp}</h4>
            <p>${description}</p>
        </div>
        `
    }
    console.log( 'summFeelTemp : '+summFeelTemp);
})
