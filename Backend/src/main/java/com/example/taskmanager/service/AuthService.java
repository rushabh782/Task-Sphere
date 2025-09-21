package com.example.taskmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

@Service
public class AuthService {
	
	@Autowired
	private UserRepository userRepository;
	
	public String register(User user) {
		if(userRepository.findByUsername(user.getUsername()) != null){
			return "Username already taken";
		}
		userRepository.save(new User(user.getUsername(),user.getPassword()));
		return "User registered successfully";
	}
	
	public String login(User user,HttpSession session) {
		User existing = userRepository.findByUsername(user.getUsername());
		if(existing != null && existing.getPassword().equals(user.getPassword())) {
			session.setAttribute("user", existing);
			return "Login successfull";
		}
		return null;
	}
	
	public User getCurrentUser(HttpSession session) {
		return (User) session.getAttribute("user");
	}
	
	public String logout(HttpSession session) {
		session.invalidate();
		return "Logged out successfully";
	}
}
