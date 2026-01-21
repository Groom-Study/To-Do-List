import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import CreateTodoForm from './components/CreateTodoForm';
import { fetchTodos } from './api/todoApi';
import TodoListHeader from './components/TodoListHeader';
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

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="w-full p-6 m-4 bg-white rounded-lg shadow-md lg:w-3/4 lg:max-w-lg">
        <TodoListHeader todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
        <div className="mt-5">
          <CreateTodoForm setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
}
