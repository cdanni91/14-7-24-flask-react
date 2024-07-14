import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await apiService.login(data);
    if (response.status === 200) {
      navigate('/loggedin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        {...register('email', { required: 'Email is required' })}
      />
      {errors.email && <span>{errors.email.message}</span>}
      <input
        type="password"
        placeholder="Password"
        {...register('password', { required: 'Password is required' })}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
