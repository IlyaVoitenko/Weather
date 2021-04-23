let fiveDay = document.querySelector(".fiveDay")
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
let summ = 0
let count = 0
let result = 0
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=kyiv&lang=ru&units=metric&appid=${apiKey}`)
.then(data=> data.json())
.then(dataWeather=>{
    dataWeather.list.forEach(i => {
        if(i.dt_txt.split(' ')[1] =='21:00:00'){ 
            data = new Date(i.dt_txt).getDate(); 
            month =new Date(i.dt_txt).getMonth()
            let resdate = monthOfYear[month]
            count++
            summ += i.main.feels_like + i.main.feels_like
            Math.ceil(summ)
            result = Math.trunc(summ/count)
            count= 0
            summ= 0
            renderFiveDay(fiveDay,data,resdate,result,i.weather[0].icon,i.weather[0].description)
        }else{
            count++
            summ += i.main.feels_like + i.main.feels_like
            Math.ceil(summ)
        }
    });
})
 function renderFiveDay(container,dayOfWeek,mounth,feelTemp,img,description) {
        container.innerHTML+=`
        <div class="dayOfWeek">
            <h3>${dayOfWeek} ${mounth}</h3>
            <img src="${pathImg}${img}@2x.png">
            <h1>${feelTemp}&deg;C</h1>
            <p>${description}</p>
        </div>
        `
    }