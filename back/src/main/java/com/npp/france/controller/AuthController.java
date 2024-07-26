// package com.npp.france.controller;

// import com.npp.france.entity.User;
// import com.npp.france.service.UserService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.http.ResponseEntity;
// import org.springframework.http.HttpStatus;

// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {

//      @Autowired
//         private UserService userService;
    
//         @PostMapping("/login")
//         public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
//             String token = userService.authenticate(email, password);
//             if (token != null) {
//                 return ResponseEntity.ok(new JwtResponse(token));
//             }
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
//         }
    
//         @PostMapping("/register")
//         public ResponseEntity<?> register(@RequestBody User user) {
//             User savedUser = userService.saveUser(user);
//             return ResponseEntity.ok(savedUser);
//         }
// }