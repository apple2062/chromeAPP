const todoForm = document.querySelector(".js-toDoForm");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-toDoList");  //ul tag

const TODOS_LS = 'toDos';

let toDos = []; //    toDos = cleanToDos; (line17 에서 이렇게 대입하기 위해 const 대신 let 으로 선언)


function deleteToDo(event){
      const btn = event.target;
      const li = btn.parentNode; //li = btn.target.parendNode;
      todoList.removeChild(li);

      /*filter 는 함수 하나를 실행시킨다. 이는 for each에서 function을 실행하는 것과 같이 각각의 item 과 같이 실행 될것이다. 
        filter 는 array 를 하나 만들고, 함수가 true 를 return 하는 item 들만 return 해준다!
        즉, filter 는 array 의 모든 아이템을 통해 인자로 전달된 함수를 실행하고 그 안에서 true 인 아이템들만 가지고 새로운 array 를 만듦*/
      const cleanToDos = toDos.filter(function(toDo){ 
        return toDo.id !== parseInt(li.id)   //li.id 가 toDd.id 와 같지 않은 놈들을(li에 없는 id 인 toDos 를 체크하고 싶음_그것이 우리가 지우고 싶은 리스트)array 로 반환하기 +
                                             // toDd.id >> INT li.id>>STRING so, li.id have to be changed STRING TO INT
      });

      toDos = cleanToDos;
      saveToDos();

}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos)); //JSON.stringify 는 javascript 의 object 를 string 으로 바꿔주는 역할 
}

function paintToDo(text){ //text 는 사용자가 적은 todoInput 의 value이고 , 이 함수를 통해 tag 를 우리가 직접 만들것임!
    const delBtn = document.createElement("button");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const newId = toDos.length + 1; //맨 첨엔 toDos array 가 비어있으니까 newid 값은 1이 될 것임
    delBtn.innerText = "❌";

    delBtn.addEventListener("click",deleteToDo);  //사용자가 삭제 버튼 클릭 했을 때 이벤트

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
    event.preventDefault(); //submit 버튼 눌렀을 때, 새로고침 되는 현상을 방지하기 위함. 
    const currentValue = todoInput.value;
    paintToDo(currentValue);
    todoInput.value = "";
}


function loadToDos(){ //local 에서 todolist 목록 불러오기
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