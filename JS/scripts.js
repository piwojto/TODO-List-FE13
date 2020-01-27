// Tutaj dodacie zmienne globalne do przechowywania elementów takich jak np. lista czy input do wpisywania nowego todo
let $list, addBtn, editBtn, delBtn, doneBtn, label, input, divModal, popInput, todoID, currentID, tempLabel;

const initialList = ['Dzisiaj robię sprzątanie', 'Nakarm rybki', 
  'Podlej kwiatki w doniczkach'];
todoID=1;

function main() {
  prepareDOMElements();
  prepareDOMEvents();
  prepareInitialList();
};

function prepareDOMElements() {
  // To będzie idealne miejsce do pobrania naszych elementów z drzewa DOM i zapisanie ich w zmiennych
  $list = document.getElementById('list');
  input=document.querySelector('#myInput'); 
  addBtn=document.querySelector('#addTodo'); 
  divModal=document.querySelector('#myModal'); 
  popInput=document.querySelector('#popupInput');
  cancTodo=document.querySelector('#cancelTodo');
  acceTodo=document.querySelector('#acceptTodo');
};

function prepareDOMEvents() {
  // Przygotowanie listenerów
  $list.addEventListener('click', listClickManager);
  input.addEventListener('focus', function(event) {
      event.preventDefault(); // cancel event
  });

  addBtn.addEventListener('click', function(event) {
    event.preventDefault(); 
    console.log(input.value);
    if(input.value.trim()!=='') {
      
      // console.log(label);
      createElement(input.value);
      addNewElementToList(input.value);
    };  
 });

  cancTodo.addEventListener('click', function(event) {
    event.preventDefault(); 
    console.log(input.value);
    closePopup(event);
  });

  acceTodo.addEventListener('click', function(event) {
    event.preventDefault(); 
    console.log(popInput.value);
    console.log(event.target.parentElement.firstChild.textContent);
    closePopup(event);
    });
};

function prepareInitialList() {
  // Tutaj utworzymy sobie początkowe todosy. Mogą pochodzić np. z tablicy
 
  initialList.forEach(todo => {
    addNewElementToList(todo);
  });
};

function addNewElementToList(title   /* Title, author, id */) {
  //obsługa dodawanie elementów do listy
  const newElement = createElement(title);
  todoID++;
  $list.appendChild(newElement);
  input.value='';
};

function createElement(title /* Title, author, id */) {
  // Tworzyc reprezentacje DOM elementu return newElement
  // return newElement
  const newElement = document.createElement('li');
  editBtn = document.createElement('button');   
  delBtn = document.createElement("button");
  doneBtn = document.createElement("button");
  label = document.createElement('label');
  editBtn.innerText = "Edit";      
  editBtn.className = "edit";      
  delBtn.innerText = "Delete"; 
  delBtn.className = "delete";
  doneBtn.innerText = "Mark as Done";      
  doneBtn.className = "done"; 
  label.textContent = input.value || title;
  newElement.dataset.id=todoID;
  newElement.append(label,delBtn,editBtn,doneBtn);
  return newElement;
};

function listClickManager(event/* event- event.target */) { //obsługa zdarzeń na liście
  // Rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
  // event.target.parentElement.id
  switch (event.target.className) {
    case 'delete': {
      console.log('klik delete');
      elemRemove(event);
      break;
    }
    case 'edit': {
      console.log('klik edit');
      openPopup(event);
      break;
    }
    case 'done': {
      elemDone(event);
      break;
    }
  }
};

function openPopup(event) {
  divModal.classList.toggle("modal-active");
  popInput.value=event.target.parentElement.firstChild.textContent;
  // Otwórz popup
};

function closePopup(event) {
  // Zamknij popup
  divModal.classList.toggle("modal-active");
};

function elemRemove(event) {
  event.target.parentElement.remove();
};

function elemDone(event) {
  event.target.setAttribute("disabled",true);
  event.target.parentElement.firstChild.classList.add("task-done")
};

document.addEventListener('DOMContentLoaded', main);
