
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const validateForm = (): boolean => {
    const errors: string[] = [];
    
    if (!email) {
      errors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push('Email is invalid');
    }
    
    if (!password) {
      errors.push('Password is required');
    } else if (password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
    
    if (isRegister) {
      if (!name) {
        errors.push('Name is required');
      } else if (name.length < 2) {
        errors.push('Name must be at least 2 characters');
      }
      
      if (!confirmPassword) {
        errors.push('Password confirmation is required');
      } else if (password !== confirmPassword) {
        errors.push('Passwords do not match');
      }
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      if (isRegister) {
        const { data, error } = await signUp(email, password, name);
        if (error) throw error;
        
        if (data.user && !data.user.email_confirmed_at) {
          setSuccess('Please check your email and click the confirmation link to complete registration.');
        } else if (data.user) {
          setSuccess('Account created successfully! You can now sign in.');
          setIsRegister(false);
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setName('');
        }
      } else {
        const { data, error } = await signIn(email, password);
        if (error) throw error;
        
        if (data.user) {
          setSuccess('Successfully signed in! Redirecting...');
          setTimeout(() => navigate('/profile'), 1500);
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      
      // Handle specific error messages
      let errorMessage = 'An error occurred during authentication';
      
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (error.message?.includes('User already registered')) {
        errorMessage = 'An account with this email already exists. Please sign in instead.';
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = 'Please check your email and click the confirmation link before signing in.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
    setValidationErrors([]);
  };

  const switchMode = () => {
    setIsRegister(!isRegister);
    clearMessages();
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  };

  return (
    <>
      <Navigation />
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card>
              <Card.Header>
                <h4 className="mb-0 text-center">
                  🧟‍♂️ {isRegister ? 'Join the Fight Against Zombies' : 'Enter the Battle'}
                </h4>
              </Card.Header>
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                {validationErrors.length > 0 && (
                  <Alert variant="warning">
                    <ul className="mb-0">
                      {validationErrors.map((err, index) => (
                        <li key={index}>{err}</li>
                      ))}
                    </ul>
                  </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                  {isRegister && (
                    <Form.Group className="mb-3">
                      <Form.Label>Warrior Name *</Form.Label>
                      <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your warrior name"
                        disabled={loading}
                        className={validationErrors.some(err => err.includes('Name')) ? 'is-invalid' : ''}
                      />
                    </Form.Group>
                  )}
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address *</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={loading}
                      className={validationErrors.some(err => err.includes('Email')) ? 'is-invalid' : ''}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Password *</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      disabled={loading}
                      className={validationErrors.some(err => err.includes('Password')) ? 'is-invalid' : ''}
                    />
                    {isRegister && (
                      <Form.Text className="text-muted">
                        Password must be at least 6 characters long.
                      </Form.Text>
                    )}
                  </Form.Group>

                  {isRegister && (
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password *</Form.Label>
                      <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        disabled={loading}
                        className={validationErrors.some(err => err.includes('confirmation') || err.includes('match')) ? 'is-invalid' : ''}
                      />
                    </Form.Group>
                  )}
                  
                  <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
                    {loading ? 'Loading...' : (isRegister ? 'Join the Battle' : 'Enter the Battle')}
                  </Button>
                </Form>
                {!isRegister && (
                  <div className="text-center mb-3">
                    <a href="/forgot-password">Forgot your password?</a>
                  </div>
                )}
                
                <div className="text-center">
                  <Button
                    variant="link"
                    onClick={switchMode}
                    style={{ color: '#8b5cf6' }}
                    disabled={loading}
                  >
                    {isRegister 
                      ? 'Already a warrior? Sign in here' 
                      : "New recruit? Join the fight"}
                  </Button>
                </div>

                {isRegister && (
                  <div className="mt-3">
                    <small className="text-muted">
                      <strong>Note:</strong> You'll receive a confirmation email after registration. 
                      Click the link in the email to activate your account.
                    </small>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
