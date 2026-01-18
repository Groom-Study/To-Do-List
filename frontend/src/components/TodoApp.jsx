import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import Modal from './Modal';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const API_BASE_URL = 'http://localhost:3000/api/schedules';
    const fetchTodos = async () => {
        try {
            const response = await fetch(API_BASE_URL);
            const data = await response.json();
            const formattedData = data.map(item => ({
                id: item.id,
                text: item.title,               
                description: item.description,
                completed: item.is_completed,  
                dueDate: item.due_date         
            }));

            setTodos(formattedData);
        } catch (e) {
            console.error('불러오기 실패', e);
        }
    }

    const [formData, setFormData] = useState({
        text: '',
        description: '',
        dueDate: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        if (!formData.text.trim()) return;
        const payload = {
            title: formData.text,
            description: formData.description,
            due_date: formData.dueDate || new Date().toISOString().split('T')[0] // 날짜 필수라서 없으면 오늘 날짜
        };

        try {
            if (editingId) {
                const response = await fetch(`${API_BASE_URL}/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (response.ok) fetchTodos();
            } else {
                const response = await fetch(API_BASE_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (response.ok) fetchTodos();
            }
            closeModal();
        } catch (error) {
            console.error("저장 실패:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) fetchTodos();
        } catch (error) {
            console.error("삭제 실패:", error);
        }
    };

    const toggleTodo = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}/done`, {
                method: 'PATCH'
            });
            if (response.ok) fetchTodos();
        } catch (error) {
            console.error("토글 실패:", error);
        }
    };
    

    const clearCompleted = async () => {
        const completedTodos = todos.filter(t => t.completed);
        try {
            await Promise.all(
                completedTodos.map(todo => 
                    fetch(`${API_BASE_URL}/${todo.id}`, { method: 'DELETE' })
                )
            );
            fetchTodos();
        } catch (error) {
            console.error("일괄 삭제 실패:", error);
        }
    };

    const openAddModal = () => {
        setFormData({ text: '', description: '', dueDate: '' });
        setEditingId(null);
        setIsModalOpen(true);
    };

    const openEditModal = (todo) => {
        setFormData({
            text: todo.text,
            description: todo.description || '',
            dueDate: todo.dueDate ? todo.dueDate.split('T')[0] : ''
        });
        setEditingId(todo.id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ text: '', description: '', dueDate: '' });
    };

    return (
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/20">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        오늘의 할일
                    </h1>
                    <button
                        onClick={openAddModal}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        할일 추가
                    </button>
                </div>

                <div className="space-y-3">
                    {todos.length === 0 && (
                        <p className="text-center text-gray-400 py-4">할일 없음</p>
                    )}
                    {todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onDelete={deleteTodo}
                            onToggle={toggleTodo}
                            onEdit={openEditModal}
                        />
                    ))}
                </div>
            </div>

            <div className="px-6 py-4 bg-black/20 text-xs text-gray-400 flex justify-between items-center">
                <span>{todos.filter(t => !t.completed).length} 개 남음</span>
                {todos.some(t => t.completed) && (
                    <button
                        onClick={clearCompleted}
                        className="hover:text-white transition-colors"
                    >
                        완료된 할 일 지우기
                    </button>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-2xl font-bold text-white mb-4">
                    {editingId ? '할 일 수정하기' : '새로운 할 일 추가'}
                </h2>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">할 일</label>
                        <input
                            type="text"
                            value={formData.text}
                            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                            placeholder=""
                            autoFocus
                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-gray-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">설명</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder=""
                            rows="3"
                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-gray-500 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">마감일</label>
                        <input
                            type="date"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-gray-500 scheme-dark"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={!formData.text.trim()}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors font-medium shadow-lg shadow-indigo-500/30"
                        >
                            {editingId ? '수정하기' : '추가하기'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default TodoApp;