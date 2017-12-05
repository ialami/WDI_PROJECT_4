import React from 'react';

const LoginForm = ({ handleChange, handleSubmit, user, errors }) => {

  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
        />
        {errors.email && <small>{errors.email}</small>}
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
        />
        {errors.password && <small>{errors.password}</small>}
      </div>
      <button
        disabled={formInvalid}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
