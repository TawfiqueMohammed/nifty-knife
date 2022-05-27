import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import useToken from '../../hooks/useToken'
import { format } from 'date-fns';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';

const Signup = () => {

    let errorMsg;
    const nameRef = useRef("");
    const userIdRef = useRef("");
    const fatherRef = useRef("");
    const motherRef = useRef("");
    const classNameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");
    const [errorMessage, setErrorMessage] = useState("");
    const [agree, setAgree] = useState(false);
    const [date, setDate] = useState(new Date());
    const formattedDate = format(date, 'PP');

    let myArray = formattedDate.split(' ');
    console.log(myArray);

    let newYear = parseInt(myArray[2]);

    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    // const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [updateProfile, updating] = useUpdateProfile(auth);
    const [email, setEmail] = useState("");

    const [token] = useToken(user);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const checkAgree = () => {
        if (agree === false) setAgree(true);
        else setAgree(false);
    }

    if (loading || updating) {
        return <Loading></Loading>
    }

    if (token) {
        navigate(from, { replace: true });
    }

    const eventSubmit = async (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const address = event.target.address.value;
        const phone = event.target.phone.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        setErrorMessage("");

        if (password !== confirmPassword) {
            toast('Passwords do not match');
            return;
        }

        const newUser = {
            name: name,
            email: email,
            address: address,
            phone: phone,
            password: password
        }

        fetch('https://fierce-refuge-65339.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast(`${name} you have been registered`)
                }
                else {
                    toast.error(`User already exist`);
                }
            });

        console.log(name, email, password, phone, address);
        if (agree) {
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: name });
        }
        else {
            setErrorMessage('Please Agree Terms & Conditions');
        }
    };

    if (error) {
        errorMsg = <p>{error?.message}</p>;
    }
    return (
        <div>
            <h2 className='text-3xl font-bold text-primary text-center mt-6'>Sign UP</h2>
            <div class="hero min-h-screen ">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={eventSubmit} class="card-body">
                            <div className="input-group form-control">
                                <label className='label' htmlFor='name'>Name</label>
                                <input className='input input-bordered' type="name" name="name" required />
                            </div>
                            <div className="input-group form-control">
                                <label className='label' htmlFor='email'>Email</label>
                                <input className='input input-bordered' type="email" name="email" required />
                            </div>
                            <div className="input-group form-control">
                                <label className='label' htmlFor='address'>Address</label>
                                <textarea className='input input-bordered' type="text" name="address" required />
                            </div>
                            <div className="input-group form-control">
                                <label className='label' htmlFor='phone'>Contact Number</label>
                                <input className='input input-bordered' type="number" name="phone" required />
                            </div>
                            <div className="input-group form-control">
                                <label className='label' htmlFor='password'>Password</label>
                                <input className='input input-bordered' type="password" name="password" />
                            </div>
                            <div className="input-group form-control">
                                <label className='label' htmlFor='confirmPassword'>Confirm Password</label>
                                <input className='input input-bordered' type="password" name="confirmPassword" required />
                            </div>
                            <input onClick={checkAgree} className='mb-3' type="checkbox" name="terms" id="" />
                            <label className={`ps-2 ${agree ? 'text-success' : 'text-danger'}`} htmlFor='terms'>Accepct terms and conditions</label>
                            <input className='btn btn-primary' type="submit" required value="Signup" />
                            <p className='my-3 fs-5 d-flex'>
                                Already have an account? <Link className='form-link' to='/login'><span className='text-primary'>Login</span></Link>
                            </p>
                        </form>
                        <h6 className="text-danger my-3"> {errorMsg}</h6>
                        <h6 className="text-danger my-3"> {errorMessage}</h6>



                    </div>
                </div>
            </div>
        </div >
    );
};

export default Signup;


