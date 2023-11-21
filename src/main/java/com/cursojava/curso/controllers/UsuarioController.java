package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.UsuarioDao;
import com.cursojava.curso.models.Usuario;
import com.cursojava.curso.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador para gestionar operaciones relacionadas con la entidad {@link Usuario}.
 */
@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    /**
     * Obtiene la lista de usuarios.
     *
     * @param token Token de autorización que contiene la información del usuario.
     * @return Lista de usuarios.
     */
    @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
    public List<Usuario> getUsuarios(@RequestHeader(value = "Authorization") String token) {
        if (!validarToken(token)) {
            return null;
        }

        return usuarioDao.getUsuarios();
    }

    /**
     * Valida el token de autorización.
     *
     * @param token Token de autorización que contiene la información del usuario.
     * @return `true` si el token es válido, `false` de lo contrario.
     */
    private boolean validarToken(String token) {
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    /**
     * Registra un nuevo usuario en el sistema.
     *
     * @param usuario Objeto {@link Usuario} que representa al nuevo usuario a registrar.
     */
    @RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Usuario usuario) {

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPassword());
        usuario.setPassword(hash);

        usuarioDao.registrar(usuario);
    }

    /**
     * Elimina un usuario específico basándose en su ID.
     *
     * @param token Token de autorización que contiene la información del usuario.
     * @param id    ID del usuario a eliminar.
     */
    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token,
                         @PathVariable Long id) {
        if (!validarToken(token)) {
            return;
        }
        usuarioDao.eliminar(id);
    }
}
