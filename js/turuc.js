document.getElementById("buscarRuc").addEventListener("click", async () => {
  const ruc = document.getElementById("rucInput").value.trim();
  const salida = document.getElementById("resultadoRuc");

  if (!ruc) {
    salida.innerHTML = "Por favor ingresá un RUC.";
    return;
  }

  salida.innerHTML = "Consultando...";

  try {
    const response = await fetch(`https://turuc.com.py/api/contribuyente/${ruc}`);
    
    if (!response.ok) {
      throw new Error("No se pudo consultar el RUC");
    }

    const result = await response.json();

    if (result.data) {
      salida.innerHTML = `
        <h3>Resultado de la consulta</h3>
        <p><strong>RUC:</strong> ${result.data.ruc}</p>
        <p><strong>Nombre:</strong> ${result.data.razonSocial}</p>
        <p><strong>Estado:</strong> ${result.data.estado}</p>
        <small class="muted">*Datos obtenidos de la API</small>
      `;
    } else {
      salida.innerHTML = "No se encontró información para ese RUC.";
    }

  } catch (error) {
    salida.innerHTML = "Error al consultar el RUC. Verificá la conexión o el número ingresado.";
    console.error(error);
  }
});
