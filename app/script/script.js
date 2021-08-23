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
let inc = (init = 0) => () => ++init;
let genId = inc();

addButton.addEventListener("click", createItem);
showIncompletedButton.addEventListener("click", showIncompleted);
showAllButton.addEventListener("click", showAll);

function showAll() {
    render();
}

function render() {
    let localData = localStorage.getItem("slate");
    if (localData) {
        slate = JSON.parse(localStorage.getItem("slate"));
        if (slate.length == 0) {
            listHdr.innerHTML = "Add a task to begin.";
        } else {
            resetPlaceholder()
            maker()
        }
    }
}

function showIncompleted() {
    let localData = localStorage.getItem("slate");
    if (localData) {
        slate = JSON.parse(localStorage.getItem("slate"));
        let newSlate = slate.filter(el => el.done === false);
        if (newSlate.length == 0) {
            listHdr.innerHTML = "Add a task to begin.";
        } else {
            newSlate.forEach((element, index) => {
                createList(element, index);
            });
        }
    }
}

function createItem() {
    const inputValue = input.value,
        inputDecription = description.value,
        inputDeadline = new Date(due_date.value).toLocaleDateString(),
        typeColor = typeBC[Math.floor(Math.random() * typeBC.length)];
    if (inputValue === "" || inputDecription === "") {
        return alert("Empty title!");
    }
    const item = {
        id: genId(),
        value: inputValue,
        done: false,
        description: inputDecription,
        deadline: inputDeadline,
        labelColor: typeColor
    };
    description.value = "";
    input.value = "";
    due_date.value = "";
    setListHeader()
    const val = slate.length;
    slate.unshift(item);
    createList(item, val);
    maker();
    localStorage.setItem("slate", JSON.stringify(slate));
}

function maker() {
    todoList.innerHTML = "";
    slate.forEach((element, index) => {
        createList(element, index);
    });
}

function createList(el, indx) {
    const itemlabel = document.createElement("label"),
        completedButton = document.createElement('input'),
        valueDiv = document.createElement("div"),
        typeDiv = document.createElement("div"),
        dateDiv = document.createElement("div"),
        removeDiv = document.createElement("div");

    itemlabel.classList.add("list-item");

    createCheckboxItem(completedButton, el.done);
    createItemValue(valueDiv, el.value, el.done)
    createRemoveItem(removeDiv)
    createDescriptionItem(typeDiv, el.description, el.labelColor)
    createDateItem(dateDiv, el.deadline)

    todoList.append(itemlabel);
    itemlabel.append(completedButton);
    itemlabel.append(valueDiv)
    itemlabel.append(typeDiv);
    itemlabel.append(dateDiv)
    itemlabel.append(removeDiv);
    localStorage.setItem("slate", JSON.stringify(slate));

    completedButton.addEventListener('click', () => {
        if (completedButton.checked) {
            valueDiv.style.color = '#505050';
            valueDiv.style.textDecoration = 'line-through';
        } else {
            valueDiv.style.color = '#b8b8b8';
            valueDiv.style.textDecoration = 'none';
            valueDiv.innerHTML = `${el.value}, незабудь!`
        }
        el.done = !el.done
        localStorage.setItem("slate", JSON.stringify(slate));
    })

    removeDiv.addEventListener("click", () => {
        itemlabel.style.backgroundColor = "#505050";
        itemlabel.remove();
        slate.splice(indx, 1);
        if (slate.length === 0) {
            listHdr.innerHTML = "Add a task to begin.";
        }
        localStorage.setItem("slate", JSON.stringify(slate));
    });
}

function createCheckboxItem(completedButton, done) {
    if (done === true) {
        completedButton.checked = true;
    }
    completedButton.type = "checkbox";
    completedButton.innerHTML = `<i class="fas fa-check"></i`;
    completedButton.classList.add("list-item-check");

}

function createItemValue(valueDiv, value, done) {
    if (done) {
        valueDiv.style.color = '#505050';
        valueDiv.style.textDecoration = 'line-through';
    }
    valueDiv.classList.add("list-item-value");
    valueDiv.textContent = `${value}`;
}

function createRemoveItem(removeDiv) {
    removeDiv.classList.add("list-item-remove");
    removeDiv.innerHTML = `<img src="assets/icons/delete.svg" />`;
}

function createDescriptionItem(item, description, labelColor) {
    item.classList.add("list-item-type");
    item.style.backgroundColor = labelColor;
    item.textContent = `${description}`;
}

function createDateItem(item, deadline) {
    if (isDueDate(deadline)) {
        item.classList.add("list-item-date-gone");
    } else {
        item.classList.add("list-item-date");
    }
    item.textContent = `${deadline}`;
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
    listHdr.innerHTML = "Up coming task.";
}

render();
input.focus();