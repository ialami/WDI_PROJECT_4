import React from 'react';

const UserForm = ({ handleChange, handleSubmit, user }) => {
  return(
    <div>
      <h1>User form</h1>
      <form
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Edit full name"
            value={user.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Edit username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Edit email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <button>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
