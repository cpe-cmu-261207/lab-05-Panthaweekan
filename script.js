const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;

  if (inputAdd.value == "") {
    alert("Todo cannot be empty");
  } else {
    addTodo(inputAdd.value, false);
    inputAdd.value = "";
    saveTodo();
  }
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  doneBtn.style.display = "none";

  div.onmouseover = () => {
    doneBtn.style.display = "";
    deleteBtn.style.display = "";
  };

  div.onmouseout = () => {
    doneBtn.style.display = "none";
    deleteBtn.style.display = "none";
  };

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  deleteBtn.style.display = "none";

  //your code here
  div.append(span);
  span.append(doneBtn);
  span.append(deleteBtn);
  todoCtn.prepend(div);

  //define buttons event...
  doneBtn.onclick = () => {
    completed = !completed;
    span.style.textDecoration = completed ? "line-through" : "";
    saveTodo();
  };

  deleteBtn.onclick = () => {
    todoCtn.removeChild(div);
    saveTodo();
  };
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    const todoObject = {};
    todoObject.title = todoDiv.children[0].innerText;
    todoObject.completed =
      todoDiv.children[0].style.textDecoration === "line-through";
    data.push(todoObject);
  }
  localStorage.setItem("Todo-list", JSON.stringify(data));
  //your code here
}

function loadTodo() {
  const data = JSON.parse(localStorsage.getItem("Todo-list"));
  for (const todoObject of data.reverse()) {
    addTodo(todoObject.title, todoObject.completed);
  }
}

loadTodo();
