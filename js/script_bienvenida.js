// Obtener referencias del DOM
const welcomeMessageDiv = document.getElementById('welcomeMessage');
const editarNombreBtn = document.getElementById('editarNombreBtn');

// Función para mostrar el mensaje de bienvenida
function mostrarBienvenida() {
    // Revisar si hay nombre guardado en localStorage
    const nombreGuardado = localStorage.getItem('usuarioNombre') || 'Invitado';
    // Crear el mensaje con animación
    welcomeMessageDiv.innerHTML = `<h2 class="fade-in">¡Bienvenido, ${nombreGuardado}!</h2>`;
}

// Función para editar nombre
function editarNombre() {
    const nuevoNombre = prompt('Ingresa tu nombre:');
    if (nuevoNombre && nuevoNombre.trim() !== '') {
        localStorage.setItem('usuarioNombre', nuevoNombre.trim());
        mostrarBienvenida();
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    mostrarBienvenida();
    editarNombreBtn.addEventListener('click', editarNombre);
});
