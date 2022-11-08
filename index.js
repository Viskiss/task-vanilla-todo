const formTodoAddElement = document.querySelector(".form_add_todo");
const inputTodoAddElement = document.querySelector(".input_add_todo");
const todoListElement = document.querySelector(".todo_list");
const buttonFormSubmit = document.querySelector(".submit_button");

let TODOS = [];

formTodoAddElement.addEventListener("submit", (ev) => {
  ev.preventDefault();
});

buttonFormSubmit.addEventListener("click", (ev) => {
  let todo = {};
  let value = inputTodoAddElement.value;

  if (value !== "") {
    console.log(value);
    todo = createTodo(value.trim());
    TODOS.push(todo);
    inputTodoAddElement.value = "";
    render();
  }
});

const createTodo = (value) => {
  const todo = {
    value,
    id: Date.now(),
  };
  return todo;
};

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function render() {
  clearElement(todoListElement);
  TODOS.reverse().forEach((todo) => {
    const li = document.createElement("li");

    li.innerText = todo.value;
    todoListElement.append(li);
    console.log(TODOS);
  });
}
render();
