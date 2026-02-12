import React from 'react';

export default function App() {
    const [inputValue, setInputValue] = React.useState('');
    const [toDoList, setTodoList] = React.useState([
        { id: "1", text: "Sample task - click to complete", isCompleted: false },
    ]);

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            const newTodo = {
                id: Date.now().toString(),
                text: inputValue,
                isCompleted: false,
            };
            setTodoList([...toDoList, newTodo]);
            setInputValue('');
        }
    };

    const handleToggleComplete = (id) => {
        setTodoList(
            toDoList.map((todo) =>
                todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            )
        );
    };

    const handleDeleteTodo = (id) => {
        setTodoList(toDoList.filter((todo) => todo.id !== id));
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleAddTodo();
        }
    };

    return (
        <div style={{
            maxWidth: '600px',
            margin: '50px auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>To-Do List</h1>

            {/* Input Box */}
            <div style={{ marginBottom: '20px' }}>
                <textarea
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your task here and press Enter..."
                    style={{
                        width: '100%',
                        minHeight: '80px',
                        padding: '15px',
                        border: '2px solid #333',
                        borderRadius: '8px',
                        fontSize: '16px',
                        resize: 'vertical',
                        boxSizing: 'border-box'
                    }}
                />
                <button
                    onClick={handleAddTodo}
                    style={{
                        marginTop: '10px',
                        padding: '10px 20px',
                        backgroundColor: '#333',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Add Task
                </button>
            </div>

            {/* Todo List */}
            <div style={{
                border: '2px solid #333',
                borderRadius: '8px',
                padding: '20px',
                minHeight: '300px'
            }}>
                {toDoList.length === 0 ? (
                    <p style={{ color: '#999', textAlign: 'center' }}>No tasks yet. Add one above!</p>
                ) : (
                    toDoList.map(todo => (
                        <React.Fragment key={todo.id}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '10px',
                                marginBottom: '10px',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '5px'
                            }}>
                                <input
                                    type="checkbox"
                                    id={todo.id}
                                    checked={todo.isCompleted}
                                    onChange={() => handleToggleComplete(todo.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <label
                                    htmlFor={todo.id}
                                    style={{
                                        flex: 1,
                                        cursor: 'pointer',
                                        textDecoration: todo.isCompleted ? 'line-through' : 'none',
                                        color: todo.isCompleted ? '#999' : '#333'
                                    }}
                                >
                                    {todo.text}
                                </label>
                                <button
                                    onClick={() => handleDeleteTodo(todo.id)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: '#ff4444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>

                            <div className="progress-bar">
                                <div className="progress" style={{
                                    width: `${(toDoList.filter(todo => todo.isCompleted).length / toDoList.length) * 100}%`,
                                    height: '5px',
                                    backgroundColor: '#4caf50',
                                    borderRadius: '5px'
                                }}></div>
                            </div>
                        </React.Fragment>
                    ))
                )}
            </div>
        </div>
    );
}