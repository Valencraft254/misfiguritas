let jugadores =
JSON.parse(
localStorage.getItem("jugadores")
) || [];

let estados =
JSON.parse(
localStorage.getItem("estados")
) || {};

function guardarDatos(){

localStorage.setItem(
"jugadores",
JSON.stringify(jugadores)
);

localStorage.setItem(
"estados",
JSON.stringify(estados)
);

}

function cambiar(numero,estado){

estados[numero]=estado;

guardarDatos();

render();

}

function render(){

const lista=
document.getElementById(
"lista"
);

lista.innerHTML="";

const texto=
document.getElementById(
"buscar"
)
.value
.toLowerCase();

let completas=0;

jugadores.forEach(j=>{

if(

!j.nombre
.toLowerCase()
.includes(texto)

&&

!j.numero
.toLowerCase()
.includes(texto)

){

return;

}

let estado=
estados[j.numero];

if(
estado==="tengo"
){

completas++;

}

let div=
document.createElement(
"div"
);

div.className=
"jugador";

if(
estado==="tengo"
){

div.classList.add(
"completado"
);

}

div.innerHTML=`

<div>
<b>${j.numero}</b>
<br>
${j.nombre}
</div>

<div class="botones">
<button class="tengo">
✅
</button>

<button class="falta">
❌
</button>
</div>

`;

const botones=
div.querySelectorAll(
"button"
);

botones[0]
.addEventListener(
"click",
()=>{
cambiar(
j.numero,
"tengo"
)
}
);

botones[1]
.addEventListener(
"click",
()=>{
cambiar(
j.numero,
"falta"
)
}
);

lista.appendChild(
div
);

});

document.getElementById(
"completadas"
).innerText=
completas;

document.getElementById(
"total"
).innerText=
jugadores.length;

}

document
.getElementById(
"agregarBtn"
)
.onclick=()=>{

let numero=
document
.getElementById(
"numero"
)
.value
.trim();

let nombre=
document
.getElementById(
"nombre"
)
.value
.trim();

if(
!numero ||
!nombre
)return;

jugadores.push({

numero,
nombre

});

guardarDatos();

document.getElementById(
"numero"
).value="";

document.getElementById(
"nombre"
).value="";

render();

};

document
.getElementById(
"buscar"
)
.addEventListener(
"input",
render
);

render();