$(document).ready(function () {
    let alertaTimeout; // Variable para almacenar el temporizador de la alerta.

    // ______________________________________________________________

    // 0. Configuración del usuario
    // ______________________________________________________________
    const correoUsuario = localStorage.getItem('usuarioActual'); 
    const llaveSaldo = correoUsuario + '_saldo';
    const llaveIngresos = correoUsuario + '_ingresos';

    // _______________________________________________________________

    // Función mostrar saldo actualizado.
    // _______________________________________________________________
    function actualizarSaldoVisual() {
        // Buscamos el saldo en localStorage.
        let saldoActual = parseFloat(localStorage.getItem(llaveSaldo));

        // Lo agregamos en el HTML con formato de moneda chilena.
        $('#saldo-disponible').text(`$${saldoActual.toLocaleString('es-CL')}`);
    }

    // Ejecutamos al cargar la pantalla para que no aparezca el saldo en $0.
    actualizarSaldoVisual();

    // _______________________________________________________________

    // Evento 1: Simular deposito o retiro.
    // _______________________________________________________________
    $('#btn-depositar').click(function () {
        let montoInput = $('#montoDeposito').val(); 
        let monto = parseFloat(montoInput); 
        
        if (isNaN(monto) || monto < 1000) {
            mostrarAlerta('El monto mínimo de depósito es $1.000.', 'alert-danger');
            return;
        }

        // Leemos del localStorage usando las llaves del usuario
        let saldoActual = parseFloat(localStorage.getItem(llaveSaldo)) || 1250000;
        let ingresosActuales = parseFloat(localStorage.getItem(llaveIngresos)) || 250000;

        // Cálculos correspondientes
        let nuevoSaldo = saldoActual + monto; 
        let nuevosIngresos = ingresosActuales + monto; 

        // --- GUARDAR DEPÓSITO EN EL HISTORIAL ---
        let historial = JSON.parse(localStorage.getItem('historial_movimientos')) || [];
        historial.push({
        fecha: new Date().toLocaleDateString('es-CL'), // Fecha de hoy (DD/MM/AAAA)
        tipo: 'Depósito',
        claseBadge: 'badge-success', // Color verde de Bootstrap
        detalle: 'Depósito cuenta propia',
        signo: '+',
        claseMonto: 'text-success',
         monto: monto // El monto que ingresó el usuario
        
        });
localStorage.setItem('historial_movimientos', JSON.stringify(historial));


        // Guardamos
        localStorage.setItem(llaveSaldo, nuevoSaldo);
        localStorage.setItem(llaveIngresos, nuevosIngresos);

        // Actualizamos visualmente el saldo de inmediato sin recargar la página
        actualizarSaldoVisual();

        mostrarAlerta(`¡Depósito exitoso de $${monto.toLocaleString('es-CL')} realizado con éxito!`, 'alert-success');
        $('#montoDeposito').val('');
    });

    // ==========================================
    // EVENTO 2: SIMULAR RETIRO
    // ==========================================
    $('#btn-retirar').click(function () {
        let montoInput = $('#montoDeposito').val(); 
        let monto = parseFloat(montoInput); 
        
        if (isNaN(monto) || monto < 1000) {
            mostrarAlerta('El monto mínimo de retiro es $1.000.', 'alert-danger');
            return;
        }

        let saldoActual = parseFloat(localStorage.getItem(llaveSaldo)) || 1250000;

        // Validación crítica: No se puede retirar más de lo que se tiene
        if (monto > saldoActual) {
            mostrarAlerta('Fondos insuficientes para realizar este retiro.', 'alert-danger');
            return;
        }

        // Restamos los fondos
        let nuevoSaldo = saldoActual - monto; 

        // --- GUARDAR RETIRO EN EL HISTORIAL ---
        let historial = JSON.parse(localStorage.getItem('historial_movimientos')) || [];
        historial.push({
        fecha: new Date().toLocaleDateString('es-CL'),
        tipo: 'Retiro',
        claseBadge: 'badge-danger', // Color rojo de Bootstrap
        detalle: 'Retiro de fondos',
        signo: '-',
        claseMonto: 'text-danger',
        monto: monto
        });
        localStorage.setItem('historial_movimientos', JSON.stringify(historial));

        // Guardamos (Nota: Al retirar NO alteramos los ingresos del mes)
        localStorage.setItem(llaveSaldo, nuevoSaldo);

        // Actualizamos visualmente la interfaz de inmediato
        actualizarSaldoVisual();

        mostrarAlerta(`¡Retiro exitoso de $${monto.toLocaleString('es-CL')} completado con éxito!`, 'alert-success');
        $('#montoDeposito').val('');


    });

    // Actualizar saldo visual //
    // Escucha eventos que modifiquen el saldo en otras pantallas.
    window.addEventListener('storage', function (e) {
        if (e.key === llaveSaldo) {
            actualizarSaldoVisual();
        }
    });

    // Función auxiliar para mostrar alertas con temporizador.
    function mostrarAlerta(mensaje, claseBootstrap) {
        let $alerta = $('#mensaje-alerta'); 
        clearTimeout(alertaTimeout);

        $alerta.removeClass('d-none alert-danger alert-success')
               .addClass(claseBootstrap) 
               .text(mensaje)
               .stop(true, true)
               .show(); 

        alertaTimeout = setTimeout(function() {
            $alerta.fadeOut(function() {
                $(this).addClass('d-none'); 
            });
        }, 5000); 
    }
});