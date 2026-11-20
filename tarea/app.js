console.log("tarea/app.js cargado");

class Tarea {
  constructor(titulo, prioridad) {
    this.titulo = titulo;
    this.prioridad = prioridad;
    this.completada = false;
  }

  alternarEstado() {
    this.completada = !this.completada;
  }

  descripcion() {
    const estado = this.completada ? "[Completada]" : "[Pendiente]";//Condicional
    return estado + " " + this.titulo + " - Prioridad: " + this.prioridad;
  }
}

const formTarea = document.querySelector("#formTarea");
const inputTitulo = document.querySelector("#inputTitulo");
const selectPrioridad = document.querySelector("#selectPrioridad");
const vistaPrevia = document.querySelector("#vistaPrevia");
const mensajeEstado = document.querySelector("#mensajeEstado");
const listaTareas = document.querySelector("#listaTareas");
const totalTareas = document.querySelector("#totalTareas");
const btnLimpiarCompletadas = document.querySelector("#btnLimpiarCompletadas");

const tareas = [
  new Tarea("Repasar DOM y eventos", "Alta"),
  new Tarea("Subir cambios a GitHub", "Media")
];

function actualizarContador() {
  totalTareas.textContent = tareas.length;
}

function agregarElementoDOM(tarea) {
  const li = document.createElement("li");

  const spanTexto = document.createElement("span");
  spanTexto.textContent = tarea.descripcion();

  const btnCompletar = document.createElement("button");
  btnCompletar.textContent = "Completar";
  btnCompletar.addEventListener("click", () => {
    tarea.alternarEstado();
    spanTexto.textContent = tarea.descripcion();
    spanTexto.classList.toggle("completada");
    btnCompletar.textContent = tarea.completada ? "Desmarcar" : "Completar";
  });

  const btnBorrar = document.createElement("button");
  btnBorrar.textContent = "Borrar";
  btnBorrar.addEventListener("click", () => {
    const indice = tareas.indexOf(tarea);
    if (indice !== -1) {
      tareas.splice(indice, 1);
    }
    li.remove();
    actualizarContador();
  });

  li.appendChild(spanTexto);
  li.appendChild(btnCompletar);
  li.appendChild(btnBorrar);
  listaTareas.appendChild(li);
}

tareas.forEach((t) => {
  agregarElementoDOM(t);
});
actualizarContador();

inputTitulo.addEventListener("input", () => {
  const texto = inputTitulo.value.trim();
  vistaPrevia.textContent = texto ? "Vista previa: " + texto : "Vista previa: ...";
});

formTarea.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const titulo = inputTitulo.value.trim();
  const prioridad = selectPrioridad.value;

  if (titulo === "") {
    mensajeEstado.textContent = "Error: debes escribir el nombre de la tarea.";
    mensajeEstado.classList.add("error");
    return;
  }

  const nuevaTarea = new Tarea(titulo, prioridad);
  tareas.push(nuevaTarea);
  agregarElementoDOM(nuevaTarea);
  actualizarContador();

  mensajeEstado.textContent = "Tarea agregada: " + nuevaTarea.titulo;
  mensajeEstado.classList.remove("error");
  inputTitulo.value = "";
  vistaPrevia.textContent = "Vista previa: ...";
});

btnLimpiarCompletadas.addEventListener("click", () => {
  for (let i = tareas.length - 1; i >= 0; i--) {
    if (tareas[i].completada) {
      tareas.splice(i, 1);
    }
  }
  listaTareas.innerHTML = "";
  tareas.forEach((t) => {
    agregarElementoDOM(t);
  });
  actualizarContador();
});