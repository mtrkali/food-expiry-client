import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import Loading from '../../Pages/Shared/Loading'
import Devider from '../Shared/Devider';
import Swal from 'sweetalert2';
import axios from 'axios';

const Register = () => {
    const { loading, createUser, user, setUser } = useContext(AuthContext);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { email, password, photo, name } = Object.fromEntries(formData.entries());

        const newUser = { name, email, photo };
        console.log(newUser);

        if (!passwordRegex.test(password)) {
            return Swal.fire({
                position: "center",
                icon: "error",
                title: "Invalid Password!!",
                text: "Password must have at least 1 uppercase, 1 lowercase, and 6 characters.",
                showConfirmButton: false,
                timer: 3500
            });
        }

        try {
            // create user in firebase/auth
            const result = await createUser(email, password);
            console.log(result.user);

            // send to db
            const res = await axios.post("http://localhost:3000/users", newUser);

            if (res.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Registration Successful!!",
                    text: "User created",
                    showConfirmButton: false,
                    timer: 1500
                });
            }

            setUser(prev => ({ ...prev, displayName: name, photoURL: photo }));
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.message,
            });
        }
    };





    return (
        <div className="card bg-base-100 w-sm mx-auto max-auto shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-2xl font-bold">Register now!</h1>
                <form onSubmit={handleRegister} className="fieldset">
                    <label className="label">Name</label>
                    <input type="text" className="input" name='name' placeholder="Enter your name" required />
                    <label className="label">photoURL</label>
                    <input type="text" className="input" name='photo' placeholder="PhotoURL" required />
                    <label className="label">Email</label>
                    <input type="email" className="input" name='email' placeholder="Email" required />
                    <label className="label">Password</label>
                    <input type="password" className="input" name='password' placeholder="Password" required />
                    <p>Already have an account please<Link className='text-accent p-1' to='/login'>Login</Link></p>
                    <button className="btn btn-neutral mt-4">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;