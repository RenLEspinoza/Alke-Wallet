//_____________________________________________________________________

// Realizar deposito y actualizar datos de saldo e ingresos.
//_____________________________________________________________________

$(document).ready(function () {
    let alertaTimeout; // Variable para almacenar el temporizador de la alerta.

    $('#btn-depositar').click(function () {
        // 1. Declarar y obtener los valores del formulario.
        let medioPago = $('#medioPago').val(); 
        let montoInput = $('#montoDeposito').val(); 
        let monto = parseFloat(montoInput); 
        
        // 2. Validaciones básicas de entrada.
        if (!medioPago) {
            mostrarAlerta('Por favor, selecciona un medio de pago.', 'alert-danger');
            return;
        }

        if (isNaN(monto) || monto < 1000) {
            mostrarAlerta('El monto mínimo de depósito es $1.000.', 'alert-danger');
            return;
        }

        // 3. Obtener valores actuales de localStorage o los valores por defecto.
        let saldoActual = parseFloat(localStorage.getItem('saldo')) || 125600;
        let ingresosActuales = parseFloat(localStorage.getItem('ingresos')) || 45000;

        // 4. Realizar la suma matemática.
        let nuevoSaldo = saldoActual + monto; 
        let nuevosIngresos = ingresosActuales + monto; 

        // 5. Guardar los nuevos estados en localStorage.
        localStorage.setItem('saldo', nuevoSaldo);
        localStorage.setItem('ingresos', nuevosIngresos);

        // 6. Mostrar feedback de éxito al usuario y limpiar el input.
        mostrarAlerta(`¡Depósito exitoso de $${monto.toLocaleString('es-CL')} mediante ${medioPago}!`, 'alert-success');
        $('#montoDeposito').val('');
        $('#medioPago').val('');
    });

    // Función auxiliar para mostrar alertas con temporizador
    function mostrarAlerta(mensaje, claseBootstrap) {
        let $alerta = $('#mensaje-alerta'); 
        
        // Limpiamos el temporizador previo si ya existe
        clearTimeout(alertaTimeout);

        // Removemos d-none y luego manipulamos con jQuery
        $alerta.removeClass('d-none alert-danger alert-success')
               .addClass(claseBootstrap) 
               .text(mensaje)
               .stop(true, true) // Detiene animaciones previas a medias en caso de que el usuario haga clic rápido varias veces.
               .show(); 

        // Establece el temporizador para ocultar la alerta después de 5 segundos.
        alertaTimeout = setTimeout(function() {
            $alerta.fadeOut(function() {
                $(this).addClass('d-none'); 
            });
        }, 5000); 
    }
});