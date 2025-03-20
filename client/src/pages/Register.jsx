import { useState } from 'react';
import { getUserByUsername, postUser } from '../apis/userApi';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function checkIfUsernameExists(username) {
    return await getUserByUsername(username);
  }

  async function validateForm() {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else {
      const usernameExists = await checkIfUsernameExists(
        formData.username
      );
      if (usernameExists) {
        newErrors.username = 'Username is already taken';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password =
        'Password must be at least 6 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!(await validateForm())) {
      return;
    }

    setFormData({ username: '', password: '' });
    const postObj = {
      username: formData.username,
      password: formData.password,
    };

    await postUser(postObj);
  }

  return (
    <main className="main">
      <h1 className="heading">Registration Page</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <label className="form-label" htmlFor="username">
            Username:
          </label>
          <input
            id="username"
            name="username"
            className="form-input"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
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
            className="form-input"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
        <button className="submit-button" type="submit">
          Register
        </button>
      </form>
    </main>
  );
}
