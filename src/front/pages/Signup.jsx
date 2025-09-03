import React, { useState } from 'react';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('https://friendly-computing-machine-pxw4p4r46rq2r7gp-3001.app.github.dev/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, first_name: firstName, last_name: lastName }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Signup failed');
            }

            setSuccess(data.msg || 'Signup successful! Please check your email for verification.');
        }
        catch (error) {
            setError(error.message || 'Failed to signup');
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
                Create Account
            </h1>
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
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
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
                        onBlur={e => e.target.style.borderColor = '#757d9d'}
                        onFocus={e => e.target.style.borderColor = '#585d7a'}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
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
                        onBlur={e => e.target.style.borderColor = '#757d9d'}
                        onFocus={e => e.target.style.borderColor = '#585d7a'}
                    />
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
                        onBlur={e => e.target.style.borderColor = '#757d9d'}
                        onFocus={e => e.target.style.borderColor = '#585d7a'}
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
                        onBlur={e => e.target.style.borderColor = '#757d9d'}
                        onFocus={e => e.target.style.borderColor = '#585d7a'}
                    />
                    {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
                    {success && <div style={{ color: 'green', marginBottom: 10 }}>{success}</div>}
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
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;