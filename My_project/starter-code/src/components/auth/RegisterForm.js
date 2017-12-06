import React from 'react';

const RegisterForm = ({ handleChange, handleSubmit, user, errors }) => {

  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="fullName"
          placeholder="Full name"
          onChange={handleChange}
          value={user.fullName}
        />
      </div>
      <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={user.username}
        />
        { errors && <small>{errors.username}</small>}
      </div>
      <div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
        />
        { errors && <small>{errors.email}</small>}
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
        />
        { errors && <small>{errors.password}</small>}
      </div>
      <div>
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={user.passwordConfirmation}
        />
      </div>

      <button
        disabled={formInvalid}
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
