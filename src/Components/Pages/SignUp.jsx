import React, { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from 'formik';
import { useNavigate,Link} from 'react-router-dom';
import { supabase} from '../../services/supabaseClient';
import Todonav from '../ui/Todonav';
import { IconArrowLeft } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
function SignUp() {
    const redirectUrl = `${window.location.origin}`
  const [ isLoading,setIsLoading] = useState(false)
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const validate = values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName= 'Please enter your Name';
      // toast.error("Username cannot be empty")
    }
    
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
    // if (values.repassword !== values.password.length) {
    //   errors.repassword= 'Enter the same password';
    //   // toast.error("Password must be minimum 5 characters")
    // }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      firstName:'',
      lastName:'',
      userName: '',
      password: '',
      repassword:'',
      userphoto:[]
    },
    validate,
    onSubmit: async(values) => {
    try{  
      setIsLoading(true)
      let { data, error } = await supabase.auth.signUp({
              email: values.userName,
              password:values.password,
              
              options:{
                data:{
                  first_name: values.firstName,
                  last_name: values.lastName
               },
                emailRedirectTo: redirectUrl
              }
            })
            if (error) {
                toast.error(error.message,{
                  className:'font-[700]  dark:bg-lightBgclr bg-lightModelightBg   border-2  p-3 w-full rounded-lg  font-mono font-bold hover:bg-mainTextclr   dark:border-markclr p-3 border-lightModelightBg'
                });
              } else {
                toast.success('Check your email for the login link!',{
                  className:'font-[700]  dark:bg-lightBgclr bg-lightModelightBg   border-2  p-3 w-full rounded-lg  font-mono font-bold hover:bg-mainTextclr   dark:border-markclr p-3 border-lightModelightBg'
                });
              }
        }
        catch(error){
                console.error('Error during login:', error.message);
                toast.error('Login failed.',{
                  className:'bg-lightBgclr text-mainTextclr  font-mono font-semibold border-2 border-markclr'
                });
        }
        finally{
          setIsLoading(false)
        }
      
   

    },
  });
  return (
    <>
             <IconArrowLeft onClick={()=>{navigate(-1);dispatch(changeView(0))}} className='absolute top-6 left-4 text-lightmodemainTextclr dark:text-darkmainTextclr '/>

    {/* <Todonav/> */}
    <div className='flex w-full min-h-screen  dark:bg-mainBgclr bg-lightModeMainBg   text-lightmodemainTextclr  dark:text-darkmainTextclr items-center justify-center flex flex-col pt-32 pb-10 px-10'>
      <div className='font-bold  text-xl font-sans  text-lightmodemainTextclr  dark:text-darkmainTextclr'>SignUp here....</div>

      <div className='flex  min-h-1/2 flex-col   rounded-lg gap-4 md:w-3/5 lg:w-1/2 xl:w-1/3 sm:w-full items-center justify-center'>
      
      <form className='w-full' onSubmit={formik.handleSubmit}>
      <fieldset className='flex flex-col gap-2 py-4'>
        <label className='flex flex-col  text-sm font-mono'>
          First Name
          <input  placeholder="Enter your First Name..." id="firstName" name="firstName" type='text' className=' dark:bg-mainBgclr bg-lightModeMainBg   font-semibold rounded-md border-[2px] dark:border-markclr p-3 border-lightModelightBg' onChange={formik.handleChange} value={formik.values.firstName}></input>
          {formik.touched.firstName && formik.errors.firstName?
         (<div style={{color:'#F0E3CA',fontFamily:'sans-serif',fontStyle:'italic',fontSize:'10px'}}>{formik.errors.firstName}</div>):null}
        </label>
        <label className='flex flex-col   text-sm font-mono '>
          Last Name
          <input  placeholder="Enter your Last Name..." id="lastName" name="lastName" type='text' className=' dark:bg-mainBgclr bg-lightModeMainBg font-semibold rounded-md border-[2px] dark:border-markclr p-3 border-lightModelightBg' onChange={formik.handleChange} value={formik.values.lastName}></input>
        </label>

        {/* <label className='custom-file-upload flex flex-col mt-2 text-sm font-mono border-[2px] dark:bg-mainBgclr bg-lightModeMainBg dark:border-markclr p-3 border-lightModelightBg'>
          Photo
          <input id="userphoto" name="userphoto" type='file' className='dark:bg-mainBgclr bg-lightBgclr font-semibold rounded-md  ' onChange={formik.handleChange} value={formik.values.userphoto}></input>
        </label> */}
        <label className='flex flex-col   text-sm font-mono '>
          Email
          <input  placeholder="Enter your email address..." id="userName" name="userName" type='email' className='dark:bg-mainBgclr bg-lightModeMainBg font-semibold rounded-md border-[2px] dark:border-markclr p-3 border-lightModelightBg' onChange={formik.handleChange} value={formik.values.userName}></input>
          {formik.touched.userName && formik.errors.userName?
         (<div style={{color:'#F0E3CA',fontFamily:'sans-serif',fontStyle:'italic',fontSize:'10px'}}>{formik.errors.userName}</div>):null}
        </label>
        <label className='flex flex-col   text-sm font-mono ' >
          Password
          <input  placeholder="Enter a password..." type='password' name='password' className='dark:bg-mainBgclr bg-lightModeMainBg font-semibold rounded-md border-[2px] dark:border-markclr p-3 border-lightModelightBgr'  onChange={formik.handleChange} value={formik.values.password}></input>
          {formik.touched.password && formik.errors.password?
            (<div style={{color:'#F0E3CA',fontFamily:'sans-serif',fontStyle:'italic',fontSize:'10px'}}>{formik.errors.password}</div>):null}
        </label>
        <label className='flex flex-col  text-sm font-mono '>
          Re-enter Password
          <input placeholder="Re-enter the password" type='password' name='repassword' className='dark:bg-mainBgclr bg-lightModeMainBg font-semibold   rounded-md border-[2px] dark:border-markclr p-3 border-lightModelightBg'  onChange={formik.handleChange} value={formik.values.repassword}></input>
          {formik.touched.repassword && formik.errors.repassword && formik.values.password !== formik.values.repassword ?
            (<div style={{color:'#F0E3CA',fontFamily:'sans-serif',fontStyle:'italic',fontSize:'10px'}}>{formik.errors.repassword}</div>):null}
        </label>    
      </fieldset>
      <div className='flex items-center w-full justify-center'> <button disabled={isLoading} type='submit' className=' dark:hover:border-opacity-60  hover:bg-opacity-60 dark:bg-lightBgclr bg-lightModelightBg font-semibold border-2     p-3 w-full rounded-lg  font-mono font-bold hover:opacity-80 dark:hover:text-[#FFF5E3] dark:border-markclr p-3 border-lightModelightBg focus:border-lightBgclr'>{isLoading ? 'Signing' :'Sign up'}</button></div>
      {/* <div className='pt-5 flex items-center gap-2 text-mainTextclr text-xs hover:text-[#FFF5E3] '><input type='checkbox' className='bg-lightBgclr size-3'></input><p>I agree to all terms and conditions</p></div> */}
        
      </form>
      <div className='flex  w-fit justify-center p-4 text-xs hover:opacity-60 dark:hover:text-[#FFF5E3] sm:inline'>Already have an account...<Link to={'/'}><span style={{fontStyle:'italic',display:'inline'}}>SignIn</span></Link></div>
    </div>
  </div>
  </>
  )
}

export default SignUp