import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/CreateForm';
import { fetchTodos, deleteSelectedTodos } from './api/todoApi';
import { alertError } from './util';

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const res = await fetchTodos();
        setTodos(res.data);
      } catch (err) {
        alertError(err);
      }
    };
    loadTodos();
  }, []);

  const handleRemoveAll = async () => {
    if (todos.length === 0) return;

    const ids = todos.map((todo) => todo.id);
    try {
      await deleteSelectedTodos({ ids });
      setTodos([]);
    } catch (err) {
      alertError(err);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="w-full p-6 m-4 bg-white rounded-lg shadow-md lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between items-center mb-5 mx-1">
          <h1 className="text-2xl font-bold text-gray-800">할 일 목록</h1>
          <button
            onClick={handleRemoveAll}
            className="text-sm text-gray-400 hover:text-red-500 underline -mb-3"
          >
            모두 삭제
          </button>
        </div>
        <TodoList todos={todos} setTodos={setTodos} />
        <div className="mt-5">
          <TodoForm setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
}
