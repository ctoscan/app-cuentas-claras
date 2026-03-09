/* =====================================================
   charts.js
   -----------------------------------------------------
   Maneja todos los gráficos de la aplicación usando
   Chart.js.

   Funciones:
   - Cargar datos desde localStorage
   - Calcular ingresos y gastos
   - Mostrar gráfico de resumen
   - Mostrar gráfico mensual
===================================================== */


/* =====================================================
   Obtener datos guardados
===================================================== */

function obtenerMovimientos() {
    const data = localStorage.getItem("movimientos");

    if (!data) {
        return [];
    }

    return JSON.parse(data);
}


/* =====================================================
   Calcular totales
===================================================== */

function calcularTotales(movimientos) {

    let ingresos = 0;
    let gastos = 0;

    movimientos.forEach(mov => {

        const monto = parseFloat(mov.monto);

        if (mov.tipo === "ingreso") {
            ingresos += monto;
        }

        if (mov.tipo === "gasto") {
            gastos += monto;
        }

    });

    return { ingresos, gastos };
}


/* =====================================================
   Crear gráfico de ingresos vs gastos
===================================================== */

function crearGraficoResumen() {

    const movimientos = obtenerMovimientos();
    const totales = calcularTotales(movimientos);

    const canvas = document.getElementById("graficoResumen");

    if (!canvas) return;

    new Chart(canvas, {

        type: "pie",

        data: {

            labels: [
                "Ingresos",
                "Gastos"
            ],

            datasets: [
                {
                    data: [
                        totales.ingresos,
                        totales.gastos
                    ],

                    backgroundColor: [
                        "#2ecc71",
                        "#e74c3c"
                    ]
                }
            ]
        },

        options: {

            responsive: true,

            plugins: {
                legend: {
                    position: "bottom"
                }
            }

        }

    });

}


/* =====================================================
   Crear gráfico mensual
===================================================== */

function crearGraficoMensual() {

    const movimientos = obtenerMovimientos();

    const meses = [
        "Ene","Feb","Mar","Abr","May","Jun",
        "Jul","Ago","Sep","Oct","Nov","Dic"
    ];

    const datosIngresos = new Array(12).fill(0);
    const datosGastos = new Array(12).fill(0);


    movimientos.forEach(mov => {

        const fecha = new Date(mov.fecha);
        const mes = fecha.getMonth();
        const monto = parseFloat(mov.monto);

        if (mov.tipo === "ingreso") {
            datosIngresos[mes] += monto;
        }

        if (mov.tipo === "gasto") {
            datosGastos[mes] += monto;
        }

    });


    const canvas = document.getElementById("graficoMensual");

    if (!canvas) return;


    new Chart(canvas, {

        type: "bar",

        data: {

            labels: meses,

            datasets: [

                {
                    label: "Ingresos",
                    data: datosIngresos
                },

                {
                    label: "Gastos",
                    data: datosGastos
                }

            ]

        },

        options: {

            responsive: true,

            scales: {
                y: {
                    beginAtZero: true
                }
            }

        }

    });

}


/* =====================================================
   Inicializar gráficos
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    crearGraficoResumen();
    crearGraficoMensual();

});
