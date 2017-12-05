import React from 'react';

const RegisterForm = ({ handleChange, handleSubmit, user }) => {
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
      </div>
      <div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
        />
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

      <button>Register</button>
    </form>
  );
};

export default RegisterForm;
