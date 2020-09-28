const todoForm = document.querySelector(".js-toDoForm");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-toDoList");  //ul tag

const TODOS_LS = 'toDos';

const toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos)); //JSON.stringify 는 javascript 의 object 를 string 으로 바꿔주는 역할 
}

function paintToDo(text){ //text 는 사용자가 적은 todoInput 의 value 임.
    const delBtn = document.createElement("button");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const newId = toDos.length + 1; //맨 첨엔 toDos array 가 비어있으니까 newid 값은 1이 될 것임
    delBtn.innerText = "❌";
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    todoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };

    toDos.push(toDoObj); //toDos array 안에 object element 를 넣어줌
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintToDo(currentValue);
    todoInput.value = "";
    
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); //toDos 를 가져와서, 이를 JSON.parse를 통해 자바스크립트 object로 변환해준다.
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        }) //for each = toDos에 있는 각각에 대해서 function 을 실행. for each는 array 를 위한 function이다.
    }
}

function init(){
    loadToDos();
    todoForm.addEventListener("submit",handleSubmit);
}
init();