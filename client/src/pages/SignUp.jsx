import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData,setformData] = useState({});
  const [errorMessage,setErrorMessage] = useState(null);
  const [loading,setLoading] = useState(false);
  const handleChange=(e)=>{
    setformData({...formData,[e.target.id]:e.target.value.trim()});
  }
  const navigate = useNavigate();
  // it is use to prevent the page from refreshing the page and data 
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('Please fill out all fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if(data.success===false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      {/* mx-auto is used to center the div */}
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10'>
        {/* left side div */}
        <div className='flex-1'>
        <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Snap</span>
            Blog
        </Link>
        <p className='text-sm mt-5'>
          Hello! You can sign up with your email and passwrod or by Google
        </p>
        </div>
      {/* Right side div */}
      <div className='flex-1'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label value='Your Username'/>
            <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}/>
          </div>
          <div>
            <Label value='Your Email'/>
            <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange}/>
          </div>
          <div>
            <Label value='Your Password'/>
            <TextInput type='password' placeholder='********' id='password' onChange={handleChange}/>
          </div>
          <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
            {
              loading ? (
                <>
                <Spinner size='sm'/>
                <span className='pl-3'> Loading...</span>
                </>
              ) : 'Sign Up'
            }
          </Button>
          <OAuth/>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>Have an account?</span>
          <Link to="/sign-in" className='text-blue-500'>Sign in</Link>
        </div>
        {
          errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )
        }
      </div>
    </div>
  </div>
  );
}
