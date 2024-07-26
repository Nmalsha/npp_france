// package com.npp.france.service;

// import com.npp.france.entity.User;
// import com.npp.france.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import com.npp.france.security.JwtTokenProvider;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

// @Service
// public class UserService {

//       @Autowired
//       private UserRepository userRepository;
  
//       @Autowired
//       private JwtTokenProvider jwtTokenProvider;
  
//       @Autowired
//       private BCryptPasswordEncoder passwordEncoder;
  
//       public String authenticate(String email, String password) {
//           User user = userRepository.findByEmail(email);
//           if (user != null && passwordEncoder.matches(password, user.getPassword())) {
//               return jwtTokenProvider.createToken(user.getEmail());
//           }
//           return null;
//       }
  
//       public User saveUser(User user) {
//           user.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypt the password
//           return userRepository.save(user);
//       }
// }