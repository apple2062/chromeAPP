const weatherContainer = document.querySelector(".js-weather");

const API_KEY = "4c71681965fe7e134b9a82f19214b47c"; //https://home.openweathermap.org/api_keys 에서 회원가입 후 따온 내 API key 값
const COORDS = 'coords'; 

function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){  //then? 데이터가 우리에게 넘어오고 난 후, 즉 데이터가 완전히 들어오고 난 후 호출되는 함수로 여기서는 fetch 가 완전 끝난 후 호출 되는 함수이다. 
                            //fetch 로부터 서버 데이터 값을 완전히 받아오고 나야 다음 작업을 할 수 있기 떄문에 then 을 활용한 듯! 
        return response.json()

    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weatherContainer.innerText= `${temperature} @ ${place}` ;
    });  //데이터를 얻을 때 사용하는 함수 fetch
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoError(){ 
    console.log('Cant access geo location');
}

function handleGeoSuccess(position){ //좌표를 가져오는데 성공했을 때 호출되는 함수
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){ 
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);  //이게 잘 동작했나 보고싶다면, console 의 netword 창에 들어가서 맨아래 request 된 url 을 참고해봐.
    }
}

function init(){
    loadCoords();
}

init();