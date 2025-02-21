import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    
    const {createUser} = useContext(AuthContext);
    const navigate = useNavigate()

    const handleSignUp = e =>{
        e.preventDefault();
        console.log('form sign up');
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log('form sign up',name,email,password);



        createUser(email,password)
        .then(result=>{
            console.log(result.user);
            navigate('/dashboard');
            const newUser = {name,email}

            // save user in database
            fetch("http://localhost:5000/users",{
                method:'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newUser)

            })
            .then(res => res.json())
            .then(data =>{
                
                if(data.insertedId){
                    console.log('user created in db');
                }
            })
        })
        .catch(error =>{
            console.log('error',error);
        })
    }
    return (
        <div>
            <div className="hero bg-base-200 py-10">
  <div className="hero-content flex-col lg:flex-row-reverse">
    
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <h1 className="text-3xl text-center font-bold my-5">Register now!</h1>
      <form onSubmit={handleSignUp} className="card-body">
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="name" name='name' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name='email' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name='password'  className="input input-bordered" required />
          
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
      <h3 className='text-center my-5'>Already Registered ? <span className='text-red-500'><Link to='/login'>Login</Link></span> here</h3>
    </div>
  </div>
</div>
        </div>
    );
};

export default Register;