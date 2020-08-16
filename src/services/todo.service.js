import apiUrl from './api-url';

class TodoService {

  getTodos(username) {
    return fetch(`${apiUrl}todos`).then(res => res.json()).then(todos => todos.filter(todo => todo.username === username));
  }

  createTodo(username, description) {
    const dto = {
      'todoDesc': description,
      'username': username
    };

    return fetch(`${apiUrl}todos`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8' // Indicates the content
      },
      body: JSON.stringify(dto)
    }).then(res => res.json());
  }

  updateTodo(username, description, todoId) {
    const dto = {
      'todoDesc': description,
      'username': username
    };

    return fetch(`${apiUrl}todos/${todoId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8' // Indicates the content
      },
      body: JSON.stringify(dto)
    }).then(res => res.json());
  }

  deleteTodo(todoId) {
    return fetch(`${apiUrl}todos/${todoId}`, {
      method: 'DELETE'
    });
  }
}

export default new TodoService();
