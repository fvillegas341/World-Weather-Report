const apiKey = '11y6adimU2t8G37UGbsG0Y6r0MibXi5W'; //create a variable for the API Key


//get weather information
const getWeather = async (id) => {
    const base = "https://dataservice.accuweather.com/currentconditions/v1/"; 
    const query = `${id}?apikey=${apiKey}`;


    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};




//get city information
const getLocation = async (city) => {
    const base = "https://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${apiKey}&q=${city}`;


    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};


