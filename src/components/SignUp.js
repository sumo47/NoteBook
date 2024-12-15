import React, { useContext, useState } from 'react';
import NoteContext from '../context/NoteContext';

function SignUp(props) {
  const { SignUp } = useContext(NoteContext);
  const { showAlert } = props;

  const [state, setState] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();

    // Password validation
    const password = state.password;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{5,}$/;

    if (!passwordRegex.test(password)) {
      alert('Password must contain at least one capital letter, one special character, and one number.');
      return;
    }

    if (state.password !== state.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    SignUp(state, showAlert);
  };

  return (
    <div>
      <h2 className="mt-5">Create an Account to use Notebook</h2>
      <form onSubmit={handleClick}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control mb-3"
            id="name"
            onChange={onChange}
            placeholder="Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control mb-3"
            id="email"
            onChange={onChange}
            required
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-group mb-3">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="password"
              onChange={onChange}
              required
              minLength={5}
              placeholder="Password"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control mb-3"
            id="confirmPassword"
            onChange={onChange}
            required
            minLength={5}
            placeholder="Confirm Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">SignUp</button>
      </form>
    </div>
  );
}

export default SignUp;
