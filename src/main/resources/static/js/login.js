// Espera a que el documento HTML esté completamente cargado antes de ejecutar el código.
$(document).ready(function() {
  // Código a ejecutar cuando el documento está listo.
});

/**
 * Función asíncrona para iniciar sesión.
 */
async function iniciarSesion() {
  // Objeto que almacenará los datos del usuario.
  let datos = {};
  datos.email = document.getElementById('txtEmail').value;
  datos.password = document.getElementById('txtPassword').value;

  // Realiza una solicitud POST a la API para iniciar sesión.
  const request = await fetch('api/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  // Obtiene la respuesta de la solicitud.
  const respuesta = await request.text();

  // Verifica si la respuesta indica un inicio de sesión exitoso.
  if (respuesta != 'FAIL') {
    // Almacena el token y el correo electrónico en el almacenamiento local.
    localStorage.token = respuesta;
    localStorage.email = datos.email;

    // Redirige al usuario a la página 'Canciones.html'.
    window.location.href = 'Canciones.html';
  } else {
    // Muestra una alerta si las credenciales son incorrectas.
    alert("Las credenciales son incorrectas. Por favor, inténtelo nuevamente.");
  }
}
