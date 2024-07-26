// package com.npp.france.security;

// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import org.springframework.stereotype.Component;
// import javax.servlet.http.HttpServletRequest;

// import java.util.Date;

// @Component
// public class JwtTokenProvider {

//      @Value("${jwt.secret}")
//        private String secretKey;
   
//        @Value("${jwt.expiration}")
//        private long validityInMilliseconds; // 24h
   
//        public String resolveToken(HttpServletRequest req) {
//            String bearerToken = req.getHeader("Authorization");
//            if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
//                return bearerToken.substring(7);
//            }
//            return null;
//        }
   
//        public boolean validateToken(String token) {
//            try {
//                Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
//                return true;
//            } catch (Exception e) {
//                return false;
//            }
//        }
   
//        public UserDetails getUserDetails(String token) {
//            Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
//            String username = claims.getSubject();
//            // Here you should fetch the user from the database
//            // For simplicity, assume a userDetails object is created based on username
//            return new org.springframework.security.core.userdetails.User(username, "", new ArrayList<>());
//        }
   
//        public String createToken(String username) {
//            Claims claims = Jwts.claims().setSubject(username);
//            Date now = new Date();
//            Date validity = new Date(now.getTime() + validityInMilliseconds);
   
//            return Jwts.builder()
//                    .setClaims(claims)
//                    .setIssuedAt(now)
//                    .setExpiration(validity)
//                    .signWith(SignatureAlgorithm.HS256, secretKey)
//                    .compact();
//        }
// }