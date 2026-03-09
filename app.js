// =============================
// CARGAR GASTOS DESDE STORAGE
// =============================

let gastos = JSON.parse(localStorage.getItem("gastos")) || [];


// =============================
// ELEMENTOS DEL DOM
// =============================

const montoInput = document.getElementById("monto");
const categoriaInput = document.getElementById("categoria");
const botonGuardar = document.getElementById("guardar");

const lista = document.getElementById("lista-gastos");
const totalElemento = document.getElementById("total");


// =============================
// EVENTO GUARDAR GASTO
// =============================

botonGuardar.addEventListener("click", agregarGasto);


function agregarGasto(){

const monto = parseFloat(montoInput.value);
const categoria = categoriaInput.value;

if(!monto || !categoria){

alert("Completar monto y categoría");
return;

}

const gasto = {

monto,
categoria

};

gastos.push(gasto);

guardarDatos();
actualizarUI();

montoInput.value="";
categoriaInput.value="";

}


// =============================
// GUARDAR EN LOCAL STORAGE
// =============================

function guardarDatos(){

localStorage.setItem("gastos", JSON.stringify(gastos));

}


// =============================
// ACTUALIZAR INTERFAZ
// =============================

function actualizarUI(){

lista.innerHTML="";

let total = 0;

gastos.forEach(gasto => {

total += gasto.monto;

const li = document.createElement("li");

li.textContent = `${gasto.categoria} - $${gasto.monto}`;

lista.appendChild(li);

});

totalElemento.textContent = "$" + total;

actualizarGrafico();

}


// =============================
// GRÁFICO
// =============================

let grafico;

function actualizarGrafico(){

const categorias = {};

gastos.forEach(g => {

if(!categorias[g.categoria]){

categorias[g.categoria]=0;

}

categorias[g.categoria]+=g.monto;

});

const labels = Object.keys(categorias);
const data = Object.values(categorias);

const ctx = document.getElementById("graficoGastos");

if(grafico){

grafico.destroy();

}

grafico = new Chart(ctx,{

type:'pie',

data:{
labels:labels,
datasets:[{
data:data
}]
}

});

}


// =============================
// INICIALIZAR UI
// =============================

actualizarUI();
