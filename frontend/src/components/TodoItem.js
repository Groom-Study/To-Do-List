import React, { useState } from 'react';
import { updateTodo, deleteTodo } from '../api/todoApi';
import { PencilSquareIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { alertError } from '../util';

const TodoItem = React.memo(({ id, title, done, todos, setTodos, provided, snapshot }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    } catch (err) {
      alertError(err);
    }
  };

  const handleToggleDone = async (id) => {
    try {
      const res = await updateTodo(id, { done: !done });
      const newTodos = todos.map((todo) => {
        if (todo.id === res.data.id) {
          todo = res.data;
        }
        return todo;
      });
      setTodos(newTodos);
    } catch (err) {
      alertError(err);
    }
  };

  const handleEditInputChange = (e) => {
    console.log(e);
    setEditedTitle(e.target.value);
  };

  const handleEditKeydown = (e) => {
    if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const handleEditSave = async (e) => {
    e.preventDefault();

    try {
      const res = await updateTodo(id, { title: editedTitle });
      const newTodos = todos.map((todo) => {
        if (todo.id === res.data.id) {
          todo = res.data;
        }
        return todo;
      });
      setTodos(newTodos);
      setIsEditing(false);
    } catch (err) {
      alertError(err);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedTitle(title);
  };

  if (isEditing) {
    return (
      <div className="flex items-center justify-between w-full px-4 py-2 my-2 bg-white border rounded-md shadow-sm">
        <div className="flex-1 mr-2">
          <form onSubmit={handleEditSave} className="w-full">
            <input
              type="text"
              value={editedTitle}
              className="w-full px-2 py-1 text-gray-700 border rounded focus:outline-none focus:border-blue-400"
              onChange={handleEditInputChange}
              onKeyDown={handleEditKeydown}
              autoFocus
            />
          </form>
        </div>
        <div className="flex gap-2">
          <button className="text-blue-500 hover:text-blue-700" onClick={handleEditSave}>
            <CheckIcon className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-gray-600" onClick={handleEditCancel}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className={`${snapshot.isDragging ? 'bg-blue-50' : 'bg-white'} flex items-center justify-between w-full px-4 py-3 my-2 text-gray-600 border rounded-md`}
      >
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={done}
            onChange={() => handleToggleDone(id)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className={done ? 'line-through text-gray-400' : 'text-gray-700'}>{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-blue-500" onClick={() => setIsEditing(true)}>
            <PencilSquareIcon className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-red-500" onClick={() => handleDelete(id)}>
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }
});

export default TodoItem;
