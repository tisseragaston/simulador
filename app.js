// Variables

let principalLomo = document.querySelector ("#lomoRadio")
let agregadoInput = document.querySelector ("#agregadoInput")
let totalCarrito = document.querySelector (".totalPedido")
let resumen = document.querySelector (".resumen")
let botonSumar = document.querySelector(".botonSumar")
let telefonoInput = document.querySelector("#telefonoInput")
let nombreInput = document.querySelector("#nombreInput")
let mensajeContacto = document.querySelector (".mensajeContacto")
let formulario = document.querySelector (".formContacto")
let botonBorrar = document.querySelector (".botonBorrar")
let botonUltimo = document.querySelector (".botonUltimo")
let catalogo = document.querySelector (".catalogo") 

// Arrays
let listaAgregados = []
let carrito = []
let plato1 = 0
let plato2 = 0

const container = document.querySelector (".container")
const producto = document.querySelector (".card-body")
const titulo = document.querySelector (".card-title")
const precio = document.querySelector (".card-text")

try {fetch("https://tisseragaston.github.io/simulador/data.json")
        .then((resp)=> resp.json())
        .then ((datos) => {
        let contador = 0
        while (datos.length > contador) {
            let container = document.createElement ('div')
            let producto = document.createElement ('div')
            let titulo = document.createElement ('h5')
            let precio = document.createElement ('p')
            let addCarr = document.createElement ('button')
            
            container.setAttribute ('class', 'card container text-center text-bg-dark m-3')
            container.setAttribute ('style','width: 12rem;')
            producto.setAttribute ('class', 'card-body')
            titulo.setAttribute ('class', 'card-title')
            precio.setAttribute ('class', 'card-text')
            addCarr.setAttribute ('class', 'btn btn-success btnAgregar')
            addCarr.setAttribute ('value', contador)

            titulo.innerHTML = datos[contador].nombre
            precio.innerHTML = "$" + datos[contador].precio
            addCarr.innerHTML = "Agregar"

            catalogo.appendChild (container)
            container.appendChild (producto)
            producto.appendChild (titulo)
            producto. appendChild (precio)
            producto.appendChild (addCarr) 
            
            addCarr.onclick = () => {
                    carrito.push (datos[addCarr.value]);
                    limpiarResumenHTML ();
                    insertarResumen ();
                    console.log(carrito);
                }

            contador++
        }

    })
    }  catch (e) {
        console.log(e)
    }
    

// Funciones

function limpiarResumenHTML () {
    resumen.innerHTML= "";
}
function limpiarTotalHTML () {
    totalCarrito.innerHTML= "";
}
function insertarResumen () {
    Toastify({
        text: "Producto Agregado",
        duration: 5000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    for (let c of carrito) {
        let contenedor = document.createElement("div")
        contenedor.innerHTML = `
        <div class="alert alert-info" role="alert">
        <h4> ${c.nombre}: $${c.precio} </h4>
        </div> `;
        resumen.appendChild (contenedor)
    }
}
function enviarJson () {
    const pedido = JSON.stringify(carrito)
    localStorage.setItem ("carrito", pedido)
    sessionStorage.setItem ("carrito", pedido)
    console.log(pedido)
}
function obtenerJson () {
    const pedido = JSON.parse(carrito)
}

//       Eventos

// Boton Borrar Elementos del Carrito
botonBorrar.onclick = () => {
    carrito.pop()
    limpiarResumenHTML ()
    Toastify({
        text: "Producto Eliminado",
        duration: 5000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #de1d2a, #d43f49)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    for (let c of carrito) {
        let contenedor = document.createElement("div")
        contenedor.innerHTML = `
        <div class="alert alert-info" role="alert">
        <h4> ${c.nombre}: $${c.precio} </h4>
        </div> `;
        resumen.appendChild (contenedor)
    }}


// Boton Enviar Contacto

agregadoInput.addEventListener("input", function () {

})
telefonoInput.addEventListener("input", function () {

})
nombreInput.addEventListener("input", function () {
    
})

const mostrarInfo = formulario.addEventListener ("submit", function (e) {
    if (carrito.length == 0) {
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'No hay productos confirmados',
            text: 'Debe confirmar productos antes de enviar el contacto',
          })
    }   else {
    e.preventDefault();
    mensajeContacto.innerHTML= `
    <div class="alert alert-info" role="alert">
    <h4> ${nombreInput.value} muchas gracias por su compra! </h4>
  </div> `
    Swal.fire({
    icon: 'success',
    title: `${nombreInput.value} muchas gracias por su compra!`,
    text: `Le vamos a llamar al numero ${telefonoInput.value} para coordinar el envío de su pedido`,
  })}
})  
// Boton Confirmar
botonSumar.onclick = () => {
    if (carrito.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'No hay productos agregados',
            text: 'Debe seleccionar productos para confirmar',
          })
     } else {
            limpiarTotalHTML ();
            enviarJson ();
            console.log(carrito);
    Toastify({
        text: "Pedido Confirmado",
        duration: 5000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #04A5EB, #2BB5F1)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    let totalCarritos = carrito.reduce ((acumm, producto)=> acumm + producto.precio, 0 )
    let totalPedido = document.createElement ("div")
    totalPedido.innerHTML = `
    <div class="alert alert-success total">
    <h2> Su total es: $${totalCarritos}</h2><br>
    <h3>Su pedido es el Numero ${parseInt(Math.random()*10000)}</h3>
    <br>
    <h4> Agregados: ${agregadoInput.value} </h4>
    <br>
    <h4> Por favor ingrese sus datos para poder comunicarnos con usted.</h4>
    </div>
    `
    totalCarrito.appendChild(totalPedido)
    Swal.fire({
        icon: 'success',
        title: 'Gracias por tu pedido',
        text: 'Ahora ingrese sus datos',
      })
      }
}

// Boton Cargar Ultimo Pedido
botonUltimo.onclick = () => {
    limpiarTotalHTML ();
    let recarrito = JSON.parse (localStorage.getItem("carrito"))
    for (let c of recarrito) {
        let contenedor = document.createElement("div")
        contenedor.innerHTML = `
        <div class="alert alert-info" role="alert">
        <h4> ${c.nombre}: $${c.precio} </h4>
        </div> `;
        resumen.appendChild (contenedor)
    }
    recarrito.forEach (element => carrito.push(element))
}



    
