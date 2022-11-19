const API_KEY = '076a64b330326bece68e9a81c409f4b4';

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data));
}

const setWeatherData = data =>{
	console.log(data);
    const weatherData = {
        location: data.name,
        description : data.weather[0].main, //Ponemos el indice 0 porque es el metodo main, del primer objeto weather 
        humidity : data.main.humidity,
        pressure : data.main.pressure,
        temperature : data.main.temp,
        date : getDate(),

    }
 Object.keys(weatherData).forEach(key =>{     //Utilizamos el objeto, Object y el metodo keys, que va a iterar en el objeto que le señalemos por los valores de la izquierda osea las keys. Devolviendo como parametro la key[i]. Con el document.getElementById lo que hacemos es que como cada una de nuestras keys tiene un nombre correspondiente a elemento en html, lo que hacemos es seleccionar por id con key, cada vez que el forEach itera
    document.getElementById(key).textContent = weatherData[key]
 })
  cleanUp()
}

const cleanUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');
     loader.style.display = 'none';
    container.style.display ='flex';
}


const getDate = ()=>{
    let date = new Date;
    return `${date.getDate()}-${('0'+ (date.getMonth()+ 1)).slice(-2)}-${date.getFullYear()}`  
}


const onLoad = ()=>{
	navigator.geolocation.getCurrentPosition(fetchData);
}

