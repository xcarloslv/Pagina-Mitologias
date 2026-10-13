var datosMitologias = {
    nordica: [
        { nombre: "Martillo de Thor (Mjölnir Coleccionable)", precio: 250, desc: "Réplica a escala en resina y metal con inscripciones rúnicas.", img: "../IMG/Martillo_thor.png", val: "Martillo de Thor Coleccionable|250|../IMG/Martillo_thor.png" },
        { nombre: "Libro: Edda Mayor y Menor (Edición Ilustrada)", precio: 180, desc: "Compendio completo de poesía mitológica nórdica encuadernado en piel.", img: "../IMG/libro_eda.png", val: "Libro Edda Mayor y Menor|180|../IMG/libro_eda.png" },
        { nombre: "Figura Decorativa de Odín en el Trono", precio: 210, desc: "Estatuilla esculpida a detalle junto a sus cuervos Hugin y Munin.", img: "../IMG/Odin_trono.jpg", val: "Figura Decorativa Odín|210|../IMG/Odin_trono.jpg" },
        { nombre: "Amuleto Valknut de Plata", precio: 120, desc: "Símbolo nórdico de los guerreros en plata esterlina.", img: "../IMG/Amuleto.jpg", val: "Amuleto Valknut Plata|120|../IMG/Amuleto.jpg" }
    ],
    egipcia: [
        { nombre: "Estatua Dorada de Anubis", precio: 220, desc: "Figura coleccionable en acabado dorado del guardián de las tumbas.", img: "../IMG/estatua_anubis.png", val: "Estatua Dorada Anubis|220|../IMG/estatua_anubis.png" },
        { nombre: "Libro de los Muertos (Papiro Impreso)", precio: 190, desc: "Facsímil detallado en papiro vegetal con jeroglíficos tradicionales.", img: "../IMG/Libro_muertos.png", val: "Libro de los Muertos Papiro|190|../IMG/Libro_muertos.png" },
        { nombre: "Colgante del Ojo de Horus", precio: 140, desc: "Símbolo de protección espiritual labrado en lapislázuli.", img: "../IMG/Ojodehorus.jpg", val: "Colgante Ojo de Horus|140|../IMG/Ojodehorus.jpg" },
        { nombre: "Sarcófago de Tutankamón en Miniatura", precio: 260, desc: "Edición de colección tallada con acabados esmaltados.", img: "../IMG/tutankamon.jpg", val: "Miniatura Sarcófago Tutankamón|260|../IMG/tutankamon.jpg" }
    ],
    maya: [
        { nombre: "Máscara Ritual de Jade Maya", precio: 240, desc: "Réplica artesanal inspirada en los artefactos funerarios de Palenque.", img: "../IMG/jade.png", val: "Máscara Ritual Jade Maya|240|../IMG/jade.png" },
        { nombre: "Calendario Maya en Piedra de Basalto", precio: 200, desc: "Placa tallada a mano con la cuenta larga y jeroglíficos.", img: "../IMG/calendario.png", val: "Calendario Maya Piedra|200|../IMG/calendario.png" },
        { nombre: "Cuchillo Ceremonial de Obsidiana", precio: 150, desc: "Hoja de obsidiana negra pulida con empuñadura decorada.", img: "../IMG/obsidiana.jpg", val: "Cuchillo Ceremonial Obsidiana|150|../IMG/obsidiana.jpg" }
    ],
    japonesa: [
        { nombre: "Katana Decorativa de Susanoo", precio: 290, desc: "Réplica sin filo con detalles del dios de las tormentas.", img: "../IMG/katana.png", val: "Katana Decorativa Susanoo|290|../IMG/katana.png" },
        { nombre: "Máscara Kitsune de Madera Pulida", precio: 160, desc: "Máscara tradicional pintada a mano con motivos del zorro místico.", img: "../IMG/kitsune.png", val: "Máscara Kitsune Madera|160|../IMG/kitsune.png" },
        { nombre: "Espejo Yata no Kagami", precio: 210, desc: "Réplica en bronce del tesoro sagrado imperial.", img: "../IMG/yata.png", val: "Espejo Yata no Kagami|210|../IMG/yata.png" }
    ]
};
/**
 * Función que actualiza las opciones del menú desplegable de productos (<select>)
 * según la mitología seleccionada por el usuario.
 */
function actualizarMitologia() {
    var mit = document.getElementById("select_mitologia").value;
    var selectProd = document.getElementById("producto");
    var lista = datosMitologias[mit] || [];

    selectProd.innerHTML = "";

    for (var i = 0; i < lista.length; i++) {
        var opt = document.createElement("option");
        opt.value = lista[i].val;
        opt.textContent = lista[i].nombre + " - $" + lista[i].precio + " USD";
        selectProd.appendChild(opt);
    }
    actualizarDetalleProducto();
}
/**
 * Función que muestra los detalles del producto seleccionado (imagen, nombre, descripción y precio)
 * en la vista principal o tabla del catálogo.
 */
function actualizarDetalleProducto() {
    var mit = document.getElementById("select_mitologia").value;
    var selectProd = document.getElementById("producto");
    var indice = selectProd.selectedIndex;

    if (indice < 0) indice = 0;
    var item = datosMitologias[mit][indice];
// Si el producto existe, actualiza los elementos HTML correspondientes con sus datos
    if (item) {
        document.getElementById("img_art").src = item.img;
        document.getElementById("img_art").alt = item.nombre;
        document.getElementById("td_nombre_art").innerText = item.nombre;
        document.getElementById("td_desc_art").innerText = item.desc;
        document.getElementById("td_precio_art").innerText = "$" + item.precio + " USD";
    }
}
/**
 * Función que agrega el producto seleccionado al almacenamiento local (localStorage)
 * repitiendo el ítem según la cantidad indicada.
 */
function meterEnCarro() {
    var productoVal = document.getElementById("producto").value;
    var cantidadInput = document.getElementById("cantidad_art");
    var cantidad;

        if (cantidadInput) {
            var valorConvertido = parseInt(cantidadInput.value);
            
            if (valorConvertido) {
                cantidad = valorConvertido;
            } else {
                cantidad = 1; // Si el usuario dejó el input vacío o puso texto no válido
            }
        } else {
            cantidad = 1; // Si el campo input no existe en el HTML
        }

    // Guardar el producto repetido tantas veces como la cantidad elegida
    var listaActual = localStorage.getItem("savedproducto");
    var nuevosItems = [];
    // Guarda el valor del producto en un arreglo tantas veces como la cantidad elegida
    for (var i = 0; i < cantidad; i++) {
        nuevosItems.push(productoVal);
    }
    var cadenaNuevos = nuevosItems.join(",");
// Concatena con los artículos existentes en localStorage o crea un nuevo registro
    if (listaActual) {
        localStorage.setItem("savedproducto", listaActual + "," + cadenaNuevos);
    } else {
        localStorage.setItem("savedproducto", cadenaNuevos);
    }
    alert("¡Se agregaron " + cantidad + " unidad(es) al carrito!");
}

function irAlCarrito() {
    window.location = "../HTML/carrito.html";
}

// CARGAR CARRITO
function cargarCarrito() {
    var listaGuardada = localStorage.getItem("savedproducto");
    var contenedor = document.getElementById("lista_productos");
    var totalTexto = document.getElementById("prod_precio");
    // Si la página actual no tiene el contenedor del carrito (por ejemplo, estás en el catálogo), corta la ejecución de la función
    if (!contenedor) return;
    contenedor.innerHTML = ""; 
    var totalSumado = 0;
    //&& and
    //  Comprueba si existen datos guardados y que no sea solo espacio en blanco
    if (listaGuardada && listaGuardada.trim() !== "") {
        // Convierte la gran cadena separada por comas en un arreglo/lista de productos individuales
        var items = listaGuardada.split(",");
        var agrupados = {};

        // Primer ciclo: Recorre cada producto individual que estaba en la lista de localStorage
        for (var i = 0; i < items.length; i++) {
            var item = items[i].trim();
            // Contar cuántas veces aparece cada producto (si ya existe le suma 1, si es el primero inicia en 0 + 1)
            if (item) agrupados[item] = (agrupados[item] || 0) + 1;
        }

       // Segundo ciclo: Recorre cada producto único guardado en el objeto 'agrupados'
        for (var clave in agrupados) {
            // Separa el texto "Nombre|Precio|RutaImagen" usando la barra '|' como delimitador
            // d[0] = Nombre del producto
            // d[1] = Precio unitario
            // d[2] = Ruta de la imagen
            var d = clave.split("|"); 
            var cantidad = agrupados[clave];
            var subtotal = Number(d[1]) * cantidad;
            totalSumado += subtotal;

            contenedor.innerHTML += `
                <div class="carrito-item" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid rgba(189, 142, 67, 0.2); padding-bottom: 10px;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        ${d[2] ? `<img src="${d[2]}" alt="${d[0]}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; border: 1px solid #BD8E43;">` : ''}
                        <div>
                            <h4 style="margin: 0; color: #fff; font-size: 1rem;">${d[0]}</h4>
                            <p style="margin: 4px 0 0 0; color: #9090A0; font-size: 0.9rem;">Precio unitario: $${d[1]} USD</p>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <p style="margin: 0; color: #BD8E43; font-weight: bold;">Cantidad: ${cantidad}</p>
                        <p style="margin: 4px 0 0 0; color: #fff; font-size: 0.95rem;">Subtotal: $${subtotal} USD</p>
                    </div>
                </div>`;
        }
        totalTexto.innerText = totalSumado;
    } else {
        contenedor.innerHTML = "<p style='color: #9090A0; text-align: center;'>El carrito está vacío</p>";
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