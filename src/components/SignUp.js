import React, { useContext, useState } from 'react';
import NoteContext from '../context/NoteContext';
import PageContext from '../context/PageContext';
import ThemeContext from '../context/ThemeContext';
import Loading from './Loading';

function SignUp(props) {
  const { SignUp, loading } = useContext(NoteContext);
  const { clearState: clearPageState } = useContext(PageContext);
  const { theme } = useContext(ThemeContext);
  const { showAlert } = props;

  const [state, setState] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);

  // Theme-specific styles
  const textMutedClass = theme === 'dark' ? 'text-light opacity-75' : 'text-muted';

  const onChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();

    // Password validation
    const password = state.password;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{5,}$/;

    if (!passwordRegex.test(password)) {
      showAlert('Password must contain at least one capital letter, one special character, and one number.', 'danger');
      return;
    }

    if (state.password !== state.confirmPassword) {
      showAlert('Passwords do not match!', 'danger');
      return;
    }

    // Clear page state when signing up
    clearPageState();
    SignUp(state, showAlert);
  };

  return (
    <div className="container mt-5">
      {loading ? <Loading /> : (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">Create an Account</h2>
                <form onSubmit={handleClick}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      onChange={onChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      onChange={onChange}
                      required
                      aria-describedby="emailHelp"
                      placeholder="Enter your email"
                    />
                    <small id="emailHelp" className={textMutedClass}>We'll never share your email with anyone else.</small>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        id="password"
                        onChange={onChange}
                        required
                        minLength={5}
                        placeholder="Create password"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                      </button>
                    </div>
                    <small className={textMutedClass}>Password must contain at least one capital letter, one special character, and one number</small>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      onChange={onChange}
                      required
                      minLength={5}
                      placeholder="Confirm password"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-3">Sign Up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
