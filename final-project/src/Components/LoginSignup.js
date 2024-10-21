import React, { useState } from 'react';
import "../Styles/LoginSignup.css";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';


const LoginSignup = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const togglePanel = () => {
        setIsSignUp(prevIsSignUp => !prevIsSignUp);
    };
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("Male");
    const [email1, setEmail1] = useState("");
    const [password1, setPassword1] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [signUpStatus, setSignUpStatus] = useState("");

    const register = (e) =>
    {
        e.preventDefault();
        Axios.post("http://localhost:3001/register",
            {
                email : email,
                name : name,
                mobile : mobile,
                gender : gender,
                password : password,
            }
        ).then((response) => 
        {
            if(response.data.message)
            {
                setSignUpStatus(response.data.message);
            }
            else
            {
                setSignUpStatus("Account Created Successfully!");
            }
        })
    }

    const login = (e) =>
    {
        e.preventDefault();
        Axios.post("http://localhost:3001/login",
            {
                email1 : email1,
                password1 : password1,
            }
        ).then((response) => 
        {
            if(response.data.message)
            {
                setLoginStatus(response.data.message);
            }
            else
            {
                setLoginStatus(response.data[0].email);
                // navigate('/sizebasedcalc', {state:{loginStatus}});
                navigate(`/sizebasedcalc?email=${response.data[0].email}`);
            }
        })
    }

    return (
        <>
            <nav id="navbar" className="navbar navbar-expand-lg navbar-dark pt-4">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold" href='/'><img className="rounded-circle" src='images/co2.png' height="44.8px" width="86.8" alt='logo'></img><span className='BrandName1'>EcoMine</span><span className='BrandName2'>Insight</span></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
            <div id="body" className='pt-5'>
                <div className={`containersnl ${isSignUp ? 'right-panel-active' : 'left-panel-active'}`}>
                    <div className="form-container sign-up-container">
                        <form action="/" id='signupform' className='form'>
                            <h1 className="h1">Create Account</h1>
                            {/* <div className="social-container">
                                <a href="/" className="a social"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="blue" className="bi bi-facebook" viewBox="0 0 16 16">
                                    <p className="p" ath d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                </svg></a>
                                <a href="/" className="a social"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" className="bi bi-google" viewBox="0 0 16 16">
                                    <p className="p" ath d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                </svg></a>
                                <a href="/" className="a social"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="blue" className="bi bi-linkedin rounded-circle" viewBox="0 0 16 16">
                                    <p className="p" ath d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                </svg></a>
                            </div> */}
                            <span className="span">or use your email for registration</span>
                            <input type="text" placeholder="Name*" onChange={(e) => {setName(e.target.value)}} id='username' required={true} className='ip' />
                            <input type="email" placeholder="Email*" onChange={(e) => {setEmail(e.target.value)}} id='email' required={true} className='ip' />
                            <input type="text" placeholder="Mobile Number*" onChange={(e) => {setMobile(e.target.value)}} id='mobile' required={true} className='ip' />
                            <div className="form-check form-check-inline d-flex align-items-evenly mt-2">
                                <input className="form-check-input me-2" onChange={(e) => setGender(e.target.value)} type="radio" name="gender" id="inlineRadio1" value="Male" checked/>
                                <label className="form-check-label me-5" htmlFor="inlineRadio1">Male</label>
                                <input className="form-check-input me-2" onChange={(e) => setGender(e.target.value)} type="radio" name="gender" id="inlineRadio2" value="Female"/>
                                <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                            </div>
                            <input type="password" placeholder="Password*" onChange={(e) => {setPassword(e.target.value)}} id='password' required={true} className='ip' />

                            <button className="button m-2" onClick={register}>Sign Up</button>
                            <h5>{signUpStatus}</h5>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form action="/" className='form'>
                            <h1 className="h1">Login</h1>
                            {/* <div className="social-container">
                                <a href="/" className="a social"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="blue" className="bi bi-facebook" viewBox="0 0 16 16">
                                    <p className="p" ath d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                </svg></a>
                                <a href="/" className="a social"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" className="bi bi-google" viewBox="0 0 16 16">
                                    <p className="p" ath d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                </svg></a>
                                <a href="/" className="a social"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="blue" className="bi bi-linkedin rounded-circle" viewBox="0 0 16 16">
                                    <p className="p" ath d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                </svg></a>
                            </div> */}
                            {/* <span className="span">or use your account</span> */}
                            <input type="email" placeholder="Email*" onChange={(e) => {setEmail1(e.target.value)}} id='email1' required={true} className='ip' />
                            <input type="password" placeholder="Password*" onChange={(e) => {setPassword1(e.target.value)}} id='password1' required={true} className='ip' />
                            <a href="/" className='a'>Forgot your password?</a>
                            <button className="button" onClick={login}>Login</button>
                            <h5>{loginStatus}</h5>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1 className="h1">Welcome Back!</h1>
                                <p className="p">To keep connected with us please login with your personal info</p>
                                <button className="button ghost" id="signIn" onClick={togglePanel}>
                                    {isSignUp ? 'Login' : 'Sign Up'}
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1 className="h1">Hello, Friend, new here?</h1>
                                <p className="p">Enter your personal details and start the journey with us</p>
                                <button className="button ghost" id="signUp" onClick={togglePanel}>
                                    {isSignUp ? 'Login' : 'Sign Up'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginSignup;