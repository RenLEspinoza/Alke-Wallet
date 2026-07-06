// VALIDACIÓN DE LOGIN CON DATOS GUARDADOS DEL USUARIO

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  // 1. Buscamos en "localStorage" el correo y la password que se guardaron previamente en el registro.
  const emailRegistrado = localStorage.getItem("usuarioEmail");
  const passwordRegistrada = localStorage.getItem("usuarioPassword");
  const nombreRegistrado = localStorage.getItem("usuarioNombre");

  // Capturamos el correo y contraseña que escribe el usuario en el login.
  const emailIngresado = emailInput.value;
  const passwordIngresada = passwordInput.value;

  // 2. Comparamos lo ingresado contra lo que estaba guardado.
  if (
    emailIngresado === emailRegistrado &&
    passwordIngresada === passwordRegistrada
  ) {
    // Guardamos cuál es el usuario que acaba de iniciar sesión con éxito.
    localStorage.setItem("usuarioActual", emailIngresado);

    alert("🔓 ¡Ingreso exitoso!");
    window.location.href = "menu.html"; // Redirigimos al Menú.
  } else {
    alert("❌ Correo o contraseña incorrectos.");
  }
});
