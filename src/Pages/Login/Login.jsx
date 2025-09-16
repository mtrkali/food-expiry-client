import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router';
import Devider from '../Shared/Devider';
import Swal from 'sweetalert2';

const Login = () => {
    const { logInUser, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || '/';
    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { email, password } = Object.fromEntries(formData.entries());

        //login user --
        logInUser(email, password)
            .then(result => {
                if (result.user) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "login Successful!!",
                        text: "User created",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                navigate(from)
            })
            .catch(err => {
                if (err) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "email and possword not matching!!",
                        text: "Password must have at least 1 uppercase, 1 lowercase, and 6 characters.",
                        showConfirmButton: false,
                        timer: 3500
                    });
                }
            })
    }

    const signInGoogle = () => {
        return googleSignIn()
            .then(result => {
                if (result.user) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "login Successful!!",
                        text: "User created",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                navigate(from)
            })
            .catch(err => {
                console.log(err.message);
            })
    }


    return (
        <div className="card bg-base-100 w-sm mx-auto max-auto shrink-0 shadow-2xl my-16">
            <div className="card-body">
                <h1 className="text-2xl font-bold">Login now!</h1>
                <form onSubmit={handleSignIn} className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" className="input" name='email' placeholder="Email" required />
                    <label className="label">Password</label>
                    <input type="password" className="input" name='password' placeholder="Password" required />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </form>
                <p>Not have an account please<Link className='text-accent p-1' to='/register'>Rgister</Link></p>
            </div>
            <Devider></Devider>
            {/* Google */}
            <button onClick={signInGoogle} className="btn bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
        </div>
    );
};

export default Login;