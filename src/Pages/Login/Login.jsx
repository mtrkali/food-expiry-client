import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { Link } from 'react-router';

const Login = () => {
    const {logInUser} = useContext(AuthContext);
    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { email, password } = Object.fromEntries(formData.entries());

        //create user --
        logInUser(email, password)
            .then(result => {
                console.log(result.user);
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    return (
        <div className="card bg-base-100 w-sm mx-auto max-auto shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-2xl font-bold">Login now!</h1>
                <form onSubmit={handleSignIn} className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" className="input" name='email' placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" className="input" name='password' placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </form>
                <p>Not have an account please<Link className='text-accent p-1' to='/register'>Rgister</Link></p>
            </div>
        </div>
    );
};

export default Login;