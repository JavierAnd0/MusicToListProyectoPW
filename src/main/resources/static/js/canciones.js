/**
 * @typedef Cancion
 * @type {object}
 * @property {number} id - your age.
 * @property {string} titulo - an ID.
 * @property {string} album - your name.
 * @property {string} descripcion - your age.
 * @property {string} link - your age.
 * @property {string} fechaFormateada - your age.
 */

$(document).ready(function() {
    cargarcanciones();
    $('#canciones').DataTable();
});

/** @type {Array<Cancion>} */
let canciones;
async function cargarcanciones() {
    const request = await fetch('api/canciones', {
        method: 'GET',
        headers: getHeaders()
    });
    canciones = await request.json();

    let listadoHtml = '';
    for (let cancion of canciones) {
        // Formatear la fecha en el formato deseado (por ejemplo, 'YYYY-MM-DD')
        const fechaFormateada = new Date(cancion.fecha_agregada).toLocaleDateString('es-ES');

        let botonEliminar = '<a href="#" onclick="eliminarCancion(' + cancion.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

        let cancionesHtml = '<tr><td>' + cancion.id + '</td><td>' + cancion.titulo + '</td><td>' + cancion.album + '</td><td>' +
            cancion.descripcion + '</td><td>' + fechaFormateada + '</td><td>' + cancion.link + '</td> </td><td>' + botonEliminar +
            '</td><td><a href="#" onclick="editarCancion(' + cancion.id + ')" class="btn btn-primary btn-circle btn-sm"><i class="fas fa-edit"></i></a></td></tr>';

        listadoHtml += cancionesHtml;
    }

    document.querySelector('#canciones tbody').outerHTML = listadoHtml;
}

    function getHeaders() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        };
    }

//

    async function eliminarCancion(id) {

        if (!confirm('¿Desea eliminar esta cancion?')) {
            return;
        }
        const request = await fetch('api/canciones/' + id, {
            method: 'DELETE',
            headers: getHeaders()
        });
        location.reload()
    }


    $(document).ready(function () {
        cargarcanciones();
        $('#canciones').DataTable();

        // Agregar evento al formulario de creación
        $('#createForm').submit(function (event) {
            event.preventDefault();

            // Obtener los valores del formulario
            const id = $('#createId').val();
            const title = $('#createTitle').val();
            const album = $('#createAlbum').val();
            const description = $('#createDescription').val();
            // Obtener la fecha en el formato correcto
            const date = new Date($('#createDate').val()).toISOString();
            const link = $('#createLink').val();

            // Crear objeto de canción
            const nuevaCancion = {
                id: id,
                titulo: title,
                album: album,
                descripcion: description,
                fecha_agregada: date,
                link: link
            };

            // Realizar la solicitud POST para agregar la nueva canción
            agregarCancion(nuevaCancion);
        });
    });

    async function agregarCancion(nuevaCancion) {
        const token = localStorage.token;

        const request = await fetch('api/canciones', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(nuevaCancion)
        });

        if (request.ok) {
            // Si la solicitud es exitosa, recargar la página para mostrar la nueva canción
            location.reload();
        } else {
            // Si hay un error, mostrar un mensaje al usuario
            alert('Error al agregar la canción. Por favor, inténtalo de nuevo.');
        }
}

        function editarCancion(id){
            const cancion = canciones.filter(c=>c.id===id)[0]
            $("#createId").val(cancion.id)
            $("#createAlbum").val(cancion.album)
            $("#createTitle").val(cancion.titulo)
            $("#createDescription").val(cancion.descripcion)
            $("#createDate").val(cancion.fechaFormateada)
            $("#createLink").val(cancion.link)

        }


