$(document).ready(function () {
    let alertaTimeout;

    // ==========================================
    // 0. CONFIGURACIÓN INICIAL DEL USUARIO
    // ==========================================
    let usuarioActual = localStorage.getItem('usuarioActual'); 
    let llaveContactos = usuarioActual + '_lista_contactos';
    let llaveSaldo = usuarioActual + '_saldo';

    // ==========================================
    // FUNCIÓN NUEVA: MOSTRAR SALDO ACTUALIZADO
    // ==========================================
    function actualizarSaldoVisual() {
        // Buscamos el saldo en localStorage.
        let saldoActual = parseFloat(localStorage.getItem(llaveSaldo));
        
        // Lo pintamos en el HTML con formato de moneda chilena
        $('#saldo-disponible').text(`$${saldoActual.toLocaleString('es-CL')}`);
    }

    // Ejecutamos al cargar la pantalla para que no aparezca en $0
    actualizarSaldoVisual();

    // ==========================================
    // 1. CARGAR O INICIALIZAR CONTACTOS (LOCALSTORAGE + HTML)
    // ==========================================
    let contactosGuardados = localStorage.getItem(llaveContactos);
    let listaContactos = [];

    if (contactosGuardados) {
        listaContactos = JSON.parse(contactosGuardados);
    } else {
        // SOLUCIÓN: Si no hay nada guardado, leemos los contactos que ya pusiste en el HTML
        $('#listaContactos .list-group-item').each(function() {
            let nombre = $(this).find('h6').text().trim();
            // Extraemos el número de cuenta quitando el texto "N° Cuenta: "
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
        
        // Si encontramos contactos en el HTML, los dejamos guardados en el LocalStorage de una vez
        if (listaContactos.length > 0) {
            localStorage.setItem(llaveContactos, JSON.stringify(listaContactos));
        }
    }

    // ==========================================
    // 2. RENDERIZAR LISTA VISUAL Y SUGERENCIAS
    // ==========================================
    function actualizarInterfazContactos() {
        // Limpiamos el contenedor HTML de la derecha para evitar duplicados
        $('#listaContactos').empty();

        // Volvemos a pintar cada contacto en la lista lateral
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

        // EXTRAEMOS SOLO LOS NOMBRES PARA EL AUTOCOMPLETE
        let nombresSugerencias = listaContactos.map(c => c.nombre);

        // Inicializamos o actualizamos el Autocomplete de jQuery UI
        if ($("#buscarContacto").data("ui-autocomplete")) {
            // Si ya existe, refrescamos sus opciones de origen
            $("#buscarContacto").autocomplete("option", "source", nombresSugerencias);
        } else {
            // Si es la primera vez que carga, lo creamos
            $("#buscarContacto").autocomplete({
                source: nombresSugerencias,
                minLength: 1 
            });
        }
    }

    // Ejecución inicial al abrir la pantalla
    actualizarInterfazContactos();


    // ==========================================
    // EVENTO 1: SIMULAR TRANSFERENCIA
    // ==========================================
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
        
        actualizarSaldoVisual(); 

        mostrarAlerta(`¡Transferencia de $${monto.toLocaleString('es-CL')} a ${contactoEncontrado.nombre} realizada con éxito!`, 'alert-success');
        
        $('#montoEnviar').val('');
        $('#buscarContacto').val('');
    });

    // ==========================================
    // EVENTO 2: AGREGAR NUEVO CONTACTO
    // ==========================================
    $('#btn-guardar-contacto').click(function () {
        let nuevoNombre = $('#nombreContacto').val().trim();
        let nuevaCuenta = $('#cuentaContacto').val().trim();
        let nuevoRut = $('#rutContacto').val() ? $('#rutContacto').val().trim() : 'N/A';
        let nuevoBanco = $('#bancoContacto').val() ? $('#bancoContacto').val().trim() : 'Banco';

        if (nuevoNombre === "" || nuevaCuenta === "") {
            alert('Por favor, completa los campos requeridos.');
            return;
        }

        // 1. Añadimos el nuevo objeto al array
        listaContactos.push({
            nombre: nuevoNombre,
            cuenta: nuevaCuenta,
            rut: nuevoRut,
            banco: nuevoBanco
        });

        // 2. Guardamos en el almacenamiento local en formato JSON string
        localStorage.setItem(llaveContactos, JSON.stringify(listaContactos));

        // 3. LLAMAMOS A NUESTRA FUNCIÓN para redibujar la lista y actualizar las sugerencias instantáneamente
        actualizarInterfazContactos();

        // 4. Limpieza de inputs y cierre del modal
        $('#nombreContacto').val('');
        $('#cuentaContacto').val('');
        if($('#rutContacto').length) $('#rutContacto').val('');
        if($('#bancoContacto').length) $('#bancoContacto').val('');

        $(this).blur(); 
        $('#modalContacto').modal('hide'); 
        $('#buscarContacto').focus();

        mostrarAlerta(`¡Contacto "${nuevoNombre}" agregado exitosamente!`, 'alert-success');
    });

    // Función auxiliar de alertas
    function mostrarAlerta(mensaje, claseBootstrap) {
        let $alerta = $('#mensaje-alerta'); 
        clearTimeout(alertaTimeout);
        $alerta.removeClass('d-none alert-danger alert-success').addClass(claseBootstrap).text(mensaje).stop(true, true).show();
        alertaTimeout = setTimeout(function() {
            $alerta.fadeOut(function() { $(this).addClass('d-none'); });
        }, 5000); 
    }
});