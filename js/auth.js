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
        // window.location.href = 'login.html';
    });
}