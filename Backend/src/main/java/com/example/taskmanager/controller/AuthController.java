package com.example.taskmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.taskmanager.model.User;
import com.example.taskmanager.service.AuthService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        String result = authService.register(user);
        if ("Username already taken".equals(result)) {
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user, HttpSession session) {
        String result = authService.login(user, session);
        if (result == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        User currentUser = authService.getCurrentUser(session);
        if (currentUser == null) {
            return ResponseEntity.status(401).body("Not logged in");
        }
        return ResponseEntity.ok(currentUser);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        return ResponseEntity.ok(authService.logout(session));
    }
}
