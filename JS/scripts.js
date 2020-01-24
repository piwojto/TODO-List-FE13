// Tutaj dodacie zmienne globalne do przechowywania elementów takich jak np. lista czy input do wpisywania nowego todo
let $list, addBtn, editBtn, delBtn, doneBtn, label, input;
const initialList = ['Dzisiaj robię sprzątanie', 'Nakarm rybki', 
  'Podlej kwiatki w doniczkach', 'próba todo listy '];

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

};

function prepareDOMEvents() {
  // Przygotowanie listenerów
  $list.addEventListener('click', listClickManager);
  input.addEventListener('focus', function(event) {
    event.preventDefault(); // stop execute event
  // console.log(input.value);
  });

  addBtn.addEventListener('click', function(event) {
      event.preventDefault(); // stop execute event
    console.log(input.value);
    if(input.value.trim()!=='') {
      
      // console.log(label);
      createElement(input.value);
      addNewElementToList(input.value);
    };  
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
  // $list.appendChild(createElement('nowy', 2))
  const newElement = createElement(title);
  $list.appendChild(newElement).appendChild(delBtn);
  // $list.insertAdjacentHTML('beforeend',editBtn);
  // $list.appendChild(editBtn).appendChild(doneBtn); 
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
  label.innerText = input.value;
  console.log(label.innerText);
  // newElement.appendChild(label);         //
  // newElement.appendChild(editInput);     //
  // newElement.appendChild(editBtn);    //
  // newElement.appendChild(delBtn);  
  newElement.innerText = title;
  console.log(newElement);
  return newElement;
};

function listClickManager(event/* event- event.target */) { //obsługa zdarzeń na liście
  // Rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
  // event.target.parentElement.id
  switch (event.target.className) {
    case 'edit': {
      console.log('klik edit');
      openPopup();
      break;
    }
    case 'delete': {
        console.log('klik delete');
        elemRemove();
        break;
    }
    case 'done': {
      console.log('klik done');
      break;
  }
  }
  // if (event.target.className === 'edit') {
    // console.log('klik edit');
    //  editListElement(id)
    //  }
};

function openPopup() {

  // Otwórz popup
};

function closePopup() {
  // Zamknij popup
};

function elemRemove() {
  console.log($list); 

};

document.addEventListener('DOMContentLoaded', main);