import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HabitDo from './pages/HabitAndToDo';

export default function App() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    const [toDoList, setTodoList] = React.useState([
        { id: "1", text: "Sample task - click to complete", isCompleted: false },
    ]);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (username && password) {
            setIsLoggedIn(true);
        }
    };

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
    }

    const handleDeleteTodo = (id) => {
        setTodoList(toDoList.filter((todo) => todo.id !== id));
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleAddTodo();
        }
    };

    if (!isLoggedIn) {
      return (
            <div style={{
                maxWidth: '400px',
                margin: '100px auto',
                padding: '40px',
                fontFamily: 'Arial, sans-serif',
                border: '2px solid #333',
                borderRadius: '8px'
            }}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Login</h1>
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #333',
                                borderRadius: '5px',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #333',
                                borderRadius: '5px',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#333',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
    );
}

        return (
            <div style={{
                maxWidth: '600px',
                margin: '50px auto',
                padding: '20px',
                fontFamily: 'Arial, sans-serif'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h1>To-Do List</h1>
                    <button
                        onClick={() => setIsLoggedIn(false)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#ff4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Logout
                    </button>
                </div>
    
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
    
                    <div className="habit-do-container">
                        <BrowserRouter>
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<HabitDo />} />
                            </Routes>
                        </BrowserRouter>
                    </div>
                </div>
            </div>
        );
    }