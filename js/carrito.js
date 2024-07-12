let datosCarrito = []
const contenedorArticulos = document.getElementById("cont-articulos")
const pTotal=document.getElementById("total")
let total=0


function recarga() {
    if (localStorage.getItem("datosCompra")) {
        datosCarrito = JSON.parse(localStorage.getItem("datosCompra"))
    }

    
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

    pTotal.innerText="$"+total


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

}

/* <article>
        <p class="nombre">B7/01</p>
        <p class="cantidad">100</p>
        <p class="precio">$1020000</p>
    </article> */