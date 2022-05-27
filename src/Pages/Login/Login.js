import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToken from '../../hooks/useToken';
import Loading from '../Shared/Loading';
import auth from '../../firebase.init';
import SocialLogin from './Social Login/SocialLogin'

const Login = () => {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [student, setStudent] = useState([]);


    let from = location.state?.from?.pathname || "/";
    let errorElement = <></>;

    const eventSetEmail = (event) => {
        setEmail(event.target.value);
    }

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    useEffect(() => {
        fetch(`https://fierce-refuge-65339.herokuapp.com/users?email=${user?.email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setStudent(data))
    }, [user])


    const [token] = useToken(user);

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    if (loading) {
        return <Loading></Loading>
    }

    if (token) {
        navigate(from, { replace: true });
    }

    const EventSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        await signInWithEmailAndPassword(email, password);
    };

    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email !== "") {
            await sendPasswordResetEmail(email);
            toast("Email Sent");
        } else {
            toast.error("please enter your email address", {
                theme: "colored",
            });
        }
    };
    if (error) {
        errorElement = <div className='my-3'>
            <p className="text-danger"> {error?.message}</p>
        </div>
    }
    return (
        <div>

            <div class="card w-96 bg-base-100 shadow-xl my-10 mx-auto">
                <div class="container-login">


                    <form onSubmit={EventSubmit} class="card-body items-center text-center">
                        <h2 class="card-title text-2xl">Login</h2>
                        <div className="input-group mb-0 w-75 mx-auto form-control">
                            <label htmlFor='email' className="label">
                                <span className="label-text">Email</span>

                            </label>
                            <input onBlur={eventSetEmail} className='input input-bordered w-full max-w-xs' ref={emailRef} type="email" name="email" id='email' required />
                        </div>
                        <div className="input-group w-75 mx-auto form-control">
                            <label htmlFor='password' className="label">
                                <span className="label-text">Password</span>

                            </label>
                            <input ref={passwordRef} className='input input-bordered w-full max-w-xs' type="password" name="password" id='password' />
                        </div>

                        <input className='btn btn-primary w-full text-white' type="submit" required value="Login" />
                        <button className='btn btn-primary w-full text-white' onClick={resetPassword}>Reset Password</button>

                    </form>
                    {errorElement}
                    <p className='my-3 fs-5 text-center'>
                        New User? <Link className='form-link' to='/signup'><span className='text-primary '>Sign Up</span></Link>
                    </p>
                    <SocialLogin></SocialLogin>

                </div>



            </div>
        </div >
    );

};

export default Login;


