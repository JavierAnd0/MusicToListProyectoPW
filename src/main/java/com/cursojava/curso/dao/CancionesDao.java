package com.cursojava.curso.dao;

import com.cursojava.curso.models.Canciones;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CancionesDao extends JpaRepository <Canciones,Long> {


    List<Canciones> findByUsuarioId(Long id);
}
