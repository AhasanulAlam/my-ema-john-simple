import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);


    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = (event) =>{
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email,password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset();
            // Navigate to the old page and clear history by replace true
            navigate(from, { replace: true});
        })
        .catch(error=>{
            console.error(error);
        })
    }


    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder='Enter your email.' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder='Enter your password.' required />
                    <p onClick={() => setShowPassword(!showPassword)}><small>
                        {
                            showPassword ? <span>Hide Password</span> : <span>Show Password</span>
                        }
                        </small></p>
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p><small>New to ema-jhon? <Link to="/signup">Create New Account</Link></small></p>
        </div>
    );
};

export default Login;