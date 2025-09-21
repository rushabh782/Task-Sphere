package com.example.taskmanager.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    private String assigneeName;
    private String assigneeEmail;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dueDate;

    private String status; // e.g., "Pending", "Completed",,"In progress"

    public Task() {}

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getAssigneeName() { return assigneeName; }
    public void setAssigneeName(String assigneeName) { this.assigneeName = assigneeName; }

    public String getAssigneeEmail() { return assigneeEmail; }
    public void setAssigneeEmail(String assigneeEmail) { this.assigneeEmail = assigneeEmail; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

	public Task(String title, String description, String assigneeName, String assigneeEmail, LocalDate dueDate,
			String status) {
		super();
		this.title = title;
		this.description = description;
		this.assigneeName = assigneeName;
		this.assigneeEmail = assigneeEmail;
		this.dueDate = dueDate;
		this.status = status;
	}
    
    
}
