  var datosMitologias = {
            nordica: [
                { nombre: "Martillo de Thor (Mjölnir Coleccionable)", precio: 250, desc: "Réplica a escala en resina y metal con inscripciones rúnicas.", img: "../IMG/martillo_thor.png", val: "Martillo de Thor Coleccionable|250" },
                { nombre: "Libro: Edda Mayor y Menor (Edición Ilustrada)", precio: 180, desc: "Compendio completo de poesía mitológica nórdica encuadernado en piel.", img: "../IMG/libro_eda.png", val: "Libro Edda Mayor y Menor|180" },
                { nombre: "Figura Decorativa de Odín en el Trono", precio: 210, desc: "Estatuilla esculpida a detalle junto a sus cuervos Hugin y Munin.", img: "../IMG/Odin_trono.jpg", val: "Figura Decorativa Odín|210" },
                { nombre: "Amuleto Valknut de Plata", precio: 120, desc: "Símbolo nórdico de los guerreros en plata esterlina.", img: "../IMG/Amuleto.jpg", val: "Amuleto Valknut Plata|120" }
            ],
            egipcia: [
                { nombre: "Estatua Dorada de Anubis", precio: 220, desc: "Figura coleccionable en acabado dorado del guardián de las tumbas.", img: "../IMG/estatua_anubis.png", val: "Estatua Dorada Anubis|220" },
                { nombre: "Libro de los Muertos (Papiro Impreso)", precio: 190, desc: "Facsímil detallado en papiro vegetal con jeroglíficos tradicionales.", img: "../IMG/libro_muertos.png", val: "Libro de los Muertos Papiro|190" },
                { nombre: "Colgante del Ojo de Horus", precio: 140, desc: "Símbolo de protección espiritual labrado en lapislázuli.", img: "../IMG/Ojodehorus.jpg", val: "Colgante Ojo de Horus|140" },
                { nombre: "Sarcófago de Tutankamón en Miniatura", precio: 260, desc: "Edición de colección tallada con acabados esmaltados.", img: "../IMG/tutankamon.jpg", val: "Miniatura Sarcófago Tutankamón|260" }
            ],
            maya: [
                { nombre: "Máscara Ritual de Jade Maya", precio: 240, desc: "Réplica artesanal inspirada en los artefactos funerarios de Palenque.", img: "../IMG/jade.png", val: "Máscara Ritual Jade Maya|240" },
                { nombre: "Calendario Maya en Piedra de Basalto", precio: 200, desc: "Placa tallada a mano con la cuenta larga y jeroglíficos.", img: "../IMG/calendario.png", val: "Calendario Maya Piedra|200" },
                { nombre: "Cuchillo Ceremonial de Obsidiana", precio: 150, desc: "Hoja de obsidiana negra pulida con empuñadura decorada.", img: "../IMG/obsidiana.jpg", val: "Cuchillo Ceremonial Obsidiana|150" }
            ],
            japonesa: [
                { nombre: "Katana Decorativa de Susanoo", precio: 290, desc: "Réplica sin filo con detalles del dios de las tormentas.", img: "../IMG/katana.png", val: "Katana Decorativa Susanoo|290" },
                { nombre: "Máscara Kitsune de Madera Pulida", precio: 160, desc: "Máscara tradicional pintada a mano con motivos del zorro místico.", img: "../IMG/kitsune.png", val: "Máscara Kitsune Madera|160" },
                { nombre: "Espejo Yata no Kagami", precio: 210, desc: "Réplica en bronce del tesoro sagrado imperial.", img: "../IMG/yata.png", val: "Espejo Yata no Kagami|210" }
            ]
        };

        
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
        function actualizarDetalleProducto() {
            var mit = document.getElementById("select_mitologia").value;
            var selectProd = document.getElementById("producto");
            var indice = selectProd.selectedIndex;

            if (indice < 0) indice = 0;
            var item = datosMitologias[mit][indice];

            if (item) {
                document.getElementById("img_art").src = item.img;
                document.getElementById("img_art").alt = item.nombre;
                document.getElementById("td_nombre_art").innerText = item.nombre;
                document.getElementById("td_desc_art").innerText = item.desc;
                document.getElementById("td_precio_art").innerText = "$" + item.precio + " USD";
            }
        }



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
    window.location = "carrito.html";
}

function cargarCarrito() {
    
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
    window.location = "catalogo.html";
}