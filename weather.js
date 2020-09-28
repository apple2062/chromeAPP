const API_KEY = "4c71681965fe7e134b9a82f19214b47c"; //https://home.openweathermap.org/api_keys 에서 회원가입 후 따온 내 API key 값
const COORDS = 'coords';


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
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){ 
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{

    }
}

function init(){
    loadCoords();
}

init();