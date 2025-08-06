import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import {Link,useNavigate} from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper.js'


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async(e) =>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please Enter a valid email address")
      return;
    }

    if(!password){
      setError("Please enter a valid password")
      return;
    }

    setError("")

    //Login API call
  }

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input type="text" onChange={({target})=>setEmail(target.value)} label="Email Address" value={email} placeholder='harrypotter@example.com'/>

          <Input type="password" onChange={({target})=>setPassword(target.value)} label="Password" value={password} placeholder='Min 8 characters'/>

          {error && <p className='text-red-500 tex-xs pb-2.5'>{error}</p>}

          <button type="submit" className='btn-primary'>LOGIN</button>

          <p className='text-[13px] text-slate-800 mt-3'>Don't have account?{" "}
            <Link to="/signup" className='font-medium text-primary underline'> SignUp</Link>
          </p>
        </form>

      </div>
    </AuthLayout>
  )
}

export default Login
