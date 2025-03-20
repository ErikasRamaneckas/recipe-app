import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { validateLogin } from '../apis/userApi';

export default function Login() {
  const { onLogin } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    credentials: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: undefined,
    }));
  };

  async function validateForm() {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length === 0) {
      const isValid = await validateLogin(
        formData.username,
        formData.password
      );

      if (!isValid) {
        newErrors.credentials = 'Wrong credentials';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    console.log(isValid);
    if (isValid) {
      await onLogin(formData.username, formData.password);
    }
  };

  return (
    <main className="main">
      <h1 className="heading">Login Page</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            className="form-input"
          />
          {errors.username && (
            <div className="error-message">{errors.username}</div>
          )}
        </div>

        <div>
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-input"
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
        {errors.credentials && (
          <div className="error-message">{errors.credentials}</div>
        )}
        {/* <Button
          type="submit"
          text="Login"
          className="submit-button"
        /> */}
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </main>
  );
}
