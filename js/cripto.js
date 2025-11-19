// cripto.js
document.addEventListener('DOMContentLoaded', () => {
  const boton = document.getElementById('buscarCripto');
  const resultado = document.getElementById('resultadoCripto');
  const selectMoneda = document.getElementById('moneda');

  boton.addEventListener('click', async () => {
    const moneda = selectMoneda.value;

    // URL modificada: añadimos include_market_cap=true e include_24hr_change=true
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${moneda}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true&x_cg_demo_api_key=CG-3T9Y8p3XtDqpqNG8NU5eRtok`;

    try {
      resultado.textContent = 'Cargando...';

      const response = await fetch(url);
      if (!response.ok) throw new Error('Error en la API');

      const data = await response.json();

      const precio = data[moneda]?.usd;
      const cambio24h = data[moneda]?.usd_24h_change;
      const marketCap = data[moneda]?.usd_market_cap;

      if (precio !== undefined && cambio24h !== undefined && marketCap !== undefined) {
        const precioFormateado = precio.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        });
        const cambioFormateado = cambio24h.toFixed(2) + '%';
        const marketCapFormateado = marketCap.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0
        });

        resultado.innerHTML = `
          <p>Precio: ${precioFormateado}</p>
          <p>Cambio 24h: ${cambioFormateado}</p>
          <p>Market Cap: ${marketCapFormateado}</p>
        `;
      } else {
        resultado.textContent = 'No se pudo obtener alguno de los datos.';
      }
    } catch (error) {
      resultado.textContent = 'Ocurrió un error al consultar la API.';
      console.error(error);
    }
  });
});
