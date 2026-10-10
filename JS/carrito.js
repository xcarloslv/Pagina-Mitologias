function meterEnCarro() {
    var producto = document.getElementById("producto").value;
    var listaActual = localStorage.getItem("savedproducto");
    if (listaActual) {
        localStorage.setItem("savedproducto", listaActual + "," + producto);
    } else {
        localStorage.setItem("savedproducto", producto);
    }
    alert("¡Producto " + producto + " agregado al carrito!");
}
function irAlCarrito() {
    window.location = "../HTML/carrito.html";
}

function cargarCarrito() {
    var listaGuardada = localStorage.getItem("savedproducto");
    var contenedor = document.getElementById("lista_productos");
    var totalTexto = document.getElementById("prod_precio");
    
    if (!contenedor) return;

    contenedor.innerHTML = ""; // Limpiamos la pantalla
    var totalSumado = 0;

   if (listaGuardada) {
        // 1. Cortamos el texto largo por las comas para tener una lista de productos
        var productos = listaGuardada.split(",");

        // 2. Revisamos los productos uno por uno
        for (var i = 0; i < productos.length; i++) {
            var datos = productos[i].split("|"); // datos[0] es el nombre, datos[1] es el precio
            
            var nombre = datos[0];
            var precio = Number(datos[1]);

            // 3. Sumamos al total y lo mostramos en pantalla
            totalSumado = totalSumado + precio;
            contenedor.innerHTML += "<p>" + nombre + " - $" + precio + "</p>";
        }

        // 4. Ponemos el precio total
        totalTexto.innerText = totalSumado;

    } else {
        // Si no hay nada guardado
        contenedor.innerHTML = "<p>El carrito está vacío</p>";
        totalTexto.innerText = "0";
    }
}

function vaciarCarrito() {
    localStorage.removeItem("savedproducto");
    alert("Carrito vaciado exitosamente");
    cargarCarrito();
}
function volver() {
    window.location = "../HTML/catalogo.html";
}