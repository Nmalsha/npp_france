package com.npp.france.controller;

import com.npp.france.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") 
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-email")
    public void sendEmail(@RequestBody Map<String, String> formData) {
        String name = formData.get("name");
        String phone = formData.get("phone");
        String email = formData.get("email");
        String question = formData.get("question");

        String subject = "New Contact Form Submission";
        String text = String.format("Name: %s\nPhone: %s\nEmail: %s\nQuestion: %s", name, phone, email, question);

        emailService.sendSimpleMessage("your-email@gmail.com", subject, text);
    }
}