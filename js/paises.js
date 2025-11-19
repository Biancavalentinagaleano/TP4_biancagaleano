// paises.js
const buscarBtn = document.getElementById('buscarPais');
const inputPais = document.getElementById('pais');
const resultadoDiv = document.getElementById('resultadoPais');

buscarBtn.addEventListener('click', () => {
  const pais = inputPais.value.trim();
  if (!pais) {
    resultadoDiv.innerHTML = '<p style="color:red;">Por favor, ingresa el nombre de un país.</p>';
    return;
  }

  // Limpiar resultado anterior
  resultadoDiv.innerHTML = '<p>Cargando...</p>';

  fetch(`https://restcountries.com/v3.1/name/${pais}`)
    .then(response => {
      if (!response.ok) {
        // Manejo de error 404 o cualquier otro
        throw new Error('País no encontrado');
      }
      return response.json();
    })
    .then(data => {
      const country = data[0];

      // Mostrar información relevante
      resultadoDiv.innerHTML = `
        <h3>${country.name.common} ${country.flag}</h3>
        <p><strong>Nombre oficial:</strong> ${country.name.official}</p>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'No disponible'}</p>
        <p><strong>Región:</strong> ${country.region}</p>
        <p><strong>Subregión:</strong> ${country.subregion}</p>
        <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Área:</strong> ${country.area.toLocaleString()} km²</p>
        <p><strong>Idioma(s):</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'No disponible'}</p>
        <p><strong>Moneda:</strong> ${country.currencies ? Object.values(country.currencies).map(c => c.name + ' (' + c.symbol + ')').join(', ') : 'No disponible'}</p>
        <p><strong>Fronteras:</strong> ${country.borders ? country.borders.join(', ') : 'No tiene'}</p>
        <p><a href="${country.maps.googleMaps}" target="_blank">Ver en Google Maps</a></p>
      `;
    })
    .catch(error => {
      resultadoDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
});
