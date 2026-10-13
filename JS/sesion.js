
const CLAVE_USUARIOS = "mitologiasUsuarios";
const CLAVE_SESION = "usuarioActivo";

// Obtener usuarios registrados
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || [];
}

// Registrar usuarios
const formRegistro = document.getElementById("formRegistro");

if (formRegistro) {
    formRegistro.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim().toLowerCase();
        const contrasena = document.getElementById("contrasena").value;
        const confirmar = document.getElementById("confirmar").value;
        const mensaje = document.getElementById("mensaje");

        if (contrasena !== confirmar) {
            mensaje.textContent = "Las contraseñas no coinciden.";
            return;
        }

        const usuarios = obtenerUsuarios();

        const existe = usuarios.some(function (usuario) {
            return usuario.correo === correo;
        });

        if (existe) {
            mensaje.textContent = "Este correo ya está registrado.";
            return;
        }

        usuarios.push({
            nombre: nombre,
            correo: correo,
            contrasena: contrasena
        });

        localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));

        alert("Registro exitoso. Ahora inicia sesión.");
        window.location.href = "login.html";
    });
}

// Iniciar sesión
const formLogin = document.getElementById("formLogin");

if (formLogin) {
    formLogin.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const correo = document.getElementById("correo").value.trim().toLowerCase();
        const contrasena = document.getElementById("contrasena").value;
        const mensaje = document.getElementById("mensaje");

        const usuarios = obtenerUsuarios();

        const usuario = usuarios.find(function (usuario) {
            return usuario.correo === correo &&
                   usuario.contrasena === contrasena;
        });

        if (!usuario) {
            mensaje.textContent = "Correo o contraseña incorrectos.";
            return;
        }

        // Guardar la sesión del usuario
        sessionStorage.setItem(CLAVE_SESION, JSON.stringify({
            nombre: usuario.nombre,
            correo: usuario.correo
        }));

        window.location.href = "../index.html";
    });
}

// Verificar si hay una sesión activa
function comprobarSesion() {
    return sessionStorage.getItem(CLAVE_SESION) !== null;
}

// Proteger páginas que necesitan iniciar sesión
function protegerPagina() {
    if (!comprobarSesion()) {
        alert("Debes iniciar sesión para entrar.");
        window.location.href = "login.html";
    }
}

// Cerrar sesión
function cerrarSesion() {
    sessionStorage.removeItem(CLAVE_SESION);
    window.location.href = "HTML/login.html";
}
