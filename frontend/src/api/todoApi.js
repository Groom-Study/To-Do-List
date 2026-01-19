import client from './client';

export const fetchTodos = () => client.get('/todos');

export const createTodo = (data) => client.post('/todos', data);

export const updateTodo = (id, data) => client.put(`/todos/${id}`, data);

export const reorderTodo = (data) => client.patch(`/todos/reorder`, data);

export const deleteTodo = (id) => client.delete(`/todos/${id}`);

export const deleteSelectedTodos = (data) => client.delete('/todos', { data });

export const fetchTodo = (id) => client.get(`/todos/${id}`);
