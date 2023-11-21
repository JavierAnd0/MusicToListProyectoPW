/**
 * Definición del tipo de datos para representar una canción.
 * @typedef {Object} Cancion
 * @property {number} id - ID.
 * @property {string} titulo - Título de la canción.
 * @property {string} album - Álbum de la canción.
 * @property {string} descripcion - Descripción de la canción.
 * @property {string} link - Enlace de la canción.
 * @property {string} fechaFormateada - Fecha formateada de la canción.
 */

/**
 * Método que se ejecuta cuando el documento HTML está completamente cargado.
 */
$(document).ready(function() {
    cargarcanciones();
    $('#canciones').DataTable();
});

/**
 * Arreglo que almacenará las canciones cargadas.
 * @type {Array<Cancion>}
 */
let canciones;

/**
 * Función asíncrona para cargar las canciones desde la API.
 */
async function cargarcanciones() {
    const request = await fetch('api/canciones', {
        method: 'GET',
        headers: getHeaders()
    });
    canciones = await request.json();

    let listadoHtml = '';
    for (let cancion of canciones) {
        const fechaFormateada = new Date(cancion.fecha_agregada).toLocaleDateString('es-ES');

        let botonEliminar = '<a href="#" onclick="eliminarCancion(' + cancion.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

        let cancionesHtml = '<tr><td>' + cancion.id + '</td><td>' + cancion.titulo + '</td><td>' + cancion.album + '</td><td>' +
            cancion.descripcion + '</td><td>' + fechaFormateada + '</td><td>' + cancion.link + '</td> </td><td>' + botonEliminar +
            '</td><td><a href="#" onclick="editarCancion(' + cancion.id + ')" class="btn btn-primary btn-circle btn-sm"><i class="fas fa-edit"></i></a></td></tr>';

        listadoHtml += cancionesHtml;
    }

    document.querySelector('#canciones tbody').outerHTML = listadoHtml;
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
 * Función asíncrona para eliminar una canción por su ID.
 * @param {number} id - ID de la canción a eliminar.
 */
async function eliminarCancion(id) {
    if (!confirm('¿Desea eliminar esta canción?')) {
        return;
    }
    const request = await fetch('api/canciones/' + id, {
        method: 'DELETE',
        headers: getHeaders()
    });
    location.reload();
}

/**
 * Función para agregar una nueva canción.
 * @param {Cancion} nuevaCancion - Nueva canción a agregar.
 */
async function agregarCancion(nuevaCancion) {
    const token = localStorage.token;

    const request = await fetch('api/canciones', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(nuevaCancion)
    });

    if (request.ok) {
        location.reload();
    } else {
        alert('Error al agregar la canción. Por favor, inténtalo de nuevo.');
    }
}

/**
 * Función para prellenar el formulario de edición con los datos de la canción seleccionada.
 * @param {number} id - ID de la canción a editar.
 */
function editarCancion(id) {
    const cancion = canciones.filter(c => c.id === id)[0]
    $("#createId").val(cancion.id)
    $("#createAlbum").val(cancion.album)
    $("#createTitle").val(cancion.titulo)
    $("#createDescription").val(cancion.descripcion)
    $("#createDate").val(cancion.fechaFormateada)
    $("#createLink").val(cancion.link)
}
