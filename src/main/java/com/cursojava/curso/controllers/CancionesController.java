package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.CancionesDao;
import com.cursojava.curso.models.Canciones;
import com.cursojava.curso.models.Usuario;
import com.cursojava.curso.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * Controlador para gestionar operaciones relacionadas con la entidad {@link Canciones}.
 */
@RestController
public class CancionesController {

    @Autowired
    private CancionesDao cancionesDao;

    @Autowired
    private JWTUtil jwtUtil;

    /**
     * Obtiene una lista de canciones asociadas al usuario que realiza la solicitud.
     *
     * @param token Token de autorización que contiene la información del usuario.
     * @return Lista de canciones asociadas al usuario.
     */
    @RequestMapping(value = "api/canciones", method = RequestMethod.GET)
    public List<Canciones> getCancionesById(@RequestHeader(value = "Authorization") String token) {
        String usuarioId = jwtUtil.getKey(token);
        return cancionesDao.findByUsuarioId(Long.valueOf(usuarioId));
    }

    /**
     * Elimina una canción específica basándose en su ID.
     *
     * @param token Token de autorización que contiene la información del usuario.
     * @param id    ID de la canción a eliminar.
     */
    @RequestMapping(value = "api/canciones/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token,
                         @PathVariable Long id) {
        Canciones canciones = cancionesDao.getById(id);
        cancionesDao.delete(canciones);
    }

    /**
     * Agrega una nueva canción a la base de datos.
     *
     * @param token         Token de autorización que contiene la información del usuario.
     * @param nuevaCancion  Objeto {@link Canciones} que representa la nueva canción a agregar.
     * @return              La canción guardada en la base de datos.
     */
    @RequestMapping(value = "api/canciones", method = RequestMethod.POST)
    public Canciones agregarCancion(@RequestHeader(value = "Authorization") String token,
                                    @RequestBody Canciones nuevaCancion) {
        String usuarioId = jwtUtil.getKey(token);

        // Asignar el usuario a la nueva canción
        Usuario usuario = new Usuario();
        usuario.setId(Long.valueOf(usuarioId));
        nuevaCancion.setUsuario(usuario);

        // Establecer la fecha actual como fecha de agregado
        nuevaCancion.setFecha_agregada(new Date());

        // Guardar la nueva canción en la base de datos
        Canciones cancionGuardada = cancionesDao.save(nuevaCancion);

        return cancionGuardada;
    }
}
