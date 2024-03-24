package com.nortal.vacation.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nortal.vacation.user.User;
import com.nortal.vacation.user.UserDto;
import com.nortal.vacation.user.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtils {
    private final UserRepository userRepository;

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    @Value("${security.jwt.token.expire-length: " + 345600 * 1000 + "}")
    private final long tokenValidity = 345600 * 1000;
    // 6d

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }
    public String createToken(String username) throws Exception {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + tokenValidity);

        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new BadCredentialsException(""));

        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        String userPayload = new ObjectMapper().writeValueAsString(UserDto.of(user));

        return JWT
            .create()
            .withSubject(username)
            .withClaim("user", userPayload)
            .withIssuedAt(now)
            .withExpiresAt(expirationDate).sign(algorithm);
    }

    public String getUsername(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT jwt = verifier.verify(token);
        return jwt.getSubject();
    }

    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public boolean validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm).build();
        verifier.verify(token);
        return true;
    }
}
