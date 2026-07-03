//__________________________________________________________________________________________

// Borrar datos del "localstorage" al hacer click en el boton de cerrar sesión.
//__________________________________________________________________________________________

// Buscamos el botón de cerrar sesión.
const btnLogout = document.getElementById('btn-logout');

// Si el boton de cerrar sesión (logout) hace click:
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        // Borramos los datos especificos del localStorage
        // Eliminamos los datos especificos para no tocar el saldo de la cuenta ni los ingresos, ya que esos datos son persistentes y no dependen de la sesión del usuario.
        localStorage.removeItem('usuarioNombre');
        localStorage.removeItem('usuarioEmail');
        localStorage.removeItem('usuarioPassword');
        

        // Generamos una alerta que indique que la sesión se cerro correctamente.
        alert('Sesión cerrada correctamente.');
        // Y redirigimos al menú.
        window.location.href = 'menu.html';
    });
}