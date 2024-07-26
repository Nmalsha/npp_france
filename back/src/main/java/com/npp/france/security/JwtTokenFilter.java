// package com.npp.france.security;

// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.Claims;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import javax.servlet.FilterChain;
// import javax.servlet.ServletException;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;
// import java.io.IOException;

// public class JwtTokenFilter extends UsernamePasswordAuthenticationFilter {

//     @Autowired
//     private JwtTokenProvider jwtTokenProvider;

//     public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
//         this.jwtTokenProvider = jwtTokenProvider;
//     }

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
//             throws IOException, ServletException {
//         String token = jwtTokenProvider.resolveToken(request);
//         if (token != null && jwtTokenProvider.validateToken(token)) {
//             UserDetails userDetails = jwtTokenProvider.getUserDetails(token);
//             SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
//                     userDetails, null, userDetails.getAuthorities()));
//         }
//         chain.doFilter(request, response);
//     }
// }
