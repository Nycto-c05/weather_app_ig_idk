

function handleFormSubmit(event) {
    const apiKey = '83ddd43e09847041233012';//ecpired anyway
    let city = undefined;
    // Prevent the defaut form submission
    event.preventDefault();

    const inputValue = document.getElementById('input').value;

    console.log('Input Value:', inputValue);

    city = inputValue;
    let res = undefined
    if (city) {
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
        currentWeather(apiUrl)
            .then(data => {
                res = data
                console.log(data);
                console.log(data.current.air_quality);
                HTMLres(res);
            })
            .catch(err => console.log('Error :', err.message))
        document.getElementById('input').value = ''

        
    }
    else {

    }
}

const HTMLres = (res) => {
    let location = document.getElementById('Location').textContent;
    document.getElementById('Location').textContent = res.location.name+' City, '+res.location.region+', '+res.location.country;
    console.log(location)

    const imgElement = document.getElementById('fav');

        // Set the new source URL
        const newSrc = res.current.condition.icon;
        console.log(newSrc)
        // Change the src attribute
        imgElement.src = newSrc;

    let temp = document.getElementById('temp').textContent;
        document.getElementById('temp').textContent = res.current.temp_c + '°C | '+ res.current.temp_f + '°F'
        console.log(temp)

    const ulElement = document.getElementById('list');

        ulElement.style.listStyleType = 'circle';

    let humid = document.getElementById('humid').textContent;
        document.getElementById('humid').textContent = 'Humidity: '+res.current.humidity+'%'
        console.log(humid)

    let wind = document.getElementById('wind').textContent;
    document.getElementById('wind').textContent = 'Wind: '+res.current.wind_kph+' kph'

}

const currentWeather = async (apiUrl) => {
    const res = await fetch(apiUrl);

    if (res.status !== 200) {
        throw new Error('Can\'t fetch from URL');
    }

    const data = await res.json()
    // console.log(data)

    return data
}




