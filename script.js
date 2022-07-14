const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const body = document.querySelector('body');
const text = document.querySelector('h1');

//function responsible for updating the ui of the responses

const updateUI = (data) => {

    //destructuring properties
    const {cityDetails, weather} = data;

   

    //update details template in the html

    details.innerHTML =`
        <h5 class="my-3">${cityDetails.LocalizedName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
        </div>
    `;

    // updating the night/day & icon imgs
    const iconSrc = `${weather.WeatherIcon}.svg`;

    icon.setAttribute('src', iconSrc);

    //tenary operator for if/else statement

    let timeSrc = weather.IsDayTime ? 'day.svg' : 'night.svg';
    time.setAttribute('src', timeSrc);

    //update title text color
    let textColor = weather.IsDayTime ? 'text-dark text-center my-4' : "text-light text-center my-4";
    text.setAttribute('class', textColor);

    //update background of the body based on the IsDayTime

    let bodyStyle = weather.IsDayTime ? 'background-image: url("daytime.jpg")' : 'background-image: url("nighttime.jpg")';
    body.setAttribute('style', bodyStyle);


    //remove the d-none class if present

    if (card.classList.contains('d-none')){
        card.classList.remove('d-none')
    };
};



//function responsible for updating the city and weather
const updateCity = async (city) => {
    const cityDetails = await getLocation(city);
    const weather = await getWeather(cityDetails.Key); 
    

    return {cityDetails, weather};
};

form.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();


    //get city value
    const city = form.city.value.trim();
    form.reset();

    //update the ui with the new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

     //set local storage

     localStorage.setItem('city', city);
});

if(localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
};

