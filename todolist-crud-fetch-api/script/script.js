const input = document.querySelector(".task-info-input");
const description = document.querySelector(".task-type-input");
const deadline = document.querySelector(".task-date-input");
const addButton = document.querySelector(".task-add");
const showunfulfilledButton = document.querySelector(".incompleted");
const showAllButton = document.querySelector(".all");
const listHdr = document.querySelector(".right-list-h3");
const todoList = document.querySelector(".list-flex");
const check = document.querySelector(".list-item-checkbox");
const listValue = document.querySelector(".list-item-value");

let state = [];
let URL = "http://localhost:3000/tasks";
// showunfulfilledButton.addEventListener("click", showUnfulfilled);
// function showUnfulfilledTodos() {}
// showAllButton.addEventListener("click", showAll);
// function showAllTodos() {}

addButton.addEventListener("submit", addTodo);

function addTodo() {
  e.preventDefault();
  isEmptyTitle();
  buildTodoItem();
  setState();
  createBoard();
  writeTodo();
}

function createBoard() {
  state.forEach(createSingleTodo);
}

const buildTodoItem = () => {
  return (todo = {
    value: input.value,
    done: false,
    description: description.value,
    deadline: deadline.value
      ? new Date(deadline.value).toLocaleDateString()
      : "",
    labelColor: genColor(),
  });
};

function createSingleTodo(todoItem) {
  let todoNode = document.createElement("div");
  todoNode.id = todoItem.id;
  todoNode.classList.add("list-item");
  todoList.appendChild(todoNode);
  todoNode.append(
    createCheckbox(todoItem),
    createTitle(todoItem),
    createDescription(todoItem),
    createDate(todoItem),
    createDeleteButton(todoItem)
  );
  return todoNode;
  // todoNode.appendChild(createCheckbox(todoItem));
  // todoNode.appendChild(createTitle(todoItem));
  // todoNode.appendChild(createDeleteButton(todoItem));
  // todoNode.appendChild(createDescription(todoItem));
  // todoNode.appendChild(createDate(todoItem));
}

const createCheckbox = (todo) => {
  let checkbox = document.createElement("input");
  if (todo.done) {
    checkbox.checked = true;
  }
  checkbox.type = "checkbox";
  checkbox.classList.add("list-item-check");
  checkbox.onclick = setDoneState;

  return checkbox;
};

const createTitle = (todo) => {
  let title = document.createElement("div");
  if (todo.done) {
    title.style.color = "#505050";
    title.style.textDecoration = "line-through";
  }
  title.classList.add("list-item-value");
  title.textContent = `${todo.value}`;

  return title;
};
const createDeleteButton = () => {
  let removeButton = document.createElement("div");
  removeButton.classList.add("list-item-remove");
  removeButton.innerHTML = `<img src="assets/icons/delete.svg" />`;
  removeButton.onclick = deleteTodo;

  return removeButton;
};

const createDescription = (todo) => {
  let description = document.createElement("div");
  if (!todo.description) {
    description.style.display = `none`;
  } else if (todo.description) {
    description.style.display = `flex`;
    description.classList.add("list-item-type");
    description.style.backgroundColor = todo.labelColor;
    description.style.color = "#242323";
    description.textContent = `${todo.description}`;
  }
  return description;
};
function createDate(todo) {
  let dueDate = document.createElement("div");
  if (isDueDate(todo.deadline)) {
    dueDate.classList.add("list-item-date-gone");
  } else {
    dueDate.classList.add("list-item-date");
  }
  dueDate.textContent = `${todo.deadline}`;
  return dueDate;
}

const isDueDate = (date) => {
  let itemDate = new Date(date);
  console.log(itemDate);
  const currentDate = new Date();
  console.log(currentDate);
  return itemDate <= currentDate; // <= for today
};

const isEmptyTitle = () => {
  if (input.value === "") {
    return alert("Empty title!");
  }
};

function setState() {
  return slate.push(todo);
}

const genColor = () => {
  let typeBC = ["#ffecb5", "#e2bbff", "#b6ffee", "#ffb4c0", "#bbfaff"];
  return (laberlColor = typeBC[Math.floor(Math.random() * typeBC.length)]);
};

async function getTodoById(id) {
  return fetch(URL + `/` + id)
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
}

async function getAllTodos() {
  const res = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}
async function showAll() {
  return await getAllTodos()
    .then((res) => (slate = res))
    .then(() => render());
}

async function deleteTodo() {
  let div = this.parentNode;

  return await getItemFromServer(div.id).then((todo) => {
    return fetch(URL + `/` + div.id, {
      method: "DELETE",
      body: JSON.stringify({
        todo: todo,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((res) => res.json())
    .then((task) => {
      if (res.ok) {
        const task = slate.find((task) => task.id === id);
        if (task !== -1) {
          slate.splice(task, 1);
        }
      }
    })
})

async function setDoneState() {
  let div = this.parentNode;
  return await getItemFromServer(div.id)
    .then((todo) => {
      return fetch(URL + `/` + div.id, {
        method: "PATCH",
        body: JSON.stringify({
          done: !todo.done,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    })
    .then((todo) => todo.json())
    .then((todo) => {
      div.parentElement.replaceChild(todo, div);
    });
}
function getItemFromServer(id) {
  return fetch(URL + `/` + id)
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
}

function writeTodo(todo) {
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((response) => response.json());
}

async function getTodosList() {
  let response;
  let result;
  try {
    response = await fetch(URL);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    } else {
      result = await response.json();
    }
  } catch (err) {
    console.log(err);
  }
  return result;
}

getAllTodos()
  .then((res) => (state = res))
  .then(() => createBoard());

// const createTodoNode = () => {
//   let todoNode = document.createElement("div");
//   todoList.appendChild(todoNode);
//   todoNode.classList.add("list-item");
//   return todoNode;
// };
// return fetch('/contacts', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' }
//     body: JSON.stringify(contact)
//     })
//     .then(res => res.ok ? res.json() : throw new Error(res))

//     event.preventDefault();
// createContact(contact)
// .then(c => contactListNode.appendChild(createContactNode(c)));
// function createTodoItem(parentDiv, el) {
//   parentDiv.classList.add("list-item");
//   parentDiv.id = el.id;
// }
