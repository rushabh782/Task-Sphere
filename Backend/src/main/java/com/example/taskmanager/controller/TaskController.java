package com.example.taskmanager.controller;

import java.awt.Color;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.service.TaskService;
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class TaskController {

	@Autowired
	private TaskService taskService;
	
	@Autowired
	private TaskRepository taskRepository;
	
    @GetMapping("/sorted")
    public List<Task> getSortedTasks(
            @RequestParam(required = false, defaultValue = "asc") String dueDateOrder
    ) {
        // Sort first by status ascending, then by dueDate (asc or desc)
        Sort sort = Sort.by("status").ascending()
                        .and(Sort.by("dueDate").ascending());
        if (dueDateOrder.equalsIgnoreCase("desc")) {
            sort = Sort.by("status").ascending()
                       .and(Sort.by("dueDate").descending());
        }

        return taskRepository.findAll(sort);
    }
	
	@GetMapping("/export/pdf")
	public void exportToPDF(HttpServletResponse response) throws Exception {
	    response.setContentType("application/pdf");
	    response.setHeader("Content-Disposition", "attachment; filename=tasks.pdf");

	    List<Task> tasks = taskRepository.findAll();

	    Document document = new Document();
	    PdfWriter.getInstance(document, response.getOutputStream());
	    document.open();

	    document.add(new Paragraph("Task Manager - Task List\n\n"));

	    PdfPTable table = new PdfPTable(5);
	    table.setWidthPercentage(100);
	    table.setSpacingBefore(10f);
	    table.setSpacingAfter(10f);

	    // Table header
	    Stream.of("Title", "Assignee", "Email", "Due Date", "Status")
	          .forEach(columnTitle -> {
	              PdfPCell header = new PdfPCell();
	              header.setPhrase(new Phrase(columnTitle));
	              header.setBackgroundColor(Color.LIGHT_GRAY);
	              table.addCell(header);
	          });

	    // Table rows
	    for (Task task : tasks) {
	        table.addCell(task.getTitle());
	        table.addCell(task.getAssigneeName() != null ? task.getAssigneeName() : "N/A");
	        table.addCell(task.getAssigneeEmail() != null ? task.getAssigneeEmail() : "N/A");
	        table.addCell(task.getDueDate() != null ? task.getDueDate().toString() : "Not set");
	        table.addCell(task.getStatus());
	    }

	    document.add(table);
	    document.close();
	}

	
	@GetMapping
	public List<Task> getAllTasks(){
		return taskService.getAllTasks();
	}
	
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.createTask(task));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        boolean deleted = taskService.deleteTask(id);
        return deleted ? ResponseEntity.noContent().build()
                       : ResponseEntity.notFound().build();
    }
}
