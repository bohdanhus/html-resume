const input = document.querySelector(".task-info-input");
const description = document.querySelector(".task-type-input");
const due_date = document.querySelector(".task-date-input");
const addButton = document.querySelector(".task-add");
const showIncompletedButton = document.querySelector(".incompleted");
const showAllButton = document.querySelector(".all");
const listHdr = document.querySelector(".right-list-h3");
const todoList = document.querySelector(".list-flex");
const check = document.querySelector(".list-item-checkbox");
const listValue = document.querySelector(".list-item-value");

let typeBC = ["#ffecb5", "#e2bbff", "#b6ffee", "#ffb4c0", "#bbfaff"];
let slate = [];
let url = 'http://localhost:3000/tasks'
addButton.addEventListener("click", createItem);
showIncompletedButton.addEventListener("click", showIncompleted);
showAllButton.addEventListener("click", render);



function getTodosList() {
    return getTodosApi()
    .then(date => {
        return date;
    });
}

async function getTodosApi() {
    let response;
    let array;
    try {
        response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            array = await response.json();
        }
    } catch (e) {
        console.log(e);
    }

    return array;
}

async function render() {
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const res_1 = await res.json();
    slate = res_1;
    if (slate.length == 0) {
        listHdr.innerHTML = "Add a task to begin.";
    } else {
        resetPlaceholder();
        maker();
    }
}

function showIncompleted() {
    return fetch(url,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res => res.json())
        .then(res => {
            slate = res.filter(task => task.done === false);

        if (slate.length == 0) {
            listHdr.innerHTML = "Add a task to begin.";
        } else {
            resetPlaceholder()
            maker()
        }
        })
}

function createItem() {
    const inputValue = input.value,
        inputDecription = description.value,
        inputDeadline = due_date.value ? new Date(due_date.value).toLocaleDateString() : "without date",
        typeColor = typeBC[Math.floor(Math.random() * typeBC.length)];
    if (inputValue === "" /*|| inputDecription === ""*/) {
        return alert("Empty title!");
    }
    console.log(inputDeadline)
    const item = {
        value: inputValue,
        done: false,
        description: inputDecription,
        deadline: inputDeadline,
        labelColor: typeColor
    };
    saveTask(item)
    description.value = "";
    input.value = "";
    due_date.value = "";
    setListHeader();
    const val = slate.length;
    slate.unshift(item);
    createList(item, val);
}

function maker() {
    todoList.innerHTML = "";
    slate.forEach((element, index) => {
        createList(element, index);
    });
}

function createList(el) {
    const parentDiv = document.createElement("div"),
    checkbox = document.createElement('input'),
        titleDiv = document.createElement("div"),
        descDiv = document.createElement("div"),
        dateDiv = document.createElement("div"),
        removeDiv = document.createElement("div");
    createParentDiv(parentDiv,el);
    createCheckbox(checkbox, el);
    printTitleDiv(titleDiv, el);
    createRemoveDiv(removeDiv);
    printDescDiv(descDiv, el);
    createDateDiv(dateDiv, el);
    todoList.appendChild(parentDiv);
    parentDiv.appendChild(checkbox);
    parentDiv.appendChild(titleDiv);
    parentDiv.appendChild(descDiv);
    parentDiv.appendChild(dateDiv);
    parentDiv.appendChild(removeDiv);
    console.log(checkbox.innerHTML)
    removeDiv.onclick = RemoveDiv
    checkbox.onclick = setDoneState
}
function createParentDiv(parentDiv, el){
    parentDiv.classList.add("list-item");
    parentDiv.id = el.id;
}
function setDoneState() {
    let div = this.parentNode;
    let checkbox = div.children[0]
    let title = div.children[1];
    if (checkbox.checked) {
        title.style.color = '#505050';
        title.style.textDecoration = 'line-through';
            } else {
                title.style.color = '#b8b8b8';
                title.style.textDecoration = 'none';
            }
            saveItemState(this.parentNode.id)
}
function RemoveDiv() {
    console.log(this.parentNode.id)
    let div = this.parentNode;
    div.style.backgroundColor = "#505050";
        div.remove();
        deleteItem(div.id);
        if (slate.length === 0) {
            listHdr.innerHTML = "Add a task to begin.";
        }
}

function createCheckbox(completedButton, el) {
    if (el.done === true) {
        completedButton.checked = true;
    }
    completedButton.type = "checkbox";
    completedButton.classList.add("list-item-check");

}

function printTitleDiv(title, el) {
    if (el.done) {
        title.style.color = '#505050';
        title.style.textDecoration = 'line-through';
    }
    title.classList.add("list-item-value");
    title.textContent = `${el.value}`;
}

function createRemoveDiv(removeDiv) {
    removeDiv.classList.add("list-item-remove");
    removeDiv.innerHTML = `<img src="assets/icons/delete.svg" />`;
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
    item.textContent = `${el.deadline}`;
};

function isDueDate(date) {
    itemDate = new Date(date)
    const currentDate = new Date();
    return itemDate <= currentDate;
}

function resetPlaceholder() {
    todoList.innerHTML = '';
}

function setListHeader() {
    listHdr.innerHTML = `Up coming task.`;
}

 function saveTask(item) {
    const task = fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
    return task.json();
}

function getItemFromServer(id) {
    return fetch(url + `/` + id)
            .then(res => res.json())
            .then(json => {
                return json;
            })
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

function deleteItem(id) {
    const task = slate.find(task => task.id === id)
    if (task !== -1) {
        slate.splice(task, 1);  
    }
    return fetch(url + `/` + id, {
        method: 'DELETE',
    }).then(res=> res.json())
}


getTodosList().then(res => {
    render(res);
});

input.focus();