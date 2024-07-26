//  package com.npp.france.entity;

//  import javax.persistence.*;
// import javax.persistence.Id;
// import javax.persistence.GeneratedValue;
// import javax.persistence.GenerationType;
// import com.fasterxml.jackson.annotation.JsonIdentityInfo;

// @Entity
// @Table(name = "users")
// public class User {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String email;
//     private String password;


//      @Column
//     private String roles; 
//     // Getters and setters
//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public String getEmail() {
//         return email;
//     }

//     public void setEmail(String email) {
//         this.email = email;
//     }

//     public String getPassword() {
//         return password;
//     }

//     public void setPassword(String password) {
//         this.password = password;
//     }
//     public String getRoles() {
//         return roles;
//     }

//     public void setRoles(String roles) {
//         this.roles = roles;
//     }

//     // Helper methods for roles
//     public void addRole(String role) {
//         if (roles == null || roles.isEmpty()) {
//             roles = role;
//         } else {
//             roles += "," + role;
//         }
//     }

//     public boolean hasRole(String role) {
//         if (roles != null && !roles.isEmpty()) {
//             String[] roleArray = roles.split(",");
//             for (String r : roleArray) {
//                 if (r.equals(role)) {
//                     return true;
//                 }
//             }
//         }
//         return false;
//     }
// } 
