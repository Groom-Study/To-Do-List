import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { createTodo } from '../api/todoApi';
import { alertError } from '../util';

const CreateTodoForm = ({ setTodos }) => {
  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Escape') {
      setValue('');
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const title = value.trim();
    if (title === '') return;

    try {
      const res = await createTodo({ title });
      const newTodo = res.data;
      setTodos((prev) => [...prev, newTodo]);
      setValue('');
    } catch (err) {
      alertError(err);
    }
  };

  return (
    <form className="flex pt-2" onSubmit={handleCreateSubmit}>
      <input
        type="text"
        name="value"
        className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        autoComplete="off"
        autoFocus
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
      >
        <PlusIcon className="w-5 h-5 mr-1" />
        <span>추가</span>
      </button>
    </form>
  );
};

export default CreateTodoForm;
