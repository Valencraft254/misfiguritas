let jugadores =
JSON.parse(localStorage.getItem("jugadores")) || [];

let estados =
JSON.parse(localStorage.getItem("estados")) || {};

function guardar(){
localStorage.setItem("jugadores", JSON.stringify(jugadores));
localStorage.setItem("estados", JSON.stringify(estados));
}

function cambiar(numero,estado){
estados[numero]=estado;
guardar();
render();
}

function eliminar(numero){
if(confirm("¿Eliminar figurita?")){
jugadores = jugadores.filter(j => j.numero !== numero);
delete estados[numero];
guardar();
render();
}
}

function render(){

let lista = document.getElementById("lista");
lista.innerHTML="";

let texto = document.getElementById("buscar").value.toLowerCase();

let completas=0;

jugadores.forEach(j=>{

if(!j.nombre.toLowerCase().includes(texto) &&
   !j.numero.toLowerCase().includes(texto) &&
   !j.pais.toLowerCase().includes(texto)){
return;
}

let estado = estados[j.numero];

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

let div=document.createElement("div");
div.className="jugador "+claseCaja;

div.innerHTML=`

<div>
<b>${j.numero}</b><br>
${j.nombre}<br>
🌎 ${j.pais}
</div>

<div>

<span class="estado ${claseEstado}">
${textoEstado}
</span>

<div class="botones">
<button class="tengo">✅</button>
<button class="falta">❌</button>
</div>

</div>
`;

const btns = div.querySelectorAll("button");

btns[0].addEventListener("click",()=>cambiar(j.numero,"tengo"));
btns[1].addEventListener("click",()=>cambiar(j.numero,"falta"));

let timer;

div.addEventListener("touchstart",()=>{
timer=setTimeout(()=>eliminar(j.numero),800);
});

div.addEventListener("touchend",()=>clearTimeout(timer));

div.addEventListener("mousedown",()=>{
timer=setTimeout(()=>eliminar(j.numero),800);
});

div.addEventListener("mouseup",()=>clearTimeout(timer));

lista.appendChild(div);

});

document.getElementById("completadas").innerText=completas;
document.getElementById("total").innerText=jugadores.length;

}

document.getElementById("agregarBtn").onclick=()=>{

let pais=document.getElementById("pais").value;
let numero=document.getElementById("numero").value.trim();
let nombre=document.getElementById("nombre").value.trim();

if(!pais || !numero || !nombre) return;

jugadores.push({pais,numero,nombre});

guardar();

document.getElementById("pais").value="";
document.getElementById("numero").value="";
document.getElementById("nombre").value="";

render();
};

document.getElementById("buscar").addEventListener("input",render);

render();