import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import Loading from '../../Pages/Shared/Loading'
import Devider from '../Shared/Devider';
import Swal from 'sweetalert2';

const Register = () => {
    const { loading, createUser } = useContext(AuthContext);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { email, password } = Object.fromEntries(formData.entries());

        if (!passwordRegex.test(password)) {
            return Swal.fire({
                position: "center",
                icon: "error",
                title: "Invalid Pssword!!",
                text: "Password must have at least 1 uppercase, 1 lowercase, and 6 characters.",
                showConfirmButton: false,
                timer: 3500
            });
        }
        //create user --
        createUser(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully Registered",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                console.log(err.message)
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "duplicate email!!",
                    text: "email alreadey Exist",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    return (
        <div className="card bg-base-100 w-sm mx-auto max-auto shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-2xl font-bold">Register now!</h1>
                <form onSubmit={handleRegister} className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" className="input" name='email' placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" className="input" name='password' placeholder="Password" />
                    <p>Already have an account please<Link className='text-accent p-1' to='/login'>Login</Link></p>
                    <button className="btn btn-neutral mt-4">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Register;