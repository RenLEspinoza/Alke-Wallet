$(document).ready(function () {

    // --- VARIABLES GLOBALES DE SIMULACIÓN ---
    // Usamos 'let' porque el saldo va a cambiar con los depósitos y transferencias
    let saldoActual = 150000; 

    // ==========================================
    // 1. PANTALLA: LOGIN (login.html)
    // Validación de credenciales
    // ==========================================
    $('#form-login').submit(function (evento) {
        evento.preventDefault(); // Evita que la página se recargue sola

        // Usamos 'const' porque estos valores no van a cambiar en esta función
        const correo = $('#email').val();
        const contrasena = $('#password').val();

        // Validamos con un IF / ELSE básico
        if (correo === "user@alke.com" && contrasena === "1234") {
            alert("¡Bienvenido a Alke Wallet!");
            window.location.href = "menu.html"; // Redirige al panel principal
        } else {
            alert("Credenciales incorrectas. Intenta con user@alke.com y 1234");
        }
    });

    // ==========================================
    // 2. PANTALLA: DEPÓSITO (deposit.html)
    // Evento "Realizar depósito"
    // ==========================================
    $('#btn-realizar-deposito').click(function () {
        // Capturamos el monto ingresado y lo convertimos a número entero
        const montoDeposito = parseInt($('#monto-deposito').val());

        // Verificamos que el monto sea un número válido y mayor a cero
        if (montoDeposito > 0) {
            // Modificamos el saldo usando operaciones matemáticas básicas
            saldoActual = saldoActual + montoDeposito;
            
            // Actualizamos el texto en la pantalla
            $('#txt-saldo').text(saldoActual); 
            
            alert("Depósito realizado con éxito. Nuevo saldo: $" + saldoActual);
            window.location.href = "menu.html"; // Volvemos al menú
        } else {
            alert("Por favor, ingresa un monto válido para depositar.");
        }
    });

    // ==========================================
    // 3. PANTALLA: ENVIAR DINERO (sendmoney.html)
    // Evento "Simular transferencia" y "Agregar contacto"
    // ==========================================
    
    // Función para Simular Transferencia
    $('#btn-confirmar-transferencia').click(function () {
        const montoTransferencia = parseInt($('#monto-transferir').val());
        const contacto = $('#destinatario').val();

        if (contacto === "") {
            alert("Por favor, ingresa un destinatario.");
        } else if (montoTransferencia > saldoActual) {
            alert("No tienes saldo suficiente para esta transacción.");
        } else if (montoTransferencia <= 0 || isNaN(montoTransferencia)) {
            alert("Por favor, ingresa un monto mayor a $0.");
        } else {
            // Restamos el dinero del saldo disponible
            saldoActual = saldoActual - montoTransferencia;
            
            alert("Transferencia exitosa a " + contacto + " por un monto de $" + montoTransferencia);
            window.location.href = "menu.html";
        }
    });
    // ==========================================
    // EVENTO: AGREGAR NUEVO CONTACTO
    // ==========================================
    $('#btn-agregar-contacto').click(function () {
    // Capturamos el valor del input del contacto
    const nuevoContacto = $('#nombre-contacto').val().trim();

    // Validamos con un IF básico que no esté vacío
    if (nuevoContacto !== "") {
        
        // Agregamos una nueva opción al datalist usando texto e interpolación básica
        $('#lista-contactos').append('<option value="' + nuevoContacto + '">');
        
        // Avisamos al usuario y limpiamos el campo
        alert("Contacto '" + nuevoContacto + "' agregado como sugerencia.");
        $('#nombre-contacto').val(''); 
        
    } else {
        alert("Por favor, escribe el nombre o correo del contacto antes de guardar.");
    }
    });

});