# Tarea: Mi componente interactivo
 
## Componente elegido
Gestor interactivo de tareas pendientes (`Lista de Tareas`), que permite registrar nuevas tareas con nivel de prioridad, previsualizar el texto mientras se escribe, marcar o desmarcar tareas como completadas y eliminarlas de forma individual o por lote.
 
## Codigo principal
```js
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
    const estado = this.completada ? "[Completada]" : "[Pendiente]";
    return estado + " " + this.titulo + " - Prioridad: " + this.prioridad;
  }
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

inputTitulo.addEventListener("input", () => {
  const texto = inputTitulo.value.trim();
  vistaPrevia.textContent = texto ? "Vista previa: " + texto : "Vista previa: ...";
});

formTarea.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const titulo = inputTitulo.value.trim();
  if (titulo === "") {
    mensajeEstado.textContent = "Error: debes escribir el nombre de la tarea.";
    mensajeEstado.classList.add("error");
    return;
  }
  const nuevaTarea = new Tarea(titulo, selectPrioridad.value);
  tareas.push(nuevaTarea);
  agregarElementoDOM(nuevaTarea);
  actualizarContador();
  inputTitulo.value = "";
  vistaPrevia.textContent = "Vista previa: ...";
});
```
## Pruebas realizadas
| Accion | Resultado esperado | Cumple (Si/No) |
|--------|--------------------|----------------|
|Escribir|Vista previa al escribir|Si|
|Insertar tarea|Validar y agregar una tarea nueva|Si|
|Click|Eliminar tareas completadas|Si|
 
## Por que disene asi mi clase
Elegi sollo 3 atributos (titulo, prioridad y completada) ya que representan los datos mínimos necesaiors para una validación y lo que se debe hacer.
Implemente el metodo "alternarEstado()" para encapsular la validacion de si estaba o no completada un objeto, y "descripcion()" para formatear en un solo texto el estado, el nombre y la prioridad antes de mostrarlo al DOOM.