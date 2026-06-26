function calcularSueldoNeto(nombre, sueldoBase, ...bonificaciones) {
    
    // Paso 1: Sumar todas las bonificaciones usando reduce
    // El '0' al final es el estado inicial de nuestra "alcancía"
    const totalBonificaciones = bonificaciones.reduce((acumulador, bono) => {
        return acumulador + bono;
    }, 0);

    // Paso 2: Calcular el sueldo bruto (Base + la suma de todos los bonos)
    const sueldoBruto = sueldoBase + totalBonificaciones;

    // Paso 3: Aplicar el descuento del 13%
    // Si te descuentan el 13%, te quedas con el 87% del sueldo (100 - 13 = 87)
    // Multiplicar por 0.87 es la forma más rápida de quitarle el 13%
    const sueldoNeto = sueldoBruto * 0.87;

    // Paso 4: Mostrar el resumen completo en la consola
    console.log(`=== RESUMEN DE LIQUIDACIÓN ===`);
    console.log(`Trabajador: ${nombre}`);
    console.log(`Sueldo Base: $${sueldoBase}`);
    console.log(`Total Bonificaciones: $${totalBonificaciones}`);
    console.log(`Sueldo Bruto: $${sueldoBruto}`);
    console.log(`Descuentos (13%): $${sueldoBruto * 0.13}`);
    console.log(`------------------------------`);
    console.log(`SUELDO NETO A PAGAR: $${Math.round(sueldoNeto)}`); // Math.round para redondear los decimales
    console.log(`==============================\n`);
}

// Prueba 1: Un trabajador con 3 bonos diferentes
calcularSueldoNeto("Juan", 500000, 20000, 15000, 40000);

// Prueba 2: Un trabajador con solo 1 bono
calcularSueldoNeto("María", 600000, 50000);

// Prueba 3: Un trabajador sin ningún bono (el reduce partirá de 0)
calcularSueldoNeto("Pedro", 450000);