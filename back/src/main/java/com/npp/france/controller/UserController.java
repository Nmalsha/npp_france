package com.npp.france.controller;

import com.npp.france.entity.User;
import com.npp.france.repository.UserRepository;
import com.npp.france.service.UserService;
import com.npp.france.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;


    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {    

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        List<String> roles = user.getRoles();
        if (roles == null || roles.isEmpty()) {
            // Set default role if none provided (optional, based on your app logic)
            roles = List.of("ROLE_USER");
            user.setRoles(roles);
        }
        
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

       // Get user by ID
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
   // Get all users
   @GetMapping("/user/all")
   public List<User> getAllUsers() {
       return userService.getAllUsers();
   }
    // Update user by ID
    // @PutMapping("/{id}")
    // public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
    //     Optional<User> user = userService.getUserById(id);
    //     if (user.isPresent()) {
    //         User existingUser = user.get();
    //         existingUser.setNickname(userDetails.getNickname());
    //         existingUser.setEmail(userDetails.getEmail());
    //         existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
    //         User updatedUser = userService.updateUser(existingUser);
    //         return ResponseEntity.ok(updatedUser);
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }

    // Delete user by ID
    // @DeleteMapping("/user/{id}")
    // public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    //     if (userService.deleteUser(id)) {
    //         return ResponseEntity.noContent().build();
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginUser) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginUser.getEmail(), loginUser.getPassword())
            );
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    
        // Load user details
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginUser.getEmail());
    
        // Generate JWT
        String jwt = jwtUtil.generateToken(userDetails);
    
        // Fetch user details from repository
        Optional<User> optionalUser = userRepository.findByEmail(loginUser.getEmail());
        
        if (optionalUser.isPresent()) {
            // User existingUser = optionalUser.get();
            // String nickname = existingUser.getNickname();
            // Long id = existingUser.getId();
            // System.out.println("Retrieved nickname: " + nickname);
            // System.out.println("Retrieved connected user Id: " + id);
            // // Return response with JWT and nickname

        

            return ResponseEntity.ok(new JwtResponse(jwt));
        } else {
            // Handle case where user is not found (optionalUser is empty)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        
    }
    
    
}