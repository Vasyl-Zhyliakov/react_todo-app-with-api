import React from 'react';
import cn from 'classnames';

import { Todo } from '../types/Todo';

type Props = {
  visibleTodos: Todo[];
  deleteOneTodo: (id: number) => void;
  tempTodo: Todo | null;
  toggleTodo: ({ id, title, completed }: Omit<Todo, 'userId'>) => void;
  currentId: number | null;
  setCurrentId: (id: number | null) => void;
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  deleteOneTodo,
  tempTodo,
  toggleTodo,
  currentId,
  setCurrentId,
}) => {
  const handleDelete = (id: number) => {
    setCurrentId(id);
    deleteOneTodo(id);
  };

  const handleToggle = ({ id, title, completed }: Omit<Todo, 'userId'>) => {
    setCurrentId(id);
    toggleTodo({ id, title, completed });
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <div
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
          key={todo.id}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="todo__status-label" htmlFor={todo.id.toString()}>
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              id={todo.id.toString()}
              onClick={() => {
                handleToggle({
                  id: todo.id,
                  title: todo.title,
                  completed: todo.completed,
                });
              }}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(todo.id)}
          >
            ×
          </button>

          {/* overlay will cover the todo while it is being deleted or updated */}
          <div
            data-cy="TodoLoader"
            className={cn('modal overlay', {
              'is-active': todo.id === currentId,
            })}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>

      {tempTodo && (
        <div
          data-cy="Todo"
          className={cn('todo', { completed: tempTodo.completed })}
          key={tempTodo.id}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            className="todo__status-label"
            htmlFor={tempTodo.id.toString()}
          >
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={tempTodo.completed}
              id={tempTodo.id.toString()}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {tempTodo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          {/* overlay will cover the todo while it is being deleted or updated */}
          <div
            data-cy="TodoLoader"
            className={cn('modal overlay', {
              'is-active': tempTodo,
            })}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}
    </section>
  );
};
