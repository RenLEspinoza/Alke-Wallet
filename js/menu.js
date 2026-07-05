$(document).ready(function () {
    // ==========================================
    // 1. CONFIGURACIÓN INICIAL DEL USUARIO
    // ==========================================
    const correoUsuario = localStorage.getItem('usuarioActual'); 

    // Seguridad: Si no hay sesión iniciada, redirige de inmediato
    if (!correoUsuario) {
        window.location.href = 'login.html';
        return; // Detiene la ejecución del código
    }

    // Estructuramos las llaves únicas para este usuario
    const llaveSaldo = correoUsuario + '_saldo';
    const llaveIngresos = correoUsuario + '_ingresos';

    // ==========================================
    // 2. VALORES INICIALES (Si es usuario nuevo)
    // ==========================================
    if (!localStorage.getItem(llaveSaldo)) {
        localStorage.setItem(llaveSaldo, 1250000); // Saldo inicial unificado ($1.250.000)
    }
    if (!localStorage.getItem(llaveIngresos)) {
        localStorage.setItem(llaveIngresos, 250000); 
    }

    // ==========================================
    // 3. FUNCIÓN UNIFICADA PARA PINTAR LA INTERFAZ
    // ==========================================
    function actualizarPantallaMenu() {
        // A. Cargar Nombre Real
        const nombreReal = localStorage.getItem(correoUsuario + '_nombre') || 'Usuario';
        $('#nombre-usuario').text(nombreReal);

        // B. Cargar Saldos
        let saldoActual = parseFloat(localStorage.getItem(llaveSaldo));
        let ingresosActuales = parseFloat(localStorage.getItem(llaveIngresos));

        // C. Pintar en el HTML (Asegúrate de que en menu.html el ID sea #saldo-menu o #saldo-disponible)
        $('#saldo-disponible').text('$' + saldoActual.toLocaleString('es-CL'));
        $('#ingresos-mes').text('+$' + ingresosActuales.toLocaleString('es-CL'));
    }

    // Ejecutamos en el milisegundo 0 para evitar parpadeos
    actualizarPantallaMenu();

    // ==========================================
    // 4. ESCUCHAR TRANSFERENCIAS DESDE OTRAS PÁGINAS
    // ==========================================
    // Si el usuario transfiere en "sendmoney.html" y vuelve al menú, 
    // este evento actualiza el saldo de fondo automáticamente.
    window.addEventListener('storage', function (e) {
        if (e.key === llaveSaldo) {
            actualizarPantallaMenu();
        }
    });
});