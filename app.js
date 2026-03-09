/* =====================================================
APP PRINCIPAL
Gestiona ingresos y gastos
===================================================== */


/* =====================================================
LOCAL STORAGE
===================================================== */

function obtenerMovimientos(){

const data = localStorage.getItem("movimientos")

if(!data) return []

return JSON.parse(data)

}


function guardarMovimientos(movimientos){

localStorage.setItem("movimientos", JSON.stringify(movimientos))

}


/* =====================================================
AGREGAR MOVIMIENTO
===================================================== */

function agregarMovimiento(tipo,monto,fecha){

const movimientos = obtenerMovimientos()

movimientos.push({

tipo,
monto,
fecha

})

guardarMovimientos(movimientos)

mostrarMovimientos()

location.reload()

}


/* =====================================================
MOSTRAR MOVIMIENTOS
===================================================== */

function mostrarMovimientos(){

const lista = document.getElementById("listaMovimientos")

lista.innerHTML=""

const movimientos = obtenerMovimientos()

movimientos.forEach((mov,i)=>{

const li = document.createElement("li")

li.innerHTML=`
${mov.tipo} - $${mov.monto} - ${mov.fecha}
<button onclick="eliminarMovimiento(${i})">Eliminar</button>
`

lista.appendChild(li)

})

}


/* =====================================================
ELIMINAR MOVIMIENTO
===================================================== */

function eliminarMovimiento(index){

const movimientos = obtenerMovimientos()

movimientos.splice(index,1)

guardarMovimientos(movimientos)

mostrarMovimientos()

location.reload()

}


/* =====================================================
FORMULARIO
===================================================== */

document.getElementById("formMovimiento").addEventListener("submit",function(e){

e.preventDefault()

const tipo = document.getElementById("tipo").value
const monto = document.getElementById("monto").value
const fecha = document.getElementById("fecha").value

agregarMovimiento(tipo,monto,fecha)

})


/* =====================================================
INICIALIZAR APP
===================================================== */

document.addEventListener("DOMContentLoaded",mostrarMovimientos)
