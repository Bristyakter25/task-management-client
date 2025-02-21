import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log('form sign up', email, password);

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate('/dashboard'); // Redirect to the dashboard page upon successful login
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <div className="hero bg-base-200 py-20">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-3xl text-center font-bold my-5">Login now!</h1>
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-teal-300">Login</button>
            </div>
            <h3 className='text-center my-5'>New User ? <span className='text-red-500'><Link to='/register'>Register</Link></span> here</h3>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;