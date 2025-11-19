const boton = document.getElementById('buscarClima');
const inputCiudad = document.getElementById('ciudad');
const resultado = document.getElementById('resultadoClima');

boton.addEventListener('click', () => {
  const ciudad = inputCiudad.value.trim();
  if (ciudad === "") {
    resultado.innerHTML = "<p>Por favor, ingresá una ciudad.</p>";
    return;
  }

  const apiKey = "8f27bc08e0f0a27a25a9ad5862441035";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Ciudad no encontrada");
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const humedad = data.main.humidity;
      const descripcion = data.weather[0].description;

      resultado.innerHTML = `
        <p><strong>Temperatura:</strong> ${temp}°C</p>
        <p><strong>Humedad:</strong> ${humedad}%</p>
        <p><strong>Descripción del clima:</strong> ${descripcion}</p>
      `;
    })
    .catch(error => {
      resultado.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});
