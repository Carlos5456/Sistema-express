// AUTO COMPLETAR DA BARRA 
var input = document.getElementById('search-input');
var options = {
  types: ['(cities)'],
  componentRestrictions: { country: 'BR' }
};

// Inicializa o Autocompletar
var autocomplete = new google.maps.places.Autocomplete(input, options);

// Evento acionado quando uma cidade é selecionada
autocomplete.addListener('place_changed', function() {
  var place = autocomplete.getPlace();
  if (place && place.name) {
    // Adiciona o nome da cidade à lista
    var cityList = document.getElementById('city-list');
    var listItem = document.createElement('li');
    listItem.textContent = place.name;
    cityList.appendChild(listItem);
  }
});

// SISTEMA DE MONTAR A LISTA NA PAGINA HTML 
var cityList = document.getElementById('city-list');

// Obtém todas as chaves do Local Storage
var keys = Object.keys(localStorage);

// Itera sobre as chaves e monta a lista de cidades
keys.forEach(function(key) {
  if (key.startsWith('city_')) {
    var cityName = localStorage.getItem(key);
    
    var listItem = document.createElement('li');
    listItem.textContent = cityName;
    cityList.appendChild(listItem);
  }
});


// Função para subir um item na lista
function moveUpItem(item) {
  var previousItem = item.previousElementSibling;
  if (previousItem) {
    item.parentNode.insertBefore(item, previousItem);
  }
}

// Função para descer um item na lista
function moveDownItem(item) {
  var nextItem = item.nextElementSibling;
  if (nextItem) {
    item.parentNode.insertBefore(nextItem, item);
  }
}

// Evento de clique no botão "save-button"
document.getElementById('save-button').addEventListener('click', function() {
  var inputValue = document.getElementById('autocomplete-input').value;

  var newItem = document.createElement('li');
  var valor = document.createElement('a');

  
  valor.textContent = inputValue;

  var itemList = document.getElementById('item-list');
  itemList.appendChild(newItem);

  document.getElementById('autocomplete-input').value = '';

  // Adiciona botões de subir e descer ao novo item
  var upButton = document.createElement('button');
  upButton.textContent = 'Subir';
  upButton.addEventListener('click', function() {
    moveUpItem(newItem);
  });

  var downButton = document.createElement('button');
  downButton.textContent = 'Descer';
  downButton.addEventListener('click', function() {
    moveDownItem(newItem);
  });
  
  newItem.appendChild(valor);
  newItem.appendChild(upButton);
  newItem.appendChild(downButton);
});


document.getElementById("guardarlista").addEventListener("click", function() {
  // Obtém as tags <li> dentro da <ul>
  var listaItems = document.querySelectorAll("li");

  // Cria um array para armazenar o conteúdo
  var listaConteudo = [];

  // Itera sobre as tags <li> e obtém o conteúdo das tags <a>
  listaItems.forEach(function(item) {
    var link = item.querySelector("a");
    listaConteudo.push(link.innerText);
  });

  // Armazena o array no Local Storage como uma string JSON
  localStorage.setItem("minhaLista", JSON.stringify(listaConteudo));

  // Exibe uma mensagem de sucesso
  console.log("Lista guardada no Local Storage!");


  alert ('DADOS EXPORTADOS')
});



