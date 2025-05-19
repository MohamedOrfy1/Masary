import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        if(!validateEmail(email)){
            setError('Please enter a valid email address');
            return;
        }
        if(!password){
            setError('Please enter your password');
            return;
        }
        setError("");
        
        //Login API call
    }
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-x font-semibold text-black">
            Welcome back!
        </h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please login to your account  
        </p>
        
        <form onSubmit={handleLogin}>
            <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email"
                placeholder="john@example.com"
                type="email"
            />

            <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min. 8 characters"
                type="password" 
            />

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
            <button
                type="submit"
                className="btn-primary">
                Login
            </button>
            <p className="text-[13px] text-slate-800 mt-3">
                Don't have an account? 
                <Link  className="font-medium text-primary underline" to="/signup">
                    Sign up
                </Link>
            </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
