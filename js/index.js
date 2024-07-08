const abrirMenu = document.getElementById("abrir-menu")
const cerrarMenu = document.getElementById("cerrar-menu")
const menu = document.getElementById("menu-ul")
const main = document.getElementById("cont-main")
const carritoSombra = document.getElementById("carrito-sombra")
const carritoDatos = document.getElementById("carrito-datos")
const abrirCarrito = document.getElementById("icono-abrir-carrito")
const cerrarCarrito = document.getElementById("cerrar-carrito")
let datosCarrito = []
abrirMenu.addEventListener("click", () => {
    menu.style.display = "flex"
}
)

cerrarMenu.addEventListener("click", () => {
    menu.style.display = "none"

})



addEventListener("resize", () => {
    if (Number(innerWidth) > 900) {
        menu.style.display = "flex"
    }
    /*else {
        menu.style.display = "none"
    }*/
});


function dirigirHTML(direccion){
    location.assign(direccion)
}

abrirCarrito.addEventListener("click", () => {
    carritoSombra.style.display = "flex"
})

cerrarCarrito.addEventListener("click", () => {
    carritoSombra.style.display = "none"
})




function recarga() {
    if(localStorage.getItem("datosCompra")){
        datosCarrito=JSON.parse(localStorage.getItem("datosCompra"))
        console.log(datosCarrito)
    }
    cargarCarrito()

}


function cambioCantidad(input) {
    if (input.value < 0) {
        input.style.backgroundColor = "red"
    }
    else {
        input.style.backgroundColor = "white"
    }
}



function estaEnCarrito(nombre, cantidad,precio) {
    for (let dato of datosCarrito) {
        if (dato.id == nombre) {
            dato.cantidad = cantidad
            localStorage.setItem("datosCompra",JSON.stringify(datosCarrito))
            document.getElementById("input-"+nombre).value=cantidad
            document.getElementById("total-"+nombre).innerText="$"+Number(cantidad)*Number(precio)
            return true
        }
    }
    false
}



/* <div class="color-articulo">
                        <label for="color-Broche.nombre">Ingrese su color:</label>
                        <select name="color-Broche.nombre" id="color-Broche.nombre">
                            <option value="" disabled selected>Ingrese su opcion</option>
                            <option value="">Rojo</option>
                            <option value="">Amarillo</option>
                            <option value="">Verde</option>
                        </select>
                    </div> */

/*<div class="contenedor-articulo">
                <img src="../img/imagen-fondo.png" alt="">
                <div class="contenido-articulo">
                    <h3>Broches</h3>
                    <p>Broche Grande</p>
                    <div class="cantidad-articulo">
                        <label for="cant">Cantidad:</label>
                        <input type="number">
                    </div>
                    <i class="fa-solid fa-cart-shopping"></i>
                </div>
            </div> */

//a=JSON.parse(localStorage.getItem("datosCompra"))





function cargarCarrito() {
    for (let datoCarrito of datosCarrito) {

        let datoCorrespondiente
        for (let tipoDato of datos) {
            for (let datoBase of tipoDato) {
                if (datoBase.nombre == datoCarrito.id) {
                    datoCorrespondiente = datoBase
                }
            }
        }

        agregarDatosCarrito(datoCorrespondiente.nombre, datoCorrespondiente.img, datoCorrespondiente.precio, datoCarrito.cantidad)
    }
}

/*<div class="carrito-articulo" id="codigo1">
                    <img src="../img/WhatsApp Image 2023-04-17 at 17.48.40 (5).jpeg" alt="">
                    
                        <div class="precio">
                            <p>Precio por unidad</p>
                            <p>5345$</p>
                        </div>
                    
                    <div class="articulo-cantidad">
                        <label for="">Cantidad</label>
                        <input type="number" min="1">
                    </div>
                    <div class="precio">
                        <p>Precio Total</p>
                        <p>324234234$</p>
                    </div>
                    <div class="cerrar-articulo" id="borrar-codigo1"><i class="fa-solid fa-xmark"></i></div>
                </div> */


function agregarDatosCarrito(nombre, imagen, precio, cantidad) {
    let divArtuculo = document.createElement("div")
    divArtuculo.classList.add("carrito-articulo")
    divArtuculo.id = nombre
    carritoDatos.appendChild(divArtuculo)


    let img = document.createElement("img")
    img.src = imagen
    divArtuculo.appendChild(img)

    let contenedorPreciosUnidad = document.createElement("div")
    contenedorPreciosUnidad.classList.add("precio")
    divArtuculo.appendChild(contenedorPreciosUnidad)

    let p1 = document.createElement("p")
    p1.innerText = "Precio por unidad"
    contenedorPreciosUnidad.appendChild(p1)

    let p2 = document.createElement("p")
    p2.innerText = "$" + precio
    contenedorPreciosUnidad.appendChild(p2)

    let contenedorCantidad = document.createElement("div")
    contenedorCantidad.classList.add("articulo-cantidad")
    divArtuculo.appendChild(contenedorCantidad)

    let label = document.createElement("label")
    label.innerText = "Cantidad"
    label.setAttribute("for", "input-" + nombre)
    contenedorCantidad.appendChild(label)

    let input = document.createElement("input")
    input.type = "number"
    input.min = "1"
    input.id = "input-" + nombre
    input.name = "input-" + nombre
    input.value = cantidad
    contenedorCantidad.appendChild(input)
    input.addEventListener("keyup", () => { cambioCantidad(input); modificacionInstantanea(input, precio, p4) })
    input.addEventListener("change", () => { cambioCantidad(input); modificacionInstantanea(input, precio, p4) })



    let contenedorPrecioTotal = document.createElement("div")
    contenedorPrecioTotal.classList.add("precio")
    divArtuculo.appendChild(contenedorPrecioTotal)

    let p3 = document.createElement("p")
    p3.innerText = "Precio Total"
    contenedorPrecioTotal.appendChild(p3)

    let p4 = document.createElement("p")
    p4.innerText = "$" + Number(precio) * Number(cantidad)
    p4.id="total-"+nombre
    contenedorPrecioTotal.appendChild(p4)



    let divBorrar = document.createElement("div")
    divBorrar.classList.add("cerrar-articulo")
    divBorrar.id = "borrar-" + nombre
    divArtuculo.appendChild(divBorrar)

    let i = document.createElement("i")
    i.classList.add("fa-solid", "fa-xmark")
    i.addEventListener("click", () => { eliminarArticulo(divArtuculo, nombre) })
    divBorrar.appendChild(i)


}

function eliminarArticulo(divArtuculo, nombre) {
    divArtuculo.remove()

    for (datoEliminar of datosCarrito) {
        if (datoEliminar.id == nombre) {
            console.log(nombre)
            datosCarrito = eliminarElemento(datosCarrito, datoEliminar)
            localStorage.setItem("datosCompra", datosCarrito)
            break
        }
    }


}



function eliminarElemento(array, elementoEliminar) {
    let nuevoArray = []
    for (let elemento of array) {
        if (elemento != elementoEliminar) {
            nuevoArray.push(elemento)
        }
    }
    return nuevoArray
}

function modificacionInstantanea(input, precioUnidad, precioTotal) {
    if (input.value >= 0) {
        precioTotal.innerText = "$" + Number(input.value) * Number(precioUnidad)
    }
}

/*<div class="carrito-articulo" id="codigo1">
                    <img src="../img/WhatsApp Image 2023-04-17 at 17.48.40 (5).jpeg" alt="">
                    
                        <div class="precio">
                            <p>Precio por unidad</p>
                            <p>5345$</p>
                        </div>
                    
                    <div class="articulo-cantidad">
                        <label for="">Cantidad</label>
                        <input type="number" min="1">
                    </div>
                    <div class="precio">
                        <p>Precio Total</p>
                        <p>324234234$</p>
                    </div>
                    <div class="cerrar-articulo" id="borrar-codigo1"><i class="fa-solid fa-xmark"></i></div>
                </div> */