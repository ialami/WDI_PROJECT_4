import React from 'react';
import BackButton from '../utility/BackButton';

const UserEditPasswordForm = ({ handleChange, handleSubmit, passwords }) => {
  return(
    <div>
      <h1>Form</h1>
      <BackButton />
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="oldPassword"
              name="oldPassword"
              placeholder="Enter old password"
              value={passwords.oldPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
              value={passwords.newPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="Re-enter new password"
              value={passwords.passwordConfirmation}
              onChange={handleChange}
            />
          </div>
          <div>
            <button>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditPasswordForm;
