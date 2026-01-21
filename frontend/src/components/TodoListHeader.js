import { deleteSelectedTodos } from '../api/todoApi';
import { alertError } from '../util';

export default function TodoListHeader({ todos, setTodos }) {
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
    <div className="flex justify-between items-center mb-5 mx-1">
      <h1 className="text-2xl font-bold text-gray-800">할 일 목록</h1>
      <button
        onClick={handleRemoveAll}
        className="text-sm text-gray-400 hover:text-red-500 underline -mb-3"
      >
        모두 삭제
      </button>
    </div>
  );
}
