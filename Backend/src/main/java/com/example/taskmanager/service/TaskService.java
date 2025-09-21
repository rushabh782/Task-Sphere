package com.example.taskmanager.service;

import java.util.List;
import java.util.Optional;

import org.apache.catalina.startup.Tomcat.ExistingStandardWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;

@Service
public class TaskService {
	
	@Autowired
	private TaskRepository taskrepo;
	
	public List<Task> getAllTasks(){
		return taskrepo.findAll();
	}
	
	public Optional<Task> getTaskById(Long id){
		return taskrepo.findById(id);
	}
	
	public Task createTask(Task task) {
		return taskrepo.save(task);
	}
	
	public Optional<Task> updateTask(Long id,Task task){
		return taskrepo.findById(id).map(existing ->{
			existing.setTitle(task.getTitle());
			existing.setDescription(task.getDescription());
			existing.setAssigneeName(task.getAssigneeName());
			existing.setAssigneeEmail(task.getAssigneeEmail());
			existing.setDueDate(task.getDueDate());
			existing.setStatus(task.getStatus());
			return taskrepo.save(existing);
		});
	}
	
	public boolean deleteTask(Long id) {
		return taskrepo.findById(id).map(existing ->{
			taskrepo.deleteById(id);
			return true;
		}).orElse(false);
	}
	
}
