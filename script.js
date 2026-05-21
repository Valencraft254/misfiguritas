let jugadores=JSON.parse(
localStorage.getItem(
"jugadores"
)
)||[];

let estados=JSON.parse(
localStorage.getItem(
"estados"
)
)
||{};

function guardarDatos(){

localStorage.setItem(
"jugadores",
JSON.stringify(
jugadores
)
);

localStorage.setItem(
"estados",
JSON.stringify(
estados
)
);

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

jugadores.forEach(
j=>{

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
estados[
j.numero
];

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

<button
class="tengo"
onclick="cambiar('${j.numero}','tengo')"
>

✅

</button>

<button
class="falta"
onclick="cambiar('${j.numero}','falta')"
>

❌

</button>

</div>

`;

lista.appendChild(
div
);

}
);

document.getElementById(
"completadas"
).innerText=
completas;

document.getElementById(
"total"
).innerText=
jugadores.length;

}

function cambiar(
numero,
estado
){

estados[
numero
]=estado;

guardarDatos();

render();

}

document
.getElementById(
"agregarBtn"
)
.onclick=()=>{

let numero=
prompt(
"Número:"
);

if(!numero)return;

let nombre=
prompt(
"Nombre:"
);

if(!nombre)return;

jugadores.push({

numero,
nombre

});

guardarDatos();

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