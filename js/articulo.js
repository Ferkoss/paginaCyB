const abrirMenu = document.getElementById("abrir-menu")
const cerrarMenu = document.getElementById("cerrar-menu")
const menu = document.getElementById("menu-ul")
const main = document.getElementById("cont-main")
const carritoSombra = document.getElementById("carrito-sombra")
const carritoDatos = document.getElementById("carrito-datos")
const abrirCarrito = document.getElementById("icono-abrir-carrito")
const cerrarCarrito = document.getElementById("cerrar-carrito")
let datosCarrito = []
let totalCarrito=0
const h3Total=document.getElementById("carrito-total")
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





abrirCarrito.addEventListener("click", () => {
    carritoSombra.style.display = "flex"
})

cerrarCarrito.addEventListener("click", () => {
    carritoSombra.style.display = "none"
})




function recarga() {

    recargaDatos()
    cargarCarrito()
    modificarTotalCarrito()

}

function recargaDatos() {

    if (localStorage.getItem("datosCompra")) {
        datosCarrito = JSON.parse(localStorage.getItem("datosCompra"))
    }

    for (let dato of datos[0]) {

        let divContenedor = document.createElement("div")
        divContenedor.classList.add("contenedor-articulo")
        main.appendChild(divContenedor)

        let imgArticulo = document.createElement("img")
        imgArticulo.src = "../img/imagen-fondo.png"
        divContenedor.appendChild(imgArticulo)

        let divContenido = document.createElement("div")
        divContenido.classList.add("contenido-articulo")
        divContenedor.appendChild(divContenido)

        let h3Contenido = document.createElement("h3")
        h3Contenido.innerText = dato.nombre
        divContenido.appendChild(h3Contenido)

        let pContenido = document.createElement("p")
        pContenido.innerText = dato.tamaño
        divContenido.appendChild(pContenido)

        let divCantidad = document.createElement("div")
        divCantidad.classList.add("cantidad-articulo")
        divContenido.appendChild(divCantidad)

        let labelCant = document.createElement("label")
        labelCant.setAttribute("for", "cant-" + dato.nombre)
        labelCant.innerText = "Cantidad:"
        divCantidad.appendChild(labelCant)

        let inputCant = document.createElement("input")
        inputCant.type = "number"
        inputCant.name = "cant-" + dato.nombre
        inputCant.id = "cant-" + dato.nombre
        inputCant.min = "1"
        divCantidad.appendChild(inputCant)
        inputCant.addEventListener("keyup", () => { cambioCantidad(inputCant) })
        inputCant.addEventListener("change", () => { cambioCantidad(inputCant) })

        if (dato.colores) {
            divContenido.classList.add("con-art-select")
            let divColores = document.createElement("div")
            divColores.classList.add("color-articulo")
            divContenido.appendChild(divColores)

            let labelColor = document.createElement("label")
            labelColor.innerText = "Ingrese su color:  "
            labelColor.setAttribute("for", "color-" + dato.nombre)
            divColores.appendChild(labelColor)

            let selectColores = document.createElement("select")
            selectColores.name = "color-" + dato.nombre
            selectColores.id = "color-" + dato.nombre

            for (let color of dato.colores) {
                let opcion = document.createElement("option")
                opcion.value = color
                opcion.innerText = color
                selectColores.appendChild(opcion)
            }
            divColores.appendChild(selectColores)
        }

        let iconoCarrito = document.createElement("i")
        iconoCarrito.classList.add("fa-solid", "fa-cart-shopping")
        iconoCarrito.addEventListener("click", () => {
            if (Number(inputCant.value) <= 0) {
                inputCant.style.backgroundColor = "red"
            }
            else {
                if (!estaEnCarrito(dato.nombre, inputCant.value,dato.precio)) {
                    if (dato.colores) {
                        datosCarrito.push({ id: dato.nombre, cantidad: inputCant.value, color: document.getElementById("color-" + dato.nombre).value })
                        localStorage.setItem("datosCompra", JSON.stringify(datosCarrito))
                        agregarDatosCarrito(dato.nombre, dato.img, dato.precio, inputCant.value)
                        modificarTotalCarrito()
                    }
                    else {
                        datosCarrito.push({ id: dato.nombre, cantidad: inputCant.value })
                        localStorage.setItem("datosCompra", JSON.stringify(datosCarrito))
                        agregarDatosCarrito(dato.nombre, dato.img, dato.precio, inputCant.value)
                        modificarTotalCarrito()
                    }
                }

            }

        })
        divContenido.appendChild(iconoCarrito)

    }

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
            modificarTotalCarrito()
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
        h3Total.innerText="Total: $"+totalCarrito
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
    input.addEventListener("keyup", () => { cambioCantidad(input); modificacionInstantanea(nombre,input, precio, p4) })
    input.addEventListener("change", () => { cambioCantidad(input); modificacionInstantanea(nombre,input, precio, p4) })



    let contenedorPrecioTotal = document.createElement("div")
    contenedorPrecioTotal.classList.add("precio")
    divArtuculo.appendChild(contenedorPrecioTotal)

    let p3 = document.createElement("p")
    p3.innerText = "Precio Total"
    contenedorPrecioTotal.appendChild(p3)

    let p4 = document.createElement("p")
    p4.innerText = "$" + Number(precio) * Number(cantidad)
    p4.id="total-"+nombre
    p4.setAttribute("class","totalArticulo")
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
            modificarTotalCarrito()
            break
        }
    }


}

function modificarTotalCarrito(){
    totalCarrito=0
    for(let totalArticulo of document.querySelectorAll(".totalArticulo")){
        totalCarrito+=Number(totalArticulo.innerText.slice(1))
    }
    h3Total.innerText="Total: $"+totalCarrito
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

function modificacionInstantanea(nombre,input, precioUnidad, precioTotal) {
    if (input.value >= 0) {
        precioTotal.innerText = "$" + Number(input.value) * Number(precioUnidad)
        
        for(let dato of datosCarrito){
            if(dato.id==nombre){
                dato.cantidad=input.value
                localStorage.setItem("datosCompra",JSON.stringify(datosCarrito))
                modificarTotalCarrito()
                break
            }
        }
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