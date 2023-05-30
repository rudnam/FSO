/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import Error from './Error';

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  errorMessage,
}) => {
  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
  };

  LoginForm.defaultProps = {
    errorMessage: '',
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>log in to application</h2>
      <Error message={errorMessage} />
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
