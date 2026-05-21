let jugadores =
JSON.parse(
localStorage.getItem(
"jugadores"
)
)||[];

let estados =
JSON.parse(
localStorage.getItem(
"estados"
)
)||{};

function guardarDatos(){

localStorage.setItem(
"jugadores",
JSON.stringify(
jugadores)
);

localStorage.setItem(
"estados",
JSON.stringify(
estados)
);

}

function cambiar(
numero,
estado
){

estados[numero]=estado;

guardarDatos();

render();

}

function eliminar(numero){

if(
confirm(
"¿Eliminar figurita?"
)
){

jugadores=
jugadores.filter(
j=>j.numero!==numero
);

delete estados[numero];

guardarDatos();

render();

}

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
!j.nombre.toLowerCase().includes(texto)
&&
!j.numero.toLowerCase().includes(texto)
){
return;
}

let estado=
estados[j.numero];

let textoEstado="";
let claseEstado="";
let claseCaja="";

if(estado==="tengo"){

textoEstado="TENGO";
claseEstado="estado-tengo";
claseCaja="completado";

completas++;

}

if(estado==="falta"){

textoEstado="NO TENGO";
claseEstado="estado-falta";
claseCaja="sinCompletar";

}

let div=
document.createElement(
"div"
);

div.className=
`jugador ${claseCaja}`;

div.innerHTML=`

<div>
<b>${j.numero}</b>
<br>
${j.nombre}
</div>

<div>

<span class="estado ${claseEstado}">
${textoEstado}
</span>

<div class="botones">

<button class="tengo">
✅
</button>

<button class="falta">
❌
</button>

</div>

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

let tiempo;

div.addEventListener(
"touchstart",
()=>{

tiempo=
setTimeout(
()=>{
eliminar(
j.numero
)
},
1000
);

}
);

div.addEventListener(
"touchend",
()=>{

clearTimeout(
tiempo
);

}
);

div.addEventListener(
"mousedown",
()=>{

tiempo=
setTimeout(
()=>{
eliminar(
j.numero
)
},
1000
);

}
);

div.addEventListener(
"mouseup",
()=>{

clearTimeout(
tiempo
);

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
document.getElementById(
"numero"
)
.value.trim();

let nombre=
document.getElementById(
"nombre"
)
.value.trim();

if(
!numero||
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