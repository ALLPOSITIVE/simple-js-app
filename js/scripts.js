var pokemonRepository = (function () {
  var monS1 = {
    name: 'Pikachu',
    height: 0.2,
    types: ['grass', 'poison']
  }
  var monS2 = {
    name: 'Raichu',
    height: 0.8,
    types: ['grass', 'poison']
  }
  var monS3 = {
    name: 'Nidorina',
    height: 1.8,
    types: ['grass', 'poison']
  }
  var pokemonList = [monS1, monS2, monS3];


  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails (pokemon){
    document.write(pokemon);
  }
  function addListItem(pokemon){
    var unorderedList = document.querySelector('.pokemon-list')
    var listItem = document.createElement('li')
    var button = document.createElement('button')
    button.innerText = "pokemon";
    button.classList.add('button-style')
    listItem.appendChild(button);
    unorderedList.appendChild(listItem);
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.getAll().forEach(function(pokemon){
pokemonRepository.addListItem()
});
