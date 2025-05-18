package org.ly.movie.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import javax.crypto.SecretKey;

public class JwtUtil {
    // 建议后续将密钥放到配置文件
    private static final String SECRET = "movie-ticketing-system-jwt-secret-key-123456";
    private static final long EXPIRATION = 86400000L; // 24小时
    private static final SecretKey KEY = Keys.hmacShaKeyFor(SECRET.getBytes());

    // 生成JWT
    public static String generateToken(String subject) {
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    // 解析JWT
    public static Claims parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
} 