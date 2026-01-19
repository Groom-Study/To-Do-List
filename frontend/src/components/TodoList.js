import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TodoItem from './TodoItem';
import { reorderTodo } from '../api/todoApi';
import { alertError } from '../util';

const TodoList = React.memo(({ todos, setTodos }) => {
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const srcTodo = todos[result.source.index];
    const dstTodo = todos[result.destination.index];

    if (srcTodo.id === dstTodo.id) return;

    try {
      console.debug('dnd result:', result);
      await reorderTodo([
        { id: srcTodo.id, order: dstTodo.order },
        { id: dstTodo.id, order: srcTodo.order },
      ]);

      const newTodos = todos.slice();

      // 1. 변경시키는 아이템을 배열에서 삭제
      // 2. 반환 값으로 삭제된 아이템을 저장합니다.
      const [reorderItem] = newTodos.splice(result.source.index, 1);
      // 삭제된 아이템을 원하는 자리에 다시 삽입합니다.
      newTodos.splice(result.destination.index, 0, reorderItem);

      setTodos(newTodos);
    } catch (err) {
      alertError(err);
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided, snapshot) => (
                    <TodoItem
                      key={todo.id}
                      id={todo.id}
                      title={todo.title}
                      done={todo.done}
                      todos={todos}
                      setTodos={setTodos}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});

export default TodoList;
