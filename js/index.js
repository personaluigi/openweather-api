const date = new Date()
const hour = date.getHours()

window.addEventListener('DOMContentLoaded', () => {
    if (hour < 12 && hour > 1) {
        document.body.style.backgroundImage = 'url(./images/morning.jpg)'
    } else if (hour > 18) {
        document.body.style.backgroundImage = 'url(./images/night.jpg)'
    } else if (hour > 12 && hour < 18) {
        document.body.style.backgroundImage = 'url(./images/afternoon.jpg)'
    }
})

const btnSearch = document.querySelector('.search-btn')

const cityContent = () => {
    const city = document.getElementById('city-search').value
    const key = '83724f156a087d69c48a2308aed9652a'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`

    const cityTitle = document.querySelector('.title')
    const cityImg = document.querySelector('.img-icon')
    const cityName = document.querySelector('.city-name')
    const cityTemp = document.querySelector('.temp')
    const cityFeels = document.querySelector('.feels-like')
    const cityHumidity = document.querySelector('.humidity')
    const cityWind = document.querySelector('.wind')

    if (city !== '' && city !== null && city !== undefined) {
        axios.get(url)
            .then(response => {
                const country = response.data.sys.country
                const image = response.data.weather[0].icon
                const temp = Math.round(response.data.main.temp - 273)
                const tempF = Math.round((response.data.main.temp - 273.15) * 9 / 5 + 32)
                const feelsLike = Math.round(response.data.main.feels_like - 273)
                const humidity = response.data.main.humidity
                const wind = response.data.wind.speed * 2.23694

                function upperCaseWord(upper) {
                    let words = upper.split(' ')
                    for (let i = 0; i < words.length; i++) {
                        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
                    }
                    return words.join(' ')
                }

                const cityUpperWord = upperCaseWord(city);

                cityTitle.textContent = `Clima em ${cityUpperWord}`
                cityImg.src = `https://openweathermap.org/img/wn/${image}@2x.png`
                cityName.textContent = `${cityUpperWord}, ${country.toUpperCase()}`
                cityTemp.innerHTML = `Temepratura: <strong>${temp}ºC / ${tempF}ºF</strong>`
                cityFeels.innerHTML = `Sensação Térmica: <strong>${feelsLike}ºC</strong>`
                cityHumidity.textContent = `Umidade: ${humidity}%`
                cityWind.textContent = `Vento: ${wind.toFixed(1)} mph`

                inputCity.value = ''
            })
            .catch(error => {
                console.log('Cidade não existe', error)
            })
    }
}

btnSearch.addEventListener('click', cityContent)

const inputCity = document.getElementById('city-search')

inputCity.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        cityContent()
    }
})