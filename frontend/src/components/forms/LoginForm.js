import React from 'react'; // Importa React
import { useForm } from 'react-hook-form'; // Importa el hook useForm de react-hook-form
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de react-router-dom
import apiService from '../../services/apiService'; // Importa el servicio API personalizado

const LoginForm = () => {
  // Desestructura los métodos y propiedades necesarios de useForm
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // useNavigate es un hook de react-router-dom que te permite navegar a diferentes rutas
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (data) => {
    // Llama a la función login del servicio API con los datos del formulario
    const response = await apiService.login(data);
    // Si la respuesta es exitosa, navega a la página /loggedin
    if (response.status === 200) {
      navigate('/loggedin');
    } else {
      // Si hay un error, muestra un mensaje de alerta
      alert('Invalid credentials');
    }
  };

  return (
    // El componente form llama a handleSubmit al enviarse, que a su vez llama a onSubmit
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      {/* Campo de entrada para el email con validación */}
      <input
        type="email"
        placeholder="Email"
        {...register('email', { required: 'Email is required' })}
      />
      {/* Muestra un mensaje de error si hay un error en el campo email */}
      {errors.email && <span>{errors.email.message}</span>}
      
      {/* Campo de entrada para la contraseña con validación */}
      <input
        type="password"
        placeholder="Password"
        {...register('password', { required: 'Password is required' })}
      />
      {/* Muestra un mensaje de error si hay un error en el campo password */}
      {errors.password && <span>{errors.password.message}</span>}
      
      {/* Botón para enviar el formulario */}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm; // Exporta el componente LoginForm para ser utilizado en otras partes de la aplicación
