// Espera a que el documento HTML esté completamente cargado antes de ejecutar el código.
$(document).ready(function() {
    // Carga la lista de usuarios y configura el DataTable al cargar el documento.
    cargarUsuarios();
    $('#usuarios').DataTable();

    // Actualiza el contenido del elemento con id 'txt-email-usuario' con el email almacenado en el localStorage.
    actualizarEmailDelUsuario();
});

/**
 * Actualiza el contenido del elemento con id 'txt-email-usuario' con el email almacenado en el localStorage.
 */
function actualizarEmailDelUsuario() {
    document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}

/**
 * Función asíncrona para cargar la lista de usuarios desde la API.
 */
async function cargarUsuarios() {
    // Realiza una solicitud GET a la API para obtener la lista de usuarios.
    const request = await fetch('api/usuarios', {
        method: 'GET',
        headers: getHeaders()
    });

    // Convierte la respuesta JSON en un array de usuarios.
    const usuarios = await request.json();

    // Construye el HTML para la tabla de usuarios.
    let listadoHtml = '';
    for (let usuario of usuarios) {
        let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

        // Verifica si el campo 'telefono' es nulo y asigna un guión en caso contrario.
        let telefonoTexto = usuario.telefono == null ? '-' : usuario.telefono;

        // Construye la fila de la tabla para cada usuario.
        let usuarioHtml = '<tr><td>'+usuario.id+'</td><td>' + usuario.nombre + ' ' + usuario.apellido + '</td><td>'
            + usuario.email+'</td><td>'+telefonoTexto
            + '</td><td>' + botonEliminar + '</td><td><a href="#" onclick="editarUsuario(' + usuario.id + ')" class="btn btn-primary btn-circle btn-sm"><i class="fas fa-edit"></i></a></td></tr>';

        // Agrega la fila al listado HTML.
        listadoHtml += usuarioHtml;
    }

    // Reemplaza el contenido del tbody con el listado de usuarios.
    document.querySelector('#usuarios tbody').outerHTML = listadoHtml;
}

/**
 * Función para obtener los encabezados de la solicitud, incluyendo el token de autorización.
 * @returns {Object} - Encabezados de la solicitud.
 */
function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}

/**
 * Función asíncrona para eliminar un usuario por su ID.
 * @param {number} id - ID del usuario a eliminar.
 */
async function eliminarUsuario(id) {
    // Muestra un cuadro de confirmación antes de proceder con la eliminación.
    if (!confirm('¿Desea eliminar este usuario?')) {
        return;
    }

    // Realiza una solicitud DELETE a la API para eliminar el usuario.
    const request = await fetch('api/usuarios/' + id, {
        method: 'DELETE',
        headers: getHeaders()
    });

    // Recarga la página después de la eliminación.
    location.reload();
}
