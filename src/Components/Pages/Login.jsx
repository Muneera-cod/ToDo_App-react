import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { ToastContainer,toast } from 'react-toastify';
import { supabase} from '../../services/supabaseClient';
import 'react-toastify/dist/ReactToastify.css';
const validate = values => {
  
  const errors = {};
  if (!values.userName) {
    errors.userName= 'Please enter your email';
    // toast.error("Username cannot be empty")
  } 
  
  else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.userName)){
        errors.userName="Invalid email"
      }

  if (!values.password) {
    errors.password = 'Please enter your password';
    // toast.error("Enter your password")
  } else if (values.password.length < 5) {
    errors.password= 'Minimum five characters is required';
    // toast.error("Password must be minimum 5 characters")
  }
  


  return errors;
};
// const getURL = () => {
//   let url =
//     process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
//     process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
//     'http://localhost:3000/'
//   // Make sure to include `https://` when not localhost.
//    url = url.startsWith('http') ? url : `https://${url}`
//   // Make sure to include a trailing `/`.
//    url = url.endsWith('/') ? url : `${url}/`
//   return url
// }
function Login() {
  const [loading, setLoading] = useState(false);
  // const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validate,
    onSubmit: async(values) => {
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.signInWithOtp({
          email: values.userName,
          options: {
            shouldCreateUser: false,
            emailRedirectTo: 'http://localhost:5173/todopage',
            
          }
          
        })
        
        
        if (error) {
          toast.error(error.message,{
            className:'bg-lightBgclr text-mainTextclr  font-mono font-semibold border-2 border-markclr'
          });
        } else {
          toast.success('Check your email for the login link!',{
            className:'bg-lightBgclr text-mainTextclr  font-mono font-semibold border-2 border-markclr'
          });
        }
      } catch (error) {
        console.error('Error during login:', error.message);
        toast.error('Login failed.',{
          className:'bg-lightBgclr text-mainTextclr  font-mono font-semibold border-2 border-markclr'
        });
      } finally {
        setLoading(false);
      }
      // alert(JSON.stringify(values, null, 2));
      // alert("Login successfull");
      // toast.success("Login Successfull")
      // navigate('/todopage')

    },
  });

  return (
    <div className='flex w-full min-h-screen bg-mainBgclr items-center justify-center flex flex-col'>
      <ToastContainer/>
     
      <div className='font-bold text-mainTextclr text-2xl font-sans'>Login here....</div>

      <div className='flex  min-h-fit flex-col p-10 rounded-lg gap-32 w-1/2 items-center justify-center'>
        
        <form onSubmit={formik.handleSubmit} className='w-9/12 '>
        <fieldset className='flex flex-col gap-5 py-4'>
        
          <label className='flex flex-col gap-1 text-mainTextclr text-sm font-mono '>
            Username
            <input placeholder="Enter your email address" id="userName" name="userName" type='text' className='bg-lightBgclr font-semibold rounded-md border-[3px] border-markclr p-3 hover:border-markHoverclr' onChange={formik.handleChange} value={formik.values.userName}></input>
            {formik.touched.userName && formik.errors.userName?
        (<div style={{color:'#F0E3CA',fontFamily:'sans-serif',fontStyle:'italic',fontSize:'10px'}}>{formik.errors.userName}</div>):null}
          </label>
          
          <label className='flex flex-col gap-1 text-mainTextclr text-sm font-mono ' >
            Password
            <input placeholder="Enter your password" type='password' name='password' className='bg-lightBgclr font-semibold rounded-md border-[3px] border-markclr p-3 hover:border-markHoverclr'  onChange={formik.handleChange} value={formik.values.password}></input>
            {formik.touched.password && formik.errors.password?
            (<div style={{color:'#F0E3CA',fontFamily:'sans-serif',fontStyle:'italic',fontSize:'10px'}}>{formik.errors.password}</div>):null}
          </label>
        </fieldset>
        <div className='flex items-center w-full justify-center'> 
          <button type='submit' className='bg-lightBgclr  border-2 border-markclr text-mainTextclr p-3 w-full rounded-lg  font-mono font-bold hover:bg-mainTextclr hover:text-lightBgclr hover:border-lightBgclr focus:border-lightBgclr'>Login</button>
        </div>
          
        </form>
        <div className='flex  w-fit justify-center text-mainTextclr p-4 text-xs hover:text-[#FFF5E3] sm:inline'>Doesn't have aaccount?...<Link to={'/'}><span style={{fontStyle:'italic',display:'inline'}}>SignUp</span></Link></div>
      </div>
    </div>
  )
}

export default Login