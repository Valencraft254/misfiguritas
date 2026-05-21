let jugadores=
JSON.parse(
localStorage.getItem(
"jugadores"
)
)||[];

let estados=
JSON.parse(
localStorage.getItem(
"estados"
)
)||{};

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

let texto=
document
.getElementById(
"buscar"
)
.value
.toLowerCase();

let completas=0;

jugadores.forEach(j=>{

if(

!j.nombre.toLowerCase()
.includes(texto)

&&

!j.numero.toLowerCase()
.includes(texto)

){

return;

}

if(
estados[
j.numero
]==="tengo"
){

completas++;

}

lista.innerHTML+=`

<div class="jugador">

<div>

<b>${j.numero}</b>

<br>

${j.nombre}

</div>

<div class="botones">

<button
class="tengo"
onclick="cambiar('${j.numero}','tengo')">

✅

</button>

<button
class="falta"
onclick="cambiar('${j.numero}','falta')">

❌

</button>

</div>

</div>

`;

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

function cambiar(
numero,
estado
){

estados[numero]=estado;

guardarDatos();

render();

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
.value;

let nombre=
document
.getElementById(
"nombre"
)
.value;

if(
!numero||
!nombre
)return;

jugadores.push({

numero:numero,
nombre:nombre

});

guardarDatos();

document
.getElementById(
"numero"
)
.value="";

document
.getElementById(
"nombre"
)
.value="";

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