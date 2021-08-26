const input = document.querySelector(".task-info-input");
const description = document.querySelector(".task-type-input");
const due_date = document.querySelector(".task-date-input");
const addButton = document.querySelector(".task-add");
const showunfulfilledButton = document.querySelector(".incompleted");
const showAllButton = document.querySelector(".all");
const listHdr = document.querySelector(".right-list-h3");
const todoList = document.querySelector(".list-flex");
const check = document.querySelector(".list-item-checkbox");
const listValue = document.querySelector(".list-item-value");

let slate = [];
let url = 'http://localhost:3000/tasks'

addButton.addEventListener("click", createItem);
showunfulfilledButton.addEventListener("click", showUnfulfilled);
showAllButton.addEventListener("click", showAll);

function render() {
    if (slate.length == 0) {
        setListHeader() 
    } else {
        resetPlaceholder()
        createBoard()
    }
}
 

function getTodosList() {
    return getData()
    .then(date => {
        return date;
    });
}
   
function createItem() {
    let typeBC = ["#ffecb5", "#e2bbff", "#b6ffee", "#ffb4c0", "#bbfaff"];
    if (input.value === "") {
        return alert("Empty title!");
    }
    const todo = {
        value: input.value,
        done: false,
        description: description.value,
        deadline: due_date.value ? new Date(due_date.value).toLocaleDateString() : "",
        labelColor: typeBC[Math.floor(Math.random() * typeBC.length)]
    };
    description.value = "";
    input.value = "";
    due_date.value = "";
    listHdr.innerHTML = "Add a task to begin.";
    todoList.innerHTML = "";
    slate.unshift(todo);
    createBoard();
    saveTodoOnServer(todo)
}


function createBoard() {
    slate.forEach(createSingleTodo);
}

function createSingleTodo(el) {
    const todo = document.createElement("div"),
    checkbox = document.createElement('input'),
        titleDiv = document.createElement("div"),
        descDiv = document.createElement("div"),
        dateDiv = document.createElement("div"),
        RemoveTaskById = document.createElement("div");
    
    todoList.appendChild(todo);
    printTodo(todo, el);

    todo.appendChild(checkbox);
    createCheckbox(checkbox, el);

    todo.appendChild(titleDiv);
    printTitleDiv(titleDiv, el);

    todo.appendChild(descDiv);
    createRemoveTaskById(RemoveTaskById);

    todo.appendChild(dateDiv);
    printDescDiv(descDiv, el);

    todo.appendChild(RemoveTaskById);
    createDateDiv(dateDiv, el);

    RemoveTaskById.onclick = RemoveDiv
    checkbox.onclick = setDoneState
    return todo;
}

// function createSingleTodo(todoItem) {
//     const todoNode = document.createElement("div");
//     todoNode.appendChild(
//         createTodo(todoItem)
//         ,createCheckbox(todoItem)
//         ,createTitle(todoItem)
//         ,createRemoveTaskById(todoItem)
//         ,createDesc(todoItem)
//         ,createDate(todoItem)
//     )
//     return todoNode;
// }

function createTodo(parentDiv, el){
    parentDiv.classList.add("list-item");
    parentDiv.id = el.id;
}

async function setDoneState() {
    let div = this.parentNode;
    let id = this.parentNode.id
    let parent = div.parentNoderes
    return await getItemFromServer(id)
        .then((todo) => {
            return fetch(url + `/` + id, {
                method: 'PATCH',
                body: JSON.stringify({
                    done: !todo.done
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            })
        })
        .then(todo => todo.json())
        .then((todo) => {
            // console.log(createSingleTodo(todo));
            parent.replaceChild(createSingleTodo(todo), div)
        })
}

function deleteItem(id) {
    const task = slate.find(task => task.id === id)
    if (task !== -1) {
        slate.splice(task, 1);  
    }
    return fetch(url + `/` + id, {
        method: 'DELETE',
    }).then(res => res.json())
}

 function RemoveDiv() {
    // console.log(this.parentNode.id)
    let div = this.parentNode;
    let id = this.parentNode.id
    return fetch(url + `/` + id, {
        method: 'DELETE',
    }).then(response => response.json())
}


function createCheckbox(el) {
    checkbox = document.createElement('input')
    if (el.done === true) {
        checkbox.checked = true;
    }
    checkbox.type = "checkbox";
    checkbox.classList.add("list-item-check");
}

function printTitleDiv(title, el) {
    if (el.done) {
        title.style.color = '#505050';
        title.style.textDecoration = 'line-through';
    }
    title.classList.add("list-item-value");
    title.textContent = `${el.value}`;
}

function createRemoveTaskById(RemoveTaskById) {
    RemoveTaskById.classList.add("list-item-remove");
    RemoveTaskById.innerHTML = `<img src="assets/icons/delete.svg" />`;
}

function printDescDiv(item, el) {
    if (el.description === "") {
        item.style.display = `none`
    } else if (el.description !== "") {
        item.style.display = `flex`
        item.classList.add("list-item-type");
        item.style.backgroundColor = el.labelColor;
        item.style.color = '#242323';
        item.textContent = `${el.description}`;
    }
}

function createDateDiv(item, el) {
    if (isDueDate(el.deadline)) {
        item.classList.add("list-item-date-gone");
    } else {
        item.classList.add("list-item-date");
    }
    item.textContent = `${el.deadline}`
};

function isDueDate(date) {
    let itemDate = new Date(date);
    console.log(itemDate);
    const currentDate = new Date();
    console.log(currentDate)
    return itemDate <= currentDate; // <= for today
}

function resetPlaceholder() {
    todoList.innerHTML = '';
}


async function showAll() {
    return await getData().then(res => slate = res)
    .then(() => render())
}

async function showUnfulfilled() {
    return await getData().then(res => {
            slate = res.filter(task => task.done === false);
        }).then(() => render())
}

async function getData() {
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await res.json();
}
      

function getItemFromServer(id) {
    return fetch(url + `/` + id)
            .then(res => res.json())
            .then(json => {
                return json;
            })
}

function saveTodoOnServer(item) {
    return  fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    }).then(todo => todo.json());
}

function saveItemState(id) {
    return getItemFromServer(id)
        .then((todo) => {
            return fetch(url + `/` + id, {
                method: 'PATCH',
                body: JSON.stringify({
                    done: !todo.done
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            })
        })
    }

async function getTodoListApi() {
    let res;
    let array;
    try {
        res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        } else {
            array = await res.json();
        }
    } catch (e) {
        console.log(e);
    }
    return array;
}

showAll();
input.focus();


// function setDoneState() {
//     let div = this.parentNode;
//     let checkbox = div.children[0]
//     let title = div.children[1];
//     if (checkbox.checked) {
//         title.style.color = '#505050';
//         title.style.textDecoration = 'line-through';
//             } else {
//                 title.style.color = '#b8b8b8';
//                 title.style.textDecoration = 'none';
//     }
//     let id = this.parentNode.id
//     return getItemFromServer(id)
//         .then((todo) => {
//             return fetch(url + `/` + id, {
//                 method: 'PATCH',
//                 body: JSON.stringify({
//                     done: !todo.done
//                 }),
//                 headers: {
//                     'Content-type': 'application/json; charset=UTF-8'
//                 },
//             })
//         })
// }