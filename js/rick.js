// rick.js

// Seleccionamos los elementos
const inputRick = document.getElementById('rickId');
const btnBuscar = document.getElementById('buscarRick');
const resultado = document.getElementById('resultadoRick');

// Función para buscar el personaje
const buscarPersonaje = async () => {
  const id = inputRick.value.trim();

  if (!id) {
    resultado.innerHTML = '<p style="color:red;">Por favor, ingresá un ID válido.</p>';
    return;
  }

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

    if (!response.ok) {
      throw new Error('Personaje no encontrado');
    }

    const personaje = await response.json();

    // Mostramos la información en HTML
    resultado.innerHTML = `
      <h3>${personaje.name}</h3>
      <img src="${personaje.image}" alt="${personaje.name}" style="width:150px; border-radius:10px;">
      <p><strong>Estado:</strong> ${personaje.status}</p>
      <p><strong>Especie:</strong> ${personaje.species}</p>
      <p><strong>Género:</strong> ${personaje.gender}</p>
      <p><strong>Ubicación:</strong> ${personaje.location.name}</p>
    `;
  } catch (error) {
    resultado.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
};

// Escuchamos el click del botón
btnBuscar.addEventListener('click', buscarPersonaje);

// También permitimos buscar con Enter
inputRick.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    buscarPersonaje();
  }
});
