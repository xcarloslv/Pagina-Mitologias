
let productosFactura = [];
let totalFactura = 0;
let compraFinalizada = false;

// Obtener los datos del usuario y del carrito
function cargarFactura() {
    const sesion = sessionStorage.getItem("usuarioActivo");

    if (!sesion) {
        alert("Debes iniciar sesión para continuar.");
        window.location.href = "login.html";
        return;
    }

    const usuario = JSON.parse(sesion);

    document.getElementById("cliente").textContent = usuario.nombre;
    document.getElementById("correo").textContent = usuario.correo;
    document.getElementById("fecha").textContent =
        new Date().toLocaleString("es-MX");

    // Crear un folio para esta factura
    document.getElementById("folio").textContent =
        "MIT-" + Date.now();

    const carrito = localStorage.getItem("savedproducto");
    const detalle = document.getElementById("detalleFactura");

    if (!carrito) {
        document.getElementById("mensaje").textContent =
            "No hay productos en el carrito.";

        document.getElementById("btnPDF").disabled = true;
        return;
    }

    const productos = carrito.split(",").filter(function (dato) {
        return dato.trim() !== "";
    });

    // Agrupar productos repetidos
    productos.forEach(function (dato) {
        const partes = dato.split("|");

        const nombre = partes[0];
        const precio = Number(partes[1]);

        if (!nombre || !Number.isFinite(precio)) {
            return;
        }

        const existente = productosFactura.find(function (producto) {
            return producto.nombre === nombre &&
                   producto.precio === precio;
        });

        if (existente) {
            existente.cantidad++;
        } else {
            productosFactura.push({
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });
        }
    });

    if (productosFactura.length === 0) {
        document.getElementById("mensaje").textContent =
            "No se pudieron leer los productos del carrito.";

        document.getElementById("btnPDF").disabled = true;
        return;
    }

    // Mostrar los productos en la tabla
    productosFactura.forEach(function (producto) {
        const fila = document.createElement("tr");

        const subtotal = producto.precio * producto.cantidad;

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = producto.nombre;

        const celdaCantidad = document.createElement("td");
        celdaCantidad.textContent = producto.cantidad;

        const celdaPrecio = document.createElement("td");
        celdaPrecio.textContent = "$" + producto.precio.toFixed(2);

        const celdaSubtotal = document.createElement("td");
        celdaSubtotal.textContent = "$" + subtotal.toFixed(2);

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaCantidad);
        fila.appendChild(celdaPrecio);
        fila.appendChild(celdaSubtotal);

        detalle.appendChild(fila);

        totalFactura += subtotal;
    });

    document.getElementById("total").textContent =
        totalFactura.toFixed(2);
}

// Generar el comprobante PDF
function generarPDF() {
    if (compraFinalizada) {
        return;
    }

    if (productosFactura.length === 0) {
        alert("No hay productos para generar la factura.");
        return;
    }

    if (!window.jspdf) {
        alert("No se pudo cargar la biblioteca del PDF. Revisa tu conexión a internet.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const usuario = JSON.parse(
        sessionStorage.getItem("usuarioActivo")
    );

    const folio = document.getElementById("folio").textContent;
    const fecha = document.getElementById("fecha").textContent;

    pdf.setFontSize(20);
    pdf.text("MITOLOGIAS", 20, 20);

    pdf.setFontSize(14);
    pdf.text("COMPROBANTE DE COMPRA", 20, 32);

    pdf.setFontSize(10);
    pdf.text("Folio: " + folio, 20, 43);
    pdf.text("Cliente: " + usuario.nombre, 20, 51);
    pdf.text("Correo: " + usuario.correo, 20, 59);

    // Dividir la fecha si es demasiado larga
    pdf.text("Fecha: " + fecha, 20, 67);

    let y = 82;

    pdf.setFontSize(10);
    pdf.text("Producto", 20, y);
    pdf.text("Cant.", 105, y);
    pdf.text("Precio", 130, y);
    pdf.text("Subtotal", 165, y);

    y += 8;

    productosFactura.forEach(function (producto) {
        const nombre = pdf.splitTextToSize(producto.nombre, 75);
        const subtotal = producto.precio * producto.cantidad;
        const alto = Math.max(7, nombre.length * 5);

        if (y + alto > 270) {
            pdf.addPage();
            y = 20;
        }

        pdf.text(nombre, 20, y);
        pdf.text(String(producto.cantidad), 105, y);
        pdf.text("$" + producto.precio.toFixed(2), 130, y);
        pdf.text("$" + subtotal.toFixed(2), 165, y);

        y += alto + 3;
    });

    if (y + 20 > 280) {
        pdf.addPage();
        y = 20;
    }

    pdf.setFontSize(14);
    pdf.text(
        "TOTAL: $" + totalFactura.toFixed(2) + " MXN",
        20,
        y + 8
    );

    pdf.setFontSize(10);
    pdf.text("Gracias por tu compra.", 20, y + 20);

    // Descargar el comprobante
    pdf.save("factura_mitologias.pdf");

    // Vaciar el carrito una vez generada la factura
    localStorage.removeItem("savedproducto");

    compraFinalizada = true;

    document.getElementById("btnPDF").disabled = true;
    document.getElementById("mensaje").textContent =
        "Compra finalizada. Tu factura PDF se ha generado.";

    alert("¡Compra confirmada! Tu PDF se ha generado correctamente.");
}

// Cargar la factura cuando abre la página
document.addEventListener("DOMContentLoaded", cargarFactura);
