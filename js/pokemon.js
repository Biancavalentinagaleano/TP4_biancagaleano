// pokemon.js
const buscarBtn = document.getElementById('buscarPoke');
const inputPoke = document.getElementById('poke');
const resultadoDiv = document.getElementById('resultadoPoke');

buscarBtn.addEventListener('click', () => {
  const pokemon = inputPoke.value.trim().toLowerCase();
  if (!pokemon) {
    resultadoDiv.innerHTML = '<p style="color:red;">Por favor, ingresa un nombre o ID de Pokémon.</p>';
    return;
  }

  // Limpiar resultado anterior
  resultadoDiv.innerHTML = '<p>Cargando...</p>';

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Pokémon no encontrado');
      }
      return response.json();
    })
    .then(data => {
      // Mostrar información del Pokémon
      resultadoDiv.innerHTML = `
        <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p><strong>Tipo:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
        <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
      `;
    })
    .catch(error => {
      resultadoDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
});
