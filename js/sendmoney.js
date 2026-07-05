$(document).ready(function () {
    let alertaTimeout; // Variable para almacenar el temporizador de la alerta.

    // ___________________________________________________________

    // Configuración del usuario.
    // ___________________________________________________________
    let usuarioActual = localStorage.getItem('usuarioActual'); 
    let llaveContactos = usuarioActual + '_lista_contactos';
    let llaveSaldo = usuarioActual + '_saldo';

    // ___________________________________________________________

    // Función mostrar saldo actualizado.
    // ___________________________________________________________
    function actualizarSaldoVisual() {
        // Buscamos el saldo en localStorage.
        let saldoActual = parseFloat(localStorage.getItem(llaveSaldo));
        
        // Lo agregamos en el HTML con formato de moneda chilena.
        $('#saldo-disponible').text(`$${saldoActual.toLocaleString('es-CL')}`);
    }

    // Ejecutamos al cargar la pantalla para que no aparezca el saldo en $0.
    actualizarSaldoVisual();

    // ___________________________________________________________

    // Cargar o inicializar contactos (localstorage + html).
    // ___________________________________________________________
    let contactosGuardados = localStorage.getItem(llaveContactos);
    let listaContactos = [];

    if (contactosGuardados) {
        listaContactos = JSON.parse(contactosGuardados);
    } else {
        // Si no hay nada guardado, lee los contactos que hay en el HTML.
        $('#listaContactos .list-group-item').each(function() {
            let nombre = $(this).find('h6').text().trim();
            // Extrae el número de cuenta quitando el texto "N° Cuenta: ".
            let cuentaTexto = $(this).find('.badge').text().replace('N° Cuenta: ', '').trim();
            
            if (nombre) {
                listaContactos.push({
                    nombre: nombre,
                    cuenta: cuentaTexto,
                    rut: 'N/A',
                    banco: 'Banco'
                });
            }
        });
        
        // Si hay contactos por defecto en el html, los guarda.
        if (listaContactos.length > 0) {
            localStorage.setItem(llaveContactos, JSON.stringify(listaContactos));
        }
    }

    // _____________________________________________________________________________

    // Actualiza lista de contactos de forma interna y en la lista de la pantalla.
    // _____________________________________________________________________________
    function actualizarInterfazContactos() {
        // Limpiamos el contenedor HTML de la derecha para evitar duplicados.
        $('#listaContactos').empty();

        // Volvemos a pintar cada contacto en la lista lateral.
        listaContactos.forEach(function(contacto) {
            $('#listaContactos').append(`
                <div class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1 font-weight-bold">${contacto.nombre}</h6>
                    </div>
                    <div><span class="badge badge-secondary">N° Cuenta: ${contacto.cuenta}</span></div>
                </div>
            `);
        });

        // Extrae solo los nombres para el autocompletar.
        let nombresSugerencias = listaContactos.map(c => c.nombre);

        // Inicializamos o actualizamos el Autocomplete de jQuery UI.
        if ($("#buscarContacto").data("ui-autocomplete")) {
            // Si ya existe, refrescamos sus opciones de origen.
            $("#buscarContacto").autocomplete("option", "source", nombresSugerencias);
        } else {
            // Si es la primera vez que carga, lo creamos.
            $("#buscarContacto").autocomplete({
                source: nombresSugerencias,
                minLength: 1 
            });
        }
    }

    // Ejecución inicial al abrir la pantalla.
    actualizarInterfazContactos();


    // ________________________________________________________________

    // Evento 1: Simular transferencia.
    // ________________________________________________________________
    $('#btn-confirmar-envio').click(function () {
        let nombreBuscar = $('#buscarContacto').val().trim();
        let monto = parseFloat($('#montoEnviar').val());
        
        if (!nombreBuscar) {
            mostrarAlerta('Por favor, selecciona un contacto.', 'alert-danger');
            return;
        }

        let contactoEncontrado = listaContactos.find(c => c.nombre.toLowerCase() === nombreBuscar.toLowerCase());

        if (!contactoEncontrado) {
            mostrarAlerta('El contacto ingresado no existe en tu lista.', 'alert-danger');
            return;
        }
        if (isNaN(monto) || monto <= 0) {
            mostrarAlerta('Por favor, ingresa un monto válido.', 'alert-danger');
            return;
        }

        let saldoActual = parseFloat(localStorage.getItem(llaveSaldo)) || 125600;
        if (monto > saldoActual) {
            mostrarAlerta('Fondos insuficientes.', 'alert-danger');
            return;
        }

        let nuevoSaldo = saldoActual - monto;
        localStorage.setItem(llaveSaldo, nuevoSaldo);
        
        mostrarAlerta(`¡Transferencia de $${monto.toLocaleString('es-CL')} a ${contactoEncontrado.nombre} realizada con éxito!`, 'alert-success');
        
        // Guardar transferencia en el historial de movimientos.

        // 1. Intentamos obtener el contacto seleccionado
// 1. Capturamos directamente lo que el usuario escribió en la caja de texto
let contactoSeleccionado = $('#buscarContacto').val().trim();

// 2. Si la caja estaba vacía, le ponemos un texto por defecto
if (!contactoSeleccionado) {
    contactoSeleccionado = "Destinatario no especificado";
}

// 3. --- GUARDAR TRANSFERENCIA EN EL HISTORIAL ---
let historial = JSON.parse(localStorage.getItem('historial_movimientos')) || [];
historial.push({
    fecha: new Date().toLocaleDateString('es-CL'),
    tipo: 'Envío',
    claseBadge: 'badge-danger',
    detalle: 'A: ' + contactoSeleccionado, // Ahora sí guardará el texto escrito a mano
    signo: '-',
    claseMonto: 'text-danger',
    monto: monto
});
localStorage.setItem('historial_movimientos', JSON.stringify(historial));


        actualizarSaldoVisual(); 
        
        $('#montoEnviar').val('');
        $('#buscarContacto').val('');
    });

    // ______________________________________________________________

    // Evento 2: Agregar nuevo contacto.
    // ______________________________________________________________
    $('#btn-guardar-contacto').click(function () {
        let nuevoNombre = $('#nombreContacto').val().trim();
        let nuevaCuenta = $('#cuentaContacto').val().trim();
        let nuevoRut = $('#rutContacto').val() ? $('#rutContacto').val().trim() : 'N/A';
        let nuevoBanco = $('#bancoContacto').val() ? $('#bancoContacto').val().trim() : 'Banco';

        if (nuevoNombre === "" || nuevaCuenta === "") {
            alert('Por favor, completa los campos requeridos.');
            return;
        }

        // 1. Añadimos objeto al array.
        listaContactos.push({
            nombre: nuevoNombre,
            cuenta: nuevaCuenta,
            rut: nuevoRut,
            banco: nuevoBanco
        });

        // 2. Guardamos en el almacenamiento local en formato JSON string.
        localStorage.setItem(llaveContactos, JSON.stringify(listaContactos));

        // 3. Llamamos a la función para actualizar lista y sugerencias.
        actualizarInterfazContactos();

        // 4. Limpieza de inputs y cierre del modal.
        $('#nombreContacto').val('');
        $('#cuentaContacto').val('');
        if($('#rutContacto').length) $('#rutContacto').val('');
        if($('#bancoContacto').length) $('#bancoContacto').val('');

        $(this).blur(); 
        $('#modalContacto').modal('hide'); 
        $('#buscarContacto').focus();

        mostrarAlerta(`¡Contacto "${nuevoNombre}" agregado exitosamente!`, 'alert-success');
    });

    // Función auxiliar de alertas.
    function mostrarAlerta(mensaje, claseBootstrap) {
        let $alerta = $('#mensaje-alerta'); 
        clearTimeout(alertaTimeout);
        $alerta.removeClass('d-none alert-danger alert-success').addClass(claseBootstrap).text(mensaje).stop(true, true).show();
        alertaTimeout = setTimeout(function() {
            $alerta.fadeOut(function() { $(this).addClass('d-none'); });
        }, 5000); 
    }
});