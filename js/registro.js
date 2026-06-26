// VALIDACIÓN DEL FORMULARIO DE REGISTRO (registro.html)

// 1. Seleccionamos el formulario, la contraseña y la confirmación de contraseña con "getElementById"

const formulario = document.getElementById('formulario-registro');
const passwordInput = document.getElementById('password-registro');
const confirmPasswordInput = document.getElementById('confirm-password-registro'); 

// 2. Escuchamos el evento 'submit' (cuando se intenta enviar el formulario) con "addEventListener"
formulario.addEventListener('submit', function(evento) {

// con el evento "preventDefault()", frenamos que la pagina se actualice (debido al submit) antes de verificar la contraseña.
evento.preventDefault();

    // Guardamos los valores actuales que escribió el usuario en la contraseña y la confirmación de contraseña.
    const password = passwordInput.value;
    const confirmacion = confirmPasswordInput.value;

    // 3. Comparamos estos mismos valores y vemos si son ESTRICTAMENTE IGUALES.
    if (password !== confirmacion) {
        // Si NO SON ESTRICTAMENTE IGUALES, mostramos el error con un alert.
        alert('❌ Las contraseñas no coinciden. Por favor, verifica e intenta de nuevo.');
        
        // Esto limpia los valores en ambos input de las contraseñas (Ya que no podemos saber en cual se equivoco).
        confirmPasswordInput.value = '';
        passwordInput.value = '';
        // Con "focus" demos el cursor parpadeando en la primera contraseña (previamente vaciada).
        passwordInput.focus(); 
        
    } else {
    // 1. Capturamos también el nombre que ingresó el usuario
        const nombreIngresado = document.getElementById('nombre-registro').value;
        const correoIngresado = document.getElementById('email-registro').value;

    // 2. Guardamos los datos en el localStorage (se guardan como texto con una "llave" y un "valor")
        localStorage.setItem('usuarioNombre', nombreIngresado);
        localStorage.setItem('usuarioEmail', correoIngresado);
        localStorage.setItem('usuarioPassword', password); // 'password' viene de tu variable anterior

        alert('¡Registro exitoso, redireccionando!');
        window.location.href = 'login.html'; // Redirigimos al Login
}
});


