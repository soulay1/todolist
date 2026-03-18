package com.todo.todobackend.service;

import com.todo.todobackend.model.Todo;
import com.todo.todobackend.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllTodos() {
        return todoRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public Optional<Todo> updateTodo(Long id, Todo updatedTodo) {
        return todoRepository.findById(id).map(todo -> {
            todo.setTitle(updatedTodo.getTitle());
            todo.setDescription(updatedTodo.getDescription());
            todo.setCompleted(updatedTodo.isCompleted());
            return todoRepository.save(todo);
        });
    }

    public Optional<Todo> toggleTodo(Long id) {
        return todoRepository.findById(id).map(todo -> {
            todo.setCompleted(!todo.isCompleted());
            return todoRepository.save(todo);
        });
    }

    public boolean deleteTodo(Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public void deleteCompletedTodos() {
        List<Todo> completed = todoRepository.findByCompleted(true);
        todoRepository.deleteAll(completed);
    }
}
