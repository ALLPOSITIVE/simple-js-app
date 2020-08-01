var pokemonRepository = (function () {
//the array is now empty
  var pokemonList = [];
//the URL of the API from PokemonList will be populated
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

  function addListItem(pokemon){
    var unorderedList = document.querySelector('.pokemon-list')
    var listItem = document.createElement('li')
    var button = document.createElement('button')
    button.innerText = pokemon.name;
    button.addEventListener('click', function(){
      showDetails(pokemon);
    })
    button.classList.add('button-style')
    listItem.appendChild(button);
    unorderedList.appendChild(listItem);
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }
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
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    showDetails: showDetails,
    loadDetails: loadDetails
  };
})();
pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
