var pokemonRepository = (function () {
//the array is now empty
  var pokemonList = [];
//the URL of the API from PokemonList will be populated
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  var modalContainer = document.querySelector('#modal-container');

//this function adds the provided pokemon object to the pokemonList array
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
//this function returns pokemonList array
  function getAll() {
    return pokemonList;
  }

//this function fetches data from the API, then uses it to populate the pokemonList array
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
// creates a button for the provided pokemon object and appends this button to the button list
  function addListItem(pokemon){
    var unorderedList = document.querySelector('.pokemon-list');
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = pokemon.name;
    button.addEventListener('click', function(){
      showDetails(pokemon);
    })
    button.classList.add('button-style');
    listItem.appendChild(button);
    unorderedList.appendChild(listItem);
  }
  //calls loadDetails to fetch addl details for the provided pokemon object then logs it to the console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      //console.log(pokemon);
      showModal(pokemon.name);
    });
  }
  //fetches addl details using the details detailsUrl of the provided pokemon object (item) and then adds to it
  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
  function showModal(title, text) {
    // Clear all existing modal content
    modalContainer.innerHTML = '';

    var modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    var titleElement = document.createElement('h1');
    titleElement.innerText = title;

    var contentElement = document.createElement('p');
    contentElement.innerText = "text";

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('title', 'text');
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    var target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //to return the values which can be accessed outside of the IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    showDetails: showDetails,
    loadDetails: loadDetails,
    hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(function(){  //calls loadList to asynchronously populate the pokemonList array
  pokemonRepository.getAll().forEach(function(pokemon){ //this will loop over the array to create a button forEach pokemon within the array
    pokemonRepository.addListItem(pokemon);
  });
});
