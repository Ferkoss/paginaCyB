const abrirMenu = document.getElementById("abrir-menu")
const cerrarMenu = document.getElementById("cerrar-menu")
const menu = document.getElementById("menu-ul")
const restanteMenu = document.getElementById("restante-menu")
let datosCarrito = []
const contenedorArticulos = document.getElementById("cont-articulos")
const pTotal=document.getElementById("total")
const sombraForm=document.getElementById("sombra-form")
const botonCerrarForm=document.getElementById("cerrar-form")
const botonSiguiente=document.getElementById("botonSiguiente")
let total=0
const inputNombre=document.getElementById("nom")
const inputApellido=document.getElementById("ape")
const inputTelefono=document.getElementById("tel")
const inputEmail=document.getElementById("email")
const inputLocalizacion=document.getElementById("loc")
const formEnvio=document.getElementById("form-envio")
let resumenPedido=""


abrirMenu.addEventListener("click", () => {
    menu.style.display = "flex"
    restanteMenu.style.display = "block"
}
)

cerrarMenu.addEventListener("click", cierreMenu = () => {
    menu.style.display = "none"
    restanteMenu.style.display = "none"
})

restanteMenu.addEventListener("click", cierreMenu)


addEventListener("resize", () => {
    if (Number(innerWidth) > 900) {
        menu.style.display = "flex"
        restanteMenu.style.display = "block"
    }
    /*else {
        menu.style.display = "none"
    }*/
});



function recarga() {
    if (localStorage.getItem("datosCompra")) {
        datosCarrito = JSON.parse(localStorage.getItem("datosCompra"))
    }

    if(datosCarrito.length>0){
    
    for (let dato of datosCarrito) {
        let datoCorrespondiente=buscarCorrespondiente(dato)
        let prodTotal=Number(datoCorrespondiente.precio)*Number(dato.cantidad)
        total+=prodTotal
        if(dato.color){
        escribirDatos(datoCorrespondiente.nombre+" "+dato.color,dato.cantidad,prodTotal)}
        else{
            escribirDatos(datoCorrespondiente.nombre,dato.cantidad,prodTotal)
        }
    }
    resumenPedido+="TOTAL $"+total
    pTotal.innerText="$"+total
}
else{
    document.getElementById("main").innerHTML=`<p class="no-hay-datos">No hay datos</p>`
    botonSiguiente.remove()
}

}


function buscarCorrespondiente(dato) {
    for (let tipoDato of datos) {
        for (let datoAlmacenado of tipoDato){
            if (dato.id == datoAlmacenado.nombre) {
                
                return datoAlmacenado

            }
        }
    }
}


function escribirDatos(nom, cant, totalProd) {
    let article = document.createElement("article")
    contenedorArticulos.appendChild(article)

    let nombre = document.createElement("p")
    nombre.classList.add("nombre")
    nombre.innerText = nom
    article.appendChild(nombre)

    let cantidad = document.createElement("p")
    cantidad.classList.add("cantidad")
    cantidad.innerText = cant
    article.appendChild(cantidad)

    let precio = document.createElement("p")
    precio.classList.add("precio")
    precio.innerText = "$"+totalProd
    article.appendChild(precio)

    resumenPedido+="Producto: "+nom+"\n"
    resumenPedido+="Cantidad: "+cant+"\n"
    resumenPedido+="Total Producto: $"+totalProd+"\n"
    resumenPedido+="---------------------------------------------------"+"\n\n"
}

/* <article>
        <p class="nombre">B7/01</p>
        <p class="cantidad">100</p>
        <p class="precio">$1020000</p>
    </article> */

botonSiguiente.addEventListener("click",()=>{
sombraForm.style.display="flex"
})
botonCerrarForm.addEventListener("click",()=>{
    sombraForm.style.display="none"
})

formEnvio.addEventListener("submit",(evento)=>{
evento.preventDefault()

/*console.log(resumenPedido)*/
/*
emailjs.send("service_rqfikac","template_gj0miaq",{
    nombre: inputNombre.value,
    apellido: inputApellido.value,
    telefono: inputTelefono.value,
    email: inputEmail.value,
    localidad: inputLocalizacion.value,
    pedido: resumenPedido,
    });
*/
    localStorage.removeItem("datosCompra")
    console.log("Datos Eliminados")
    window.history.go(-1)

})