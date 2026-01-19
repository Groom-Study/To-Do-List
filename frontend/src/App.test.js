import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./api/todoApi', () => ({
  fetchTodos: jest.fn().mockResolvedValue({ data: [] }),
  deleteSelectedTodos: jest.fn().mockResolvedValue({ data: [] }),
}));

test('renders learn react link', () => {
  render(<App />);

  const linkElement = screen.getByText(/할 일 목록/i);
  expect(linkElement).toBeInTheDocument();
});
