// this still needs to be implemented, and only functions for demonstration purposes.
// in order to run stand alone => replace the content of App.jsx with this code.

import React from 'react';

export default function App() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (username && password) {
            setMessage('Login successful! ✓');
        } else {
            setMessage('Please enter both username and password');
        }
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '100px auto',
            padding: '40px',
            fontFamily: 'Arial, sans-serif',
            border: '2px solid #333',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
        }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Login</h1>
            
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        fontWeight: 'bold' 
                    }}>
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
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
                    <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        fontWeight: 'bold' 
                    }}>
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
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
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}
                >
                    Login
                </button>
            </form>

            {message && (
                <div style={{
                    marginTop: '20px',
                    padding: '10px',
                    backgroundColor: message.includes('successful') ? '#d4edda' : '#f8d7da',
                    color: message.includes('successful') ? '#155724' : '#721c24',
                    border: `1px solid ${message.includes('successful') ? '#c3e6cb' : '#f5c6cb'}`,
                    borderRadius: '5px',
                    textAlign: 'center'
                }}>
                    {message}
                </div>
            )}
        </div>
    );
}