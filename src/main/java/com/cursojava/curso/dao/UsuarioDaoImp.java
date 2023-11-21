package com.cursojava.curso.dao;

import com.cursojava.curso.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Implementación de la interfaz UsuarioDao que utiliza JPA para interactuar con la base de datos.
 */
@Repository
@Transactional
public class UsuarioDaoImp implements UsuarioDao {

    @PersistenceContext
    EntityManager entityManager;

    /**
     * Obtiene la lista de todos los usuarios en la base de datos.
     *
     * @return Lista de usuarios.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Usuario> getUsuarios() {
        String query = "FROM Usuario";
        return entityManager.createQuery(query).getResultList();
    }

    /**
     * Elimina un usuario por su identificador único.
     *
     * @param id Identificador único del usuario a eliminar.
     */
    @Override
    public void eliminar(Long id) {
        Usuario usuario = entityManager.find(Usuario.class, id);
        entityManager.remove(usuario);
    }

    /**
     * Registra un nuevo usuario en la base de datos o actualiza uno existente.
     *
     * @param usuario El usuario a registrar o actualizar.
     */
    @Override
    public void registrar(Usuario usuario) {
        entityManager.merge(usuario);
    }

    /**
     * Obtiene un usuario por sus credenciales (email y contraseña) verificando la contraseña con Argon2.
     *
     * @param usuario Objeto Usuario que contiene las credenciales (email y contraseña) a verificar.
     * @return El usuario correspondiente a las credenciales si son válidas; de lo contrario, null.
     */
    @Override
    public Usuario obtenerUsuarioPorCredenciales(Usuario usuario) {
        String query = "FROM Usuario WHERE email = :email";
        List<Usuario> lista = entityManager.createQuery(query)
                .setParameter("email", usuario.getEmail())
                .getResultList();

        if (lista.isEmpty()) {
            return null;
        }

        String passwordHashed = lista.get(0).getPassword();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (argon2.verify(passwordHashed, usuario.getPassword())) {
            return lista.get(0);
        }
        return null;
    }

}
