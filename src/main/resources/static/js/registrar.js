// Espera a que el documento HTML esté completamente cargado antes de ejecutar el código.
$(document).ready(function() {
  // Código a ejecutar cuando el documento está listo.
});

/**
 * Función asíncrona para registrar un nuevo usuario.
 */
async function registrarUsuario() {
  // Objeto que almacenará los datos del nuevo usuario.
  let datos = {};
  datos.nombre = document.getElementById('txtNombre').value;
  datos.apellido = document.getElementById('txtApellido').value;
  datos.email = document.getElementById('txtEmail').value;
  datos.password = document.getElementById('txtPassword').value;

  // Obtén el valor del campo 'Repetir Contraseña'.
  let repetirPassword = document.getElementById('txtRepetirPassword').value;

  // Verifica que todos los campos estén llenos.
  if (!datos.nombre || !datos.apellido || !datos.email || !datos.password || !repetirPassword) {
    alert('Todos los campos deben estar llenos.');
    return;
  }

  // Verifica que las contraseñas coincidan.
  if (repetirPassword != datos.password) {
    alert('La contraseña que escribiste es diferente.');
    return;
  }

  // Realiza una solicitud POST a la API para registrar el nuevo usuario.
  const request = await fetch('api/usuarios', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  // Muestra una alerta indicando que la cuenta fue creada con éxito.
  alert("La cuenta fue creada con éxito!");

  // Redirige al usuario a la página 'login.html'.
  window.location.href = 'login.html';
}
