import React from 'react';

const TodoItem = ({ todo, onDelete, onToggle, onEdit }) => {

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
    };

    return (
        <div className={`group flex gap-3 p-3 rounded-lg bg-gray-800/40 hover:bg-gray-800/60 transition-all border border-transparent ${todo.completed ? 'opacity-60' : 'hover:border-gray-700'}`}>
            <div className="pt-1">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle(todo.id);
                    }}
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${todo.completed
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-gray-500 hover:border-indigo-400'
                        }`}
                >
                    {!!todo.completed && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="flex-1 min-w-0">
                <div
                    onClick={() => onEdit(todo)}
                    className="cursor-pointer group/text"
                >
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-start justify-between gap-2">
                            <span
                                className={`block text-base font-medium transition-all ${todo.completed ? 'text-gray-500 line-through decoration-gray-600' : 'text-gray-100 group-hover/text:text-white'
                                    }`}
                            >
                                {todo.text}
                            </span>

                            {todo.dueDate && (
                                <span className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${todo.completed ? 'bg-gray-700 text-gray-500' : 'bg-indigo-500/20 text-indigo-300'
                                    }`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    {formatDate(todo.dueDate)}
                                </span>
                            )}
                        </div>

                        {todo.description && (
                            <p className={`text-sm leading-relaxed ${todo.completed ? 'text-gray-600' : 'text-gray-400 group-hover/text:text-gray-300'}`}>
                                {todo.description}
                            </p>
                        )}


                    </div>
                </div>
            </div>

            <div className="flex items-start gap-1 opacity-0 group-hover:opacity-100 transition-all self-start">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(todo);
                    }}
                    className="p-1.5 text-gray-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(todo.id);
                    }}
                    className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
