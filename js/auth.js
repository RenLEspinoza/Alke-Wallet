//__________________________________________________________________________________________
// Borrar datos del "localstorage" al hacer click en el boton de cerrar sesión.
//__________________________________________________________________________________________

// Buscamos el botón de cerrar sesión.
const btnLogout = document.getElementById("btn-logout");

if (btnLogout) {
  btnLogout.addEventListener("click", (e) => {
    // 1. Evitamos que el enlace HTML actúe antes de que JS termine de borrar
    e.preventDefault();

    // 2. Eliminamos la sesión activa borrando el usuario actual
    localStorage.removeItem("usuarioActual");
    localStorage.removeItem("usuarioNombre");
    localStorage.removeItem("usuarioEmail");
    localStorage.removeItem("usuarioPassword");

    // Nota: El saldo e ingresos no se tocan (se quedan guardados con su correo + '_saldo')

    // 3. Informamos al usuario
    alert("Sesión cerrada correctamente.");

    // 4. Sacamos al usuario hacia la página de inicio/login
    window.location.href = "index.html";
  });
}
