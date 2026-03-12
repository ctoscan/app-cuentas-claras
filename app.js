// ================================
// APP CUENTAS CLARAS
// ================================


// ELEMENTOS DEL HTML

const montoInput = document.getElementById("monto");

montoInput.addEventListener("input", () => {

let valor = montoInput.value.replace(/\./g, "").replace(/\D/g, "");

if(valor === ""){
montoInput.value = "";
return;
}

montoInput.value = formatearNumero(parseInt(valor));

});

const categoriaSelect = document.getElementById("categoria");
const botonGuardar = document.getElementById("guardar");
const listaGastos = document.getElementById("lista-gastos");
const totalElemento = document.getElementById("total");

// ================================
// FORMATEAR NUMEROS (SEPARADOR DE MILES)
// ================================

function formatearNumero(numero){

return numero.toLocaleString("es-AR", {
minimumFractionDigits: 0,
maximumFractionDigits: 0
});

}

// ================================
// CARGAR GASTOS GUARDADOS
// ================================

let gastos = JSON.parse(localStorage.getItem("gastos")) || [];


// ================================
// GUARDAR GASTO
// ================================

botonGuardar.addEventListener("click", () => {

const monto = parseInt(montoInput.value.replace(/\./g, ""));
const categoria = categoriaSelect.value;

if (!monto || !categoria) {

alert("Completa monto y categoría");
return;

}

const gasto = {

fecha: new Date().toLocaleDateString(),
categoria: categoria,
monto: monto

};

gastos.push(gasto);

localStorage.setItem("gastos", JSON.stringify(gastos));

montoInput.value = "";
categoriaSelect.value = "";

mostrarGastos();
calcularTotal();
actualizarGrafico();

});


// ================================
// MOSTRAR GASTOS
// ================================

function mostrarGastos() {

listaGastos.innerHTML = "";

// recorrer desde el último al primero
for (let i = gastos.length - 1; i >= 0; i--) {

const gasto = gastos[i];

const li = document.createElement("li");

li.innerHTML = `
<span>${gasto.fecha}</span>
<span>${gasto.categoria}</span>
<span>$${formatearNumero(gasto.monto)}</span>

<div class="acciones">

<button class="editar">
<i class="fa-solid fa-pen"></i>
</button>

<button class="eliminar">
<i class="fa-solid fa-trash"></i>
</button>

</div>
`;

const botonEliminar = li.querySelector(".eliminar");

botonEliminar.addEventListener("click", () => {

gastos.splice(i, 1);

localStorage.setItem("gastos", JSON.stringify(gastos));

mostrarGastos();
calcularTotal();
actualizarGrafico();

});

const botonEditar = li.querySelector(".editar");

botonEditar.addEventListener("click", () => {

montoInput.value = gasto.monto;
categoriaSelect.value = gasto.categoria;

gastos.splice(i,1);

localStorage.setItem("gastos", JSON.stringify(gastos));

mostrarGastos();
calcularTotal();
actualizarGrafico();

});

listaGastos.appendChild(li);

}

}

// ================================
// CALCULAR TOTAL
// ================================

function calcularTotal() {

let total = 0;

gastos.forEach(gasto => {

total += gasto.monto;

});

totalElemento.textContent = "$" + formatearNumero(total);

}


// ================================
// GRAFICO DE GASTOS
// ================================

let grafico;

function actualizarGrafico() {

const categorias = {};

gastos.forEach(gasto => {

if (!categorias[gasto.categoria]) {
categorias[gasto.categoria] = 0;
}

categorias[gasto.categoria] += gasto.monto;

});

const labels = Object.keys(categorias);
const data = Object.values(categorias);

const ctx = document.getElementById("graficoGastos");

if (grafico) {
grafico.destroy();
}

grafico = new Chart(ctx, {

type: "pie",

data: {

labels: labels,

datasets: [{
data: data
}]

}

});

}

// ================================
// INICIAR APP
// ================================

mostrarGastos();
calcularTotal();
actualizarGrafico();

// ================================
// INSTALAR APP (PWA)
// ================================

let deferredPrompt;

const botonInstalar = document.getElementById("instalarApp");

window.addEventListener("beforeinstallprompt", (e) => {

e.preventDefault();

deferredPrompt = e;

botonInstalar.style.display = "block";

});

botonInstalar.addEventListener("click", async () => {

if (!deferredPrompt) return;

deferredPrompt.prompt();

const { outcome } = await deferredPrompt.userChoice;

if (outcome === "accepted") {

console.log("App instalada");

}

deferredPrompt = null;

botonInstalar.style.display = "none";

});

// ================================
// EXPORTAR A EXCEL
// ================================

const botonExportar = document.getElementById("exportarExcel");

botonExportar.addEventListener("click", exportarExcel);

function exportarExcel(){

if(gastos.length === 0){

alert("No hay gastos para exportar");
return;

}

let csv = "Fecha,Categoria,Monto\n";

gastos.forEach(gasto => {

csv += `${gasto.fecha},${gasto.categoria},${gasto.monto}\n`;

});

// agregar total al final

let total = gastos.reduce((acc,g)=> acc + g.monto,0);

csv += `\nTotal del mes,,${total}`;

const blob = new Blob([csv], {type:"text/csv;charset=utf-8;"});

const link = document.createElement("a");

link.href = URL.createObjectURL(blob);

const hoy = new Date();

const anio = hoy.getFullYear();
const mes = String(hoy.getMonth() + 1).padStart(2,"0");

link.download = `gastos_cuentas_claras_${anio}-${mes}.csv`;

link.click();

}

// ================================
// MOSTRAR HORA Y FECHA ACTUAL
// ================================

function actualizarFechaHora(){

const ahora = new Date();

const hora = ahora.toLocaleTimeString("es-AR", {
hour: "2-digit",
minute: "2-digit"
});

const fecha = ahora.toLocaleDateString("es-AR", {
weekday: "long",
year: "numeric",
month: "long",
day: "numeric"
});

document.getElementById("hora-actual").textContent = hora;
document.getElementById("fecha-actual").textContent = fecha;

}

// actualizar cada segundo
setInterval(actualizarFechaHora,1000);

// ejecutar al cargar
actualizarFechaHora();
