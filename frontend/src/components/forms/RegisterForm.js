import React from 'react';
import { useForm } from 'react-hook-form';
import apiService from '../../services/apiService';

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const response = await apiService.register(data);
    if (response.status === 201) {
      alert('User created successfully');
    } else {
      alert('User already exists');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>
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
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
