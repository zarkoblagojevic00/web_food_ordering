package security;

import beans.users.base.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public class JwtUtil {
    final private static Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(User user) {
        Map<String, Object> claims = issueClaims(user);
        return createToken(claims, user.getUsername());
    }

    private Map<String, Object> issueClaims(User user) {
        return new HashMap<String, Object>() {{
           put("id", user.getId());
           put("role", user.getRole());
           put("name", user.getFirstName());
        }};
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                 .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 100))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256).compact();
    }

    public Boolean isValidToken(String token) {
        return !isTokenExpired(token);
    }


//    public Boolean isValidToken(String token, Credentials credentials) {
//        final String username = extractUsername(token);
//        return (username.equals(credentials.getUsername()) && !isTokenExpired(token));
//    }


}
