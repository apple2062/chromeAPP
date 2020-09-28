 const body = document.querySelector("body");

 const IMG_NUMBER = 5;

 function handleImgLoad(){
     console.log("finished loading");
 }

 function paintImage(imgNumber){
     const image = new Image();
     image.src = `images/photo${imgNumber+1}.jpg`;
     image.classList.add('backgroundImage');
     body.appendChild(image);
 }

 function generateRandom(){ //photo{num} 형태의 jpg 파일 중 무작위로 불러오기위한 {num} 생성 위한 함수
     const number=  Math.floor(Math.random() * 5);
     return number;
 }

 function init(){
    const randomNumber = generateRandom();
    paintImage(randomNumber);
 }
 init();