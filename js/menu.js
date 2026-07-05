$(document).ready(function () {

    
    // __________________________________________

    // 1. Configuración del usuario.
    // __________________________________________
    const correoUsuario = localStorage.getItem('usuarioActual'); 
    const llaveSaldo = correoUsuario + '_saldo';
    const llaveIngresos = correoUsuario + '_ingresos';

    // __________________________________________

    // 2. Valores por defecto de saldo e ingresos.
    // __________________________________________
    if (!localStorage.getItem(llaveSaldo)) {
        localStorage.setItem(llaveSaldo, 1250000);
    }
    if (!localStorage.getItem(llaveIngresos)) {
        localStorage.setItem(llaveIngresos, 250000); 
    }

    // ________________________________________________________

    // 3. Función para mostrar datos del usuario en pantalla.
    // ________________________________________________________

    function actualizarPantallaMenu() {
        // Busca el nombre del usuario.
        const nombreReal = localStorage.getItem(correoUsuario + '_nombre') || 'Usuario';
        $('#nombre-usuario').text(nombreReal);

        // Busca los saldos.
        let saldoActual = parseFloat(localStorage.getItem(llaveSaldo));
        let ingresosActuales = parseFloat(localStorage.getItem(llaveIngresos));

        // Modifica la información en el html.
        $('#saldo-disponible').text('$' + saldoActual.toLocaleString('es-CL'));
        $('#ingresos-mes').text('+$' + ingresosActuales.toLocaleString('es-CL'));
    }

    // Ejecutamos en el milisegundo 0 para evitar parpadeos
    actualizarPantallaMenu();

    // ________________________________________________________

    // 4. Escuchar movimientos de saldo en otras pantallas.
    // ________________________________________________________

    // Si el usuario transfiere en "sendmoney.html" o deposita en "deposit.html" y vuelve al menú, 
    // este evento actualiza el saldo de fondo automáticamente.
    window.addEventListener('storage', function (e) {
        if (e.key === llaveSaldo) {
            actualizarPantallaMenu();
        }
    });
});