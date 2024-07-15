import React from 'react';
import { useForm } from 'react-hook-form';
import apiService from '../../services/apiService';

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();





  const validateEmail = (email) => {
    const domains = ['gmail.com', 'hotmail.com'];
    const emailDomain = email.split('@')[1];
    return domains.includes(emailDomain) || 'Invalid email domain';
  };





  const onSubmit = async (data) => {
    const response = await apiService.register(data);
    if (response.status === 201) {
      alert('User created successfully');
    } else {
      alert('User already exists');
    }
  };

// Renderizado

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        {...register('email', {
          required: 'Email is required',
          validate: validateEmail,
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="password"
        placeholder="Password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long',
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
