//id 로 찾고 싶으면 #, class 로 찾고 싶으면 . 을 활용!

// 아래에서, handleresize 로 인자 전달, handleresize() 로 인자전달은 차이가 있다.
// 전자는 내가 필요한 시점에서 호출이 되고, 후자는 지금 바로 호출하라는 뜻이다. "매우중요!"
const title = document.querySelector("#title");
const CLICKED_CLASS = "clicked";

function handleClick(){
    title.classList.toggle(CLICKED_CLASS);
}

function init(){
    title.addEventListener("click",handleClick);
}

init();  