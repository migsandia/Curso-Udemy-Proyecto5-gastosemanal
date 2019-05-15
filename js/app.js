// Variables
const presupuestoUsuario = prompt('Cual es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto')
let cantidadPresupuesto;



// Clases
class Presupuesto {
  constructor(presupuesto){
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto)
  }
  // metodo para ir restando del presupuesto actual
  presupuestoRestante(cantidad = 0){
    return this.restante -= Number(cantidad);
  }
}

class Interfaz {
  
  insertarPresupuesto(cantidad){
    const presupuestoSpan = document.querySelector('span#total');
    const restanteSpan = document.querySelector('span#restante');
    // insertar al html
    presupuestoSpan.innerHTML = `${cantidad}`;
    restanteSpan.innerHTML = `${cantidad}`;
  }

  imprimirMensaje(mensaje, tipo) {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert');
    if(tipo === 'error'){
      divMensaje.classList.add('alert-danger');
    } else {
      divMensaje.classList.add('alert-success');
    }
    divMensaje.appendChild(document.createTextNode(mensaje));
    // insertar en el DOM
    document.querySelector('.primario').insertBefore(divMensaje, formulario);

    // quitar el mensaje despúes de 3 segundos
    setTimeout(() => {
      document.querySelector('.primario .alert').remove();
      formulario.reset();
    }, 3000);
  }
  // inserta los gastos a la lista
  agregarGastoListado(nombre, cantidad) {
    const gastosListado = document.querySelector('#gastos ul');

    // crear li
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    // insertar gasto
    li.innerHTML = `
      ${nombre}
      <span class="badge badge-primary badge-pill">$ ${cantidad} </span>
      
    `;

    // insertar al HTML
    gastosListado.appendChild(li);

  }

  // comprueba el presupuesto restante
  presupuestoRestante(cantidad) {
    const restante = document.querySelector('span#restante');
    // leemos el presupuesto restante
    const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
    restante.innerHTML = `
      ${presupuestoRestanteUsuario}
    `
    this.comprobarPresupuesto();
  }

  comprobarPresupuesto() {
    const presupuestoTotal = cantidadPresupuesto.presupuesto;
    const presupuestoRestante = cantidadPresupuesto.restante;

    // comprobar el 25%
    if(presupuestoTotal / 4 > presupuestoRestante){
      const restante = document.querySelector('.restante');
      restante.classList.remove('alert-succes', 'alert-warning');
      restante.classList.add('alert-danger');
    } else if(presupuestoTotal / 2 > presupuestoRestante) {
      const restante = document.querySelector('.restante');
      restante.classList.remove('alert-succes');
      restante.classList.add('alert-warning');
    }
  }
}



// Event Listeners

document.addEventListener('DOMContentLoaded', function() {
  if(presupuestoUsuario === null || presupuestoUsuario === ''){
    window.location.reload();
  } else {
    // Instanciar presupuesto
 cantidadPresupuesto =  new Presupuesto(presupuestoUsuario);
 // instanciar la calse de interfaz
 const ui = new Interfaz();
 ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
  }
}
);
formulario.addEventListener('submit', function(e) {
  e.preventDefault();
  const nombreGasto = document.getElementById('gasto').value;
  const cantidadGasto = document.getElementById('cantidad').value;
  
  // instanciar la interfaz

  const ui = new Interfaz();

  // Comprobar que los campos no esten vacios
  if(nombreGasto === '' || cantidadGasto === ''){
    // toma dos valores, mensaje y tipo
    ui.imprimirMensaje('Hubo un error', 'error');
  } else {
    // insertar en el HTML
    ui.imprimirMensaje('Correcto', 'correcto');
    ui.agregarGastoListado(nombreGasto, cantidadGasto);
    ui.presupuestoRestante(cantidadGasto);
  }

})
