// Tutaj dodacie zmienne globalne do przechowywania elementów takich jak np. lista czy input do wpisywania nowego todo
let $list, addBtn, editBtn, delBtn, doneBtn, label, input, divModal, 
  popInput, closePop, currentTODO, tempLabel;

const initialList = ['Dzisiaj robię sprzątanie', 'Nakarm rybki', 
  'Podlej kwiatki w doniczkach'];

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
  closePop=document.querySelector('#closePopup');
};

function prepareDOMEvents() {
  // Przygotowanie listenerów
  $list.addEventListener('click', listClickManager);
  input.addEventListener('focus', function(event) {
  });

  event.target.addEventListener('click', function(event) {
    event.preventDefault(); 
    switch (event.target.id) {
      case 'addTodo': {
        if(input.value.trim()!=='') {
          createElement(input.value);
          addNewElementToList(input.value);
        };  
        break;
      }
      case 'cancelTodo':
      case 'closePopup': {
        closePopup(event);
        break;
      }
      case 'acceptTodo': {
        currentTODO.innerText=popInput.value;
        closePopup(event);
        break;
      }
    };
})};

function prepareInitialList() {
  // Tutaj utworzymy sobie początkowe todosy. Mogą pochodzić np. z tablicy
  initialList.forEach(todo => {
    addNewElementToList(todo);
  });
};

function addNewElementToList(title   /* Title, author, id */) {
  //obsługa dodawanie elementów do listy
  const newElement = createElement(title);
  $list.appendChild(newElement);
  input.value='';
};

function createElement(title /* Title, author, id */) {
  // Tworzyc reprezentacje DOM elementu return newElement
  // return newElement
  const newElement = document.createElement('li');
  
  function createListButtons(text, className) {
    let button=document.createElement('button');
    button.innerText=text;
    button.className=className;
    return button;
  };

  editBtn = createListButtons('Edit','edit');   
  delBtn = createListButtons('Delete','delete');
  doneBtn = createListButtons('Mark as Done','done');
  label = document.createElement('label');
  label.textContent = input.value || title;
  newElement.append(label,delBtn,editBtn,doneBtn);
  return newElement;
};

function listClickManager(event/* event- event.target */) { //obsługa zdarzeń na liście
  // Rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
  // event.target.parentElement.id
  switch (event.target.className) {
    case 'delete': {
      elemRemove(event);
      break;
    }
    case 'edit': {
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
    // Otwórz popup
  divModal.classList.toggle("modal-active");
  currentTODO = event.target.parentElement.firstChild;
  popInput.value=event.target.parentElement.firstChild.textContent;
};

function closePopup(event) {
  // Zamknij popup
  console.log(event.target);
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