import React, { useState } from 'react';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('https://friendly-computing-machine-pxw4p4r46rq2r7gp-3001.app.github.dev/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login success:', data);

        }
        catch (error) {
            setError(error.message || 'Failed to login');
            console.error('Failed to login:', error);
        }
    };


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#b1bad3',
            padding: 25,
            fontFamily: 'Helvetica, sans-serif',
        }}>
            <h1 style={{
                textAlign: 'center',
                color: '#303344',
                fontWeight: '700',
                fontSize: '2.75rem',
                marginBottom: 15,
                textShadow: '2px 2px 3.5px #757d9d',
            }}>

                Account Login</h1>

            <br />

            <div style={{
                backgroundColor: '#8e99c1',
                padding: 35,
                borderRadius: 15,
                maxWidth: 400,
                width: '100%',
                boxShadow: '0 5px 13px #0000001a',
            }}>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{
                            width: '100%',
                            padding: 12,
                            marginBottom: 18,
                            borderRadius: 10,
                            border: '2px solid #c4c4c5ff',
                            fontSize: 16,
                            color: '#585d7a',
                            boxShadow: '0 1px 3px #0000001a',
                            outlineColor: '#585d7a',
                            transition: 'border-color 0.3s',
                        }}
                        onBlur={(e) => e.target.style.borderColor = '#757d9d'}
                        onFocus={(e) => e.target.style.borderColor = '#585d7a'}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: 12,
                            marginBottom: 18,
                            borderRadius: 10,
                            border: '2px solid #c4c4c5ff',
                            fontSize: 16,
                            color: '#585d7a',
                            boxShadow: '0 1px 3px #0000001a',
                            outlineColor: '#585d7a',
                            transition: 'border-color 0.3s',
                        }}

                        onBlur={(e) => e.target.style.borderColor = '#757d9d'}
                        onFocus={(e) => e.target.style.borderColor = '#585d7a'}
                    />

                    {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}

                    <button
                        type='submit'
                        style={{
                            backgroundColor: '#c8cee0',
                            color: '#303344',
                            width: '100%',
                            padding: '16px 0',
                            border: 'none',
                            borderRadius: 12,
                            fontSize: 18,
                            fontWeight: '700',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            boxShadow: '1px 1px 2px #585d7a',
                        }}>

                        Submit
                    </button>

                </form>
            </div>
        </div>
    );
}


export default Login;