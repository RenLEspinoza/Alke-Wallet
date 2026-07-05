$(document).ready(function () {
    // 1. Buscamos la lista de movimientos guardada en el navegador
    // Si no hay nada, creamos una lista vacía []
    let historial = JSON.parse(localStorage.getItem('historial_movimientos')) || [];

    // 2. Seleccionamos el cuerpo de nuestra tabla
    let $tabla = $('#contenedor-movimientos');
    $tabla.empty(); // Nos aseguramos de limpiar la tabla antes de dibujar

    // 3. Si no hay movimientos todavía, ponemos un mensaje simple
    if (historial.length === 0) {
        $tabla.append('<tr><td colspan="4" class="text-center text-muted">Aún no registras movimientos.</td></tr>');
        return;
    }

    // 4. Recorremos la lista desde el último movimiento al primero (al revés) para que el más nuevo salga arriba
    historial.reverse().forEach(function (movimiento) {
        
        // Creamos una fila HTML usando las variables de cada movimiento
        let fila = `
            <tr>
                <td class="align-middle">${movimiento.fecha}</td>
                <td class="align-middle">
                    <span class="badge ${movimiento.claseBadge}">${movimiento.tipo}</span>
                </td>
                <td class="align-middle">${movimiento.detalle}</td>
                <td class="align-middle font-weight-bold ${movimiento.claseMonto}">${movimiento.signo}$${movimiento.monto.toLocaleString('es-CL')}</td>
            </tr>
        `;

        // Añadimos la fila a la tabla
        $tabla.append(fila);
    });
});