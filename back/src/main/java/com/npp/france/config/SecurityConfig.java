package com.npp.france.config;

import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import com.npp.france.util.JwtRequestFilter;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

     @Autowired
        private JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
//    http
//                .cors().and()
//                .csrf().disable()
//                .authorizeRequests()
//                .antMatchers("/**","/api/events/all", "/api/events/create","/api/send-email ","/api/register", "/api/login").permitAll()
//                .anyRequest().authenticated();

            
http
.csrf(csrf -> csrf.disable())
.cors(cors -> cors.configurationSource(corsConfigurationSource()))
.authorizeHttpRequests(authorize -> authorize
    .antMatchers("/**","/api/events/all", "/api/events/create","/api/send-email ","/api/register", "/api/login").permitAll()
    .anyRequest().authenticated()
)
.sessionManagement(session -> session
    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
);

// Add the JWT request filter before the username/password authentication filter
http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

 return http.build();
             
    }
     @Bean
         public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
             return authenticationConfiguration.getAuthenticationManager();
         }
     
         @Bean
         public PasswordEncoder passwordEncoder() {
              return new BCryptPasswordEncoder();
         }
         @Bean
         public CorsConfigurationSource corsConfigurationSource() {
             CorsConfiguration configuration = new CorsConfiguration();
             configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); 
             configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
             configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
             configuration.setAllowCredentials(true);
     
             UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
             source.registerCorsConfiguration("/**", configuration);
             return source;
         }
   
}



// // package com.npp.france.config;

// // import com.npp.france.security.JwtTokenFilter;
// // import com.npp.france.security.JwtTokenProvider;
// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.context.annotation.Bean;
// // import org.springframework.context.annotation.Configuration;
// // import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.builders.WebSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig extends WebSecurityConfigurerAdapter {

  
//     @Override
//     protected void configure(HttpSecurity http) throws Exception {
//         http
//             .csrf().disable()
//             .authorizeRequests()
//             .antMatchers("/api/auth/**","/api/events/**").permitAll()
//             .anyRequest().authenticated()
//             .and()
            
//     }

//      @Bean
//      public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//    }
//  }