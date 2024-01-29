import React from 'react';
import SignUpForm from '../component/signUpForm.js';
import { Link } from 'react-router-dom';
import '../../styles/authForms.css';

const SignUpPage = () => {
  return (
    <div className="form-container">
      <div className="page-title">SignUp</div>
      <SignUpForm />
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default SignUpPage;