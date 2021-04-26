let id =''
let city = 'kyiv'
let summ = 0
let count = 0
let today = document.querySelector('.today')
let apiKey = '363299d73e8f928e961676fcc902625c'
let result = 0
let fiveDay = document.querySelector(".fiveDay")
let pathImg = 'http://openweathermap.org/img/wn/'
let todayImg = document.querySelector('.todayImg')
let resMonth = ''
let todayTemp = document.querySelector('.todayTemp')
let arrayCount =[]
let daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
let monthOfYear = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
let resDayOfWeek= ''
let todayForcast = document.querySelector('.todayForcast')
let sumPostToday = document.querySelector('.sumPostToday')
let hourlyForcast = document.querySelector('.hourlyForcast')
let arrayDaysWeek =[]
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=en&units=metric&appid=${apiKey}`)
.then(data=> data.json())
.then(dataWeather=>{
console.log({dataWeather});
    dataWeather.list.forEach(i => {
        if(i.dt_txt.split(' ')[1] =='21:00:00'){ 
            day = new Date(i.dt_txt).getDate(); 
            dayOfWeek = new Date(i.dt_txt).getDay()
            month =new Date(i.dt_txt).getMonth()
            resMonth = monthOfYear[month]
            resDayOfWeek = daysOfWeek[dayOfWeek]
            count++
            summ += i.main.feels_like + i.main.feels_like
            Math.ceil(summ)
            resultTemp = Math.trunc(summ/count)
            count= 0
            summ= 0
            id=i.dt_txt.split(' ')[0]
            renderFiveDay(fiveDay,day,resDayOfWeek,resMonth,resultTemp,i.weather[0].icon,i.weather[0].description,id)
            arrayDaysWeek = document.querySelectorAll('.dayOfWeek')
        }else{
            count++
            summ += i.main.feels_like + i.main.feels_like
            Math.ceil(summ)
        }
    });
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&appid=${apiKey}`)
    .then(json=>json.json())
    .then(data=>{
        arrayDaysWeek.forEach(i=>{
             i.addEventListener('click',()=>{
                hourlyForcast.innerHTML=""
                    data.list.forEach(item=>{
                    i.id.split(' ')[0]
                    if (item.dt_txt.split(' ')[0] == i.id) {
                        hourlyForcast.innerHTML+=`
                        <div>
                          <h4 class="fonts  white">${item.dt_txt.split(' ')[1]}</h4>
                          <img  src="${pathImg}${item.weather[0].icon}@2x.png">
                          <h4 class="fonts  white">${item.weather[0].main}</h4>
                          <h4 class="fonts  white">Max : ${ Math.ceil(item.main.temp_max)}&deg;C</h4>
                          <h4 class="fonts  white">Feel : ${Math.ceil(item.main.feels_like)}&deg;C</h4>
                          <h4 class="fonts wind white">Wind speed : ${Math.ceil(item.wind.speed)} meter / sec</h4>
                        </div>
                       `
                        }
                    })
                })
            })
        })
})
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&appid=${apiKey}`)
.then(json=>json.json())
.then(dataToday=>{
    let sunrise =(getHours(dataToday.city.sunrise))
    let sunset =(getHours(dataToday.city.sunset));
    console.log({dataToday});
    todayImg.innerHTML = `
    <img src="${pathImg}${dataToday.list[0].weather[0].icon}@2x.png">
    `
    todayTemp.innerHTML = `
    <h1 class="fonts white">${Math.ceil(dataToday.list[0].main.temp)}&deg;C</h1>
    <h3 class="fonts white">Real feel ${Math.ceil(dataToday.list[0].main.feels_like)}&deg;C</h3>
    `
    sumPostToday.innerHTML = `
    <h3 class="fonts white">Sunrise ${sunrise}</h3>
    <h3 class="fonts white">Sunset  ${sunset}</h3>
    `
    dataToday.list.forEach(item => {
        if (item.dt_txt.split(' ')[1]=='21:00:00') {
            count++
            arrayCount.push(count)
            count=0
        }else{
            count++
        }
    });
    dataToday.list.length = arrayCount[0]
    dataToday.list.forEach(i=>{
         todayForcast.innerHTML+=`
            <div>
                <h4  class="fonts white">${i.dt_txt.split(' ')[1]}</h4>
                <img src="${pathImg}${i.weather[0].icon}@2x.png">
                <h4  class="fonts white">${i.weather[0].main}</h4>
                <h4  class="fonts white">${Math.ceil(i.main.temp)}&deg;</h4>
                <h4  class="fonts white">${Math.ceil(i.main.feels_like)}&deg;</h4>
                <h4  class="fonts white">${Math.ceil(i.wind.speed)}</h4>
            </div>
            `
    })
    console.log(dataToday.list);
     console.log({arrayCount});
})
    function renderFiveDay(container,day,dayOfWeek,mounth,feelTemp,img,description,id) {
        container.innerHTML+=`
        <div class="dayOfWeek" id="${id}">
            <h2 class="fonts blue">${dayOfWeek}</h2>
            <h3 class="fonts white">${day} ${mounth}</h3>
            <img src="${pathImg}${img}@2x.png">
            <h1 class="fonts white">${Math.ceil(feelTemp)}&deg;C</h1>
            <p class="fonts white">${description}</p>
        </div>
        `
    }
    function getHours(millisec) {
        var date = new Date(millisec * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedTime = hours + ':' + minutes.substr(-2) 
        return formattedTime
    }
   
