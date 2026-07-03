//
// Incorporar nombre del usuario en la visualización de datos del menú.
//

// Escuchamos cuando todo el HTML de la página de menú esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Vamos al localStorage a buscar el nombre que guardamos en el registro
    const nombreGuardado = localStorage.getItem('usuarioNombre');

    // 2. Buscamos el elemento HTML donde queremos mostrarlo
    const contenedorNombre = document.getElementById('nombre-usuario');

    // 3. Verificamos si efectivamente hay un nombre guardado
    if (nombreGuardado) {
        // Reemplazamos el texto "Invitado" por el nombre real del usuario
        contenedorNombre.textContent = nombreGuardado;
    }
});

//_________________________________________________________________________________
//
// Actualizar el saldo disponible en el menú con los datos del localStorage
//

$(document).ready(function () {
    // 1. Definir valores iniciales por defecto si no existen en localStorage
    if (!localStorage.getItem('saldo')) {
        localStorage.setItem('saldo', 125600);
    }
    if (!localStorage.getItem('ingresos')) {
        localStorage.setItem('ingresos', 45000);
    }

    // 2. Cargar y mostrar los valores actuales en la interfaz
    actualizarPantallaMenu();

    function actualizarPantallaMenu() {
        // Obtener los valores numéricos convertidos desde localStorage
        let saldoActual = parseFloat(localStorage.getItem('saldo'));
        let ingresosActuales = parseFloat(localStorage.getItem('ingresos'));

        // Formatear a moneda local y pintar en el HTML
        $('#saldo-disponible').text('$' + saldoActual.toLocaleString('es-CL'));
        $('#ingresos-mes').text('+$' + ingresosActuales.toLocaleString('es-CL'));
    }
});