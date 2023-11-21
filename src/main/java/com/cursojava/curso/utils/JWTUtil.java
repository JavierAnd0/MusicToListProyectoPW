package com.cursojava.curso.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

/**
 * Utilidad para la creación, validación y lectura de JSON Web Tokens (JWT).
 */
@Component
public class JWTUtil {

    @Value("${security.jwt.secret}")
    private String key;

    @Value("${security.jwt.issuer}")
    private String issuer;

    @Value("${security.jwt.ttlMillis}")
    private long ttlMillis;

    private final Logger log = LoggerFactory.getLogger(JWTUtil.class);

    /**
     * Crea un nuevo token JWT.
     *
     * @param id      Identificador único para el token.
     * @param subject Sujeto del token (por ejemplo, el nombre de usuario).
     * @return Token JWT generado.
     */
    public String create(String id, String subject) {
        // Algoritmo de firma utilizado para firmar el token JWT
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        // Firma el JWT con el secreto de la clave API
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(key);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        // Configura las reclamaciones del JWT
        JwtBuilder builder = Jwts.builder().setId(id).setIssuedAt(now).setSubject(subject).setIssuer(issuer)
                .signWith(signatureAlgorithm, signingKey);

        if (ttlMillis >= 0) {
            long expMillis = nowMillis + ttlMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }

        // Construye el JWT y lo serializa a una cadena compacta y segura para URL
        return builder.compact();
    }

    /**
     * Método para validar y leer el JWT, devolviendo el valor del sujeto.
     *
     * @param jwt Token JWT a validar y leer.
     * @return Valor del sujeto extraído del token.
     */
    public String getValue(String jwt) {
        // Esta línea lanzará una excepción si no es un JWS firmado (como se espera)
        Claims claims = Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(key))
                .parseClaimsJws(jwt).getBody();

        return claims.getSubject();
    }

    /**
     * Método para validar y leer el JWT, devolviendo el valor del identificador único.
     *
     * @param jwt Token JWT a validar y leer.
     * @return Valor del identificador único extraído del token.
     */
    public String getKey(String jwt) {
        // Esta línea lanzará una excepción si no es un JWS firmado (como se espera)
        Claims claims = Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(key))
                .parseClaimsJws(jwt).getBody();

        return claims.getId();
    }
}
