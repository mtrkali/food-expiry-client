import React from 'react';
import { Link } from 'react-router';

const Register = () => {
    const handleRegister = e =>{
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formValue = Object.fromEntries(formData.entries());
        console.log(formValue);
    }
    return (
        <div className="card bg-base-100 w-xs mx-auto max-auto shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-2xl font-bold">Register now!</h1>
                <form onSubmit={handleRegister} className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" className="input" name='email' placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" className="input" name='password' placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </form>
                <p>Already have an account please<Link className='text-accent p-1' to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default Register;