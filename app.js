window.addEventListener('load', ()=>{
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector('.location-timezone');
    let picture = document.querySelector('#icon');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');


    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position)
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=65b2843c51dc16040e4e4e83cc52e02a`;
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const {temp} = data.current;
                    const {main, description, icon} = data.current.weather[0];
                    //set DOM Elements from API
                    cels = (temp-273.15).toFixed(1);
                    temperatureDegree.textContent = cels;
                    temperatureDescription.textContent = main + ': ' + description;
                    locationTimezone.textContent = data.timezone;

                
                    picture.src = `http://openweathermap.org/img/wn/${icon}.png`;
                    var fahr = (1.8*(temp-273)+32).toFixed(1);

                    //change temperature to celsius/fahrenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === 'C'){
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = fahr;
                        }else{
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = cels;
                        }
                    }); 
                });
            });
        }
});