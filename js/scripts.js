

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

  var pokemonList = [monS1, monS2, monS3];

  }
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

getAll.forEach(function(pokemon){
document.write('<h2>' + pokemon.name + '</h2>' + ' Height: ' + pokemon.height)
if (pokemon.height >= 1.0) {
document.write(' (Wow that\'s big!)' )
}
});
