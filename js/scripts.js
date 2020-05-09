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

for (var i = 0, i< pokemonList.length; i++) {
  document.write('<h2>' + pokemonList[i].name + '</h2>' + ' Height: ' + pokemonList[i].height)
if (pokemonList[i].height >= 1.0) {
  document.write(' (Wow that\'s big!)' )
  }
}
