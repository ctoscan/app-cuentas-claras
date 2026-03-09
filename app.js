// ================================
// APP CUENTAS CLARAS
// ================================


// ELEMENTOS DEL HTML

const montoInput = document.getElementById("monto");
const categoriaSelect = document.getElementById("categoria");
const botonGuardar = document.getElementById("guardar");

const listaGastos = document.getElementById("lista-gastos");
const totalElemento = document.getElementById("total");


// ================================
// CARGAR GASTOS GUARDADOS
// ================================

let gastos = JSON.parse(localStorage.getItem("gastos")) || [];


// ================================
// GUARDAR GASTO
// ================================

botonGuardar.addEventListener("click", () => {

const monto = parseFloat(montoInput.value);
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

gastos.forEach(gasto => {

const li = document.createElement("li");

li.innerHTML = `
<span>${gasto.categoria}</span>
<span>$${gasto.monto}</span>
`;

listaGastos.appendChild(li);

});

}


// ================================
// CALCULAR TOTAL
// ================================

function calcularTotal() {

let total = 0;

gastos.forEach(gasto => {

total += gasto.monto;

});

totalElemento.textContent = "$" + total;

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
