package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.UsuarioDao;
import com.cursojava.curso.models.Usuario;
import com.cursojava.curso.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador para gestionar operaciones de autenticación.
 */
@RestController
public class AuthController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    /**
     * Maneja la solicitud de inicio de sesión.
     *
     * @param usuario Objeto {@link Usuario} que contiene las credenciales del usuario.
     * @return Token JWT si las credenciales son válidas, "FAIL" de lo contrario.
     */
    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody Usuario usuario) {

        Usuario usuarioLogueado = usuarioDao.obtenerUsuarioPorCredenciales(usuario);
        if (usuarioLogueado != null) {
            String tokenJwt = jwtUtil.create(String.valueOf(usuarioLogueado.getId()), usuarioLogueado.getEmail());
            return tokenJwt;
        }
        return "FAIL";
    }

}
