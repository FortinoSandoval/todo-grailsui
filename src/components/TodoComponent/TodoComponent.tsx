import React, {useEffect, useState, useCallback} from 'react';
import TodoService from '../../services/todo.service';

import styles from './TodoComponent.module.scss';

type TodoProps = {
  username: string
}

const TodoComponent = ({username}: TodoProps) => {
  const [todos, setTodos] = useState();
  const [newTodoText, setNewTodoText] = useState('Add todo');

  const loadTodos = useCallback(() => {
    TodoService.getTodos(username).then(todos => {
      setTodos(todos);
    });
  }, [username]);

  const onUpdate = (todo, {currentTarget}) => {
    const {innerText} = currentTarget;

    if (todo.todoDesc !== innerText) {
      TodoService.updateTodo(username, innerText, todo.id);
    }
  };

  const onDelete = todoId => {
    TodoService.deleteTodo(todoId).then(() => {
      loadTodos();
    });
  };

  const onCreate = ({currentTarget}) => {
    const {innerText} = currentTarget;
    setNewTodoText(innerText);

    if (innerText.trim() !== 'Add todo') {
      TodoService.createTodo(username, innerText).then(() => {
        loadTodos();
        setNewTodoText('Add todo');
      });
    }
  };

  const keyCapture = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return (
    <div>
      <div className={styles.todos}>
        <p>
          TODOS:
        </p>
        {todos && todos.map(todo => (
          <div className={styles.todo} key={todo.id}>
            <span className={styles.deleteX}
                  onClick={() => onDelete(todo.id)}>X</span>
            <p contentEditable onBlur={(e) => onUpdate(todo, e)}
               suppressContentEditableWarning>
              {todo.todoDesc}
            </p>
          </div>
        ))}
        <div className={styles.todo}>
          <span className={styles.deleteX}
                style={{visibility: 'hidden'}}>X</span>
          <p contentEditable onBlur={(e) => onCreate(e)}
             suppressContentEditableWarning onKeyUp={keyCapture}>
            {newTodoText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;
