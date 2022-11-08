const formTodoAddElement = document.querySelector(".form_add_todo");
const inputTodoAddElement = document.querySelector(".input_add_todo");
const todoListElement = document.querySelector(".todo_list");
const todoListCompletedElement = document.querySelector(".todo_list_completed");

const buttonShowAll = document.querySelector(".show_all_todo");
const buttonShowCompleted = document.querySelector(".show_completed_todo");
const buttonShowActive = document.querySelector(".show_active_todo");

let filterTodoType = "all";

let todos = [];

formTodoAddElement.addEventListener("submit", (ev) => {
  ev.preventDefault();
});

formTodoAddElement.addEventListener("click", (ev) => {
  let todo = {};

  let value = inputTodoAddElement.value;

  if (value !== "") {
    todo = createTodo(value.trim());
    todos.push(todo);
    inputTodoAddElement.value = "";

    render();
  }
});

const createTodo = (value) => {
  const todo = {
    value,
    id: Date.now().toString(),
    completed: false,
  };

  return todo;
};

todoListElement.addEventListener("click", (ev) => {
  let buttonType = ev.target.dataset.btn;
  let id = ev.target.dataset.todoId;

  if (buttonType === "delete") {
    newTodo = todos.filter((todo) => todo.id !== id);
    todos = newTodo;

    render();
  }
  if ((buttonType = "completed")) {
    newTodo = todos.find((todo) => todo.id === id);

    newTodo.completed = true;

    render();
  }
});

function render() {
  todoListElement.innerHTML = "";

  let newArr = todos.filter((todo) => {
    if (filterTodoType === "all") {
      return true;
    } else if (todo.completed && filterTodoType === "completed") {
      return true;
    } else if (!todo.completed && filterTodoType === "active") {
      return true;
    }
    return false;
  });

  newArr.forEach((todo) => {
    const li = document.createElement("li");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.dataset.todoId = todo.id;
    deleteButton.dataset.btn = "delete";
    deleteButton.classList.add("deleteTodoButton");

    const completedButton = document.createElement("button");
    completedButton.textContent = "Completed";
    completedButton.dataset.todoId = todo.id;
    completedButton.dataset.btn = "completed";
    completedButton.classList.add("completedTodoButton");

    li.innerText = todo.value;
    li.dataset.todoId = todo.id;

    todoListElement.append(li);
    li.append(deleteButton, completedButton);

    if (todo.completed) {
      li.classList.add("completed_todo_item");
    }
  });
}

function filteredTodo(ev) {
  let actionType = ev.target.name;
  filterTodoType = actionType;
  render();
}

buttonShowCompleted.addEventListener("click", filteredTodo);
buttonShowActive.addEventListener("click", filteredTodo);
buttonShowAll.addEventListener("click", filteredTodo);
