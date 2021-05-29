const input = document.querySelector('input');
const button = document.querySelector('button');

const todolist = document.querySelector(".todolist"); // получаем node с классом todolist
const headerlist = document.querySelector(".headerlist"); // получаем node с классом headerlist
const navlist = document.querySelector(".navlist"); // получаем node с классом navlist

let inputValue = '';

input.addEventListener('input', () => onChangeInput(input.value));
button.addEventListener('click', () => addTodo(inputValue));

getTodos();
getHeaderlinks();
getNavlist();


function createNodesFromArray(array, parentNode) {

    for(let i = 0; i < array.length; i++) {
        const li = document.createElement("li"); // динамически создаем node li

        li.innerText = array[i].title; // в node li вручную добавляем текст

        parentNode.appendChild(li); // добавляем в node todolist node li
    }

}

function onChangeInput(value) {
    inputValue = value;
}

function getTodos() {
    fetch('http://localhost:3000/todos')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    createNodesFromArray(data, todolist)
  });
}

function getHeaderlinks() {
    fetch('http://localhost:3000/headerlinks')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    createNodesFromArray(data, headerlist)
  });
}

function getNavlist() {
    fetch('http://localhost:3000/navlinks')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    createNodesFromArray(data, navlist)
  });
}

function addTodo(data) {    
    fetch('http://localhost:3000/todos', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify({id: null, title: data, author: "Иван"})
      })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    todolist.innerHTML = '';
      getTodos()
  })
}