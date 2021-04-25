let hourlyForcast = document.querySelector('.hourlyForcast')
let fiveDay = document.querySelector(".fiveDay")
let apiKey = '363299d73e8f928e961676fcc902625c'
let pathImg = 'http://openweathermap.org/img/wn/'
let daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
let monthOfYear = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
let id =''
let arrayDaysWeek =[]
let summ = 0
let count = 0
let result = 0
let resMonth = ''
let resDayOfWeek= ''
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=kyiv&lang=ru&units=metric&appid=${apiKey}`)
.then(data=> data.json())
.then(dataWeather=>{
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
            console.log({id});
            renderFiveDay(fiveDay,day,resDayOfWeek,resMonth,resultTemp,i.weather[0].icon,i.weather[0].description,id)
            arrayDaysWeek = document.querySelectorAll('.dayOfWeek')
        }else{
            count++
            summ += i.main.feels_like + i.main.feels_like
            Math.ceil(summ)
        }
    });
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=kyiv&lang=ru&units=metric&appid=${apiKey}`)
    .then(json=>json.json())
    .then(data=>{
        //console.log({arrayDaysWeek});
        arrayDaysWeek.forEach(i=>{
            i.addEventListener('click',()=>{
                    hourlyForcast.innerHTML=""
                    data.list.forEach(item=>{
                    console.log(item.dt_txt.split(' ')[1]);
                    i.id.split(' ')[0]
                    if (item.dt_txt.split(' ')[0] == i.id) {
                        hourlyForcast.innerHTML+=`
                        <div>
                            <h3>${item.dt_txt.substr(10)}</h3>
                            <img src="${pathImg}${item.weather[0].icon}@2x.png">
                            <h4>${item.weather[0].main}</h4>
                            <h4>Max : ${item.main.temp_max}</h4>
                            <h4>Feel : ${item.main.feels_like}</h4>
                        </div>
                        `
                    }
                    // if (item.==i.id) {
                    //     alert(item.dt_txt+ '::'+i.id)
                    // }else{
                    //     console.log(false);
                    // }
                })
            })
        })
        console.log({data});
    })
})
    function renderFiveDay(container,day,dayOfWeek,mounth,feelTemp,img,description,id) {
        container.innerHTML+=`
        <div class="dayOfWeek" id="${id}">
            <h2>${dayOfWeek}</h2>
            <h3>${day} ${mounth}</h3>
            <img src="${pathImg}${img}@2x.png">
            <h1>${feelTemp}&deg;C</h1>
            <p>${description}</p>
        </div>
        `
    }
