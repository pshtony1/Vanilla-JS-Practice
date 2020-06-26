const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // Change Object to String
}

function deleteToDo(e) {
    const btn = event.target;
    const li = btn.parentNode;

    toDoList.removeChild(li);

    // 함수의 리턴이 true인 놈만 골라서 다시 Array를 구성함.
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });

    toDos = cleanToDos;
    saveToDos();
}

function paintToDo(text) {
    const li = document.createElement("li");

    const delBtn = document.createElement("button");
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo);

    const span = document.createElement("span");
    span.innerText = "  " + text;

    const newId = toDos.length + 1;

    // Create List
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;

    // Append to HTML
    toDoList.appendChild(li);

    // CREATE DATA
    const toDoObj = {
        id: newId,
        text: text,
    };

    toDos.push(toDoObj);
    saveToDos(); // Save into Local Storage
}

function handleSubmit(e) {
    e.preventDefault();
    if (toDoInput.value != "") {
        const currentValue = toDoInput.value;
        paintToDo(currentValue);
    }
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);

    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos); // Change String to Object

        // Get each of Objects
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
