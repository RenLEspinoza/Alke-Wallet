// Escuchamos cuando todo el HTML de la página de menú esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Vamos al localStorage a buscar el nombre que guardamos en el registro
    const nombreGuardado = localStorage.getItem('usuarioNombre');

    // 2. Buscamos el elemento HTML donde queremos mostrarlo
    const contenedorNombre = document.getElementById('nombre-usuario');

    // 3. Verificamos si efectivamente hay un nombre guardado
    if (nombreGuardado) {
        // Reemplazamos el texto "Invitado" por el nombre real del usuario
        contenedorNombre.textContent = nombreGuardado;
    } else {
        // Opcional: Si alguien intenta entrar al menú sin registrarse, 
        // puedes dejar el texto "Invitado" o redirigirlo al login por seguridad
        contenedorNombre.textContent = "Usuario";
    }
});


//__________________________________________________________________________________________

// Borrar datos del "localstorage" al hacer click en el boton de cerrar sesión.
//__________________________________________________________________________________________

// Buscamos el botón de cerrar sesión.
const btnLogout = document.getElementById('btn-logout');

// Si el boton de cerrar sesión (logout) hace click:
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        // Borramos los datos del localStorage
        localStorage.removeItem('usuarioNombre');
        localStorage.removeItem('usuarioEmail');
        localStorage.removeItem('usuarioPassword');
        
        // ( Si quisieramos limpiar todo el casillero de una sola vez: localStorage.clear(); ).

        // Generamos una alerta que indique que la sesión se cerro correctamente.
        alert('Sesión cerrada correctamente.');
        // Y redirigimos al login.
        window.location.href = 'login.html';
    });
}