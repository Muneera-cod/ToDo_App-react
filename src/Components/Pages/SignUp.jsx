import React from 'react'
import { ToastContainer,toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useNavigate,Link} from 'react-router-dom';
import { supabase} from '../../services/supabaseClient';
function SignUp() {
  const navigate=useNavigate()
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
            const { data, error } = await supabase.auth.signInWithOtp({
              email: values.userName,
              options: {
                
                emailRedirectTo: 'http://localhost:5173/login',
                
              }
            })
            if (error) {
                toast.error(error.message,{
                  className:'bg-lightBgclr text-mainTextclr  font-mono font-semibold border-2 border-markclr'
                });
              } else {
                toast.success('Check your email for the login link!',{
                  className:'bg-lightBgclr text-mainTextclr  font-mono font-semibold border-2 border-markclr'
                });}
        }
        catch(error){
                console.error('Error during login:', error.message);
                toast.error('Login failed.',{
                  className:'bg-lightBgclr text-mainTextclr  font-mono font-semibold border-2 border-markclr'
                });
        }
        
      
      // alert("Registered successfully");
      // toast.success("Login Successfull")
      // navigate('/login')

    },
  });
  return (
    <div className='flex w-full min-h-screen bg-mainBgclr items-center justify-center flex flex-col p-10'>
      <ToastContainer/>
      <div className='font-bold text-mainTextclr text-2xl font-sans'>SignUp here....</div>

      <div className='flex  min-h-1/2 flex-col lg:p-10 md:p-0 rounded-lg gap-10 md:w-1/2 sm:w-full items-center justify-center'>
      
      <form className='w-9/12 ' onSubmit={formik.handleSubmit}>
      <fieldset className='flex flex-col gap-2 py-4'>
        <label className='flex flex-col  text-sm font-mono text-mainTextclr'>
          First Name
          <input  placeholder="Enter your First Name..." id="firstName" name="firstName" type='text' className='bg-lightBgclr font-semibold rounded-md border-[2px] border-markclr p-3 hover:border-markHoverclr' onChange={formik.handleChange} value={formik.values.firstName}></input>
          {formik.touched.firstName && formik.errors.firstName?
         (<div style={{color:'#F0E3CA',fontFamily:'sans-serif',fontStyle:'italic',fontSize:'10px'}}>{formik.errors.firstName}</div>):null}
        </label>
        <label className='flex flex-col   text-sm font-mono text-mainTextclr'>
          Last Name
          <input  placeholder="Enter your Last Name..." id="lastName" name="lastName" type='text' className='bg-lightBgclr font-semibold rounded-md border-[2px] border-markclr p-3 hover:border-markHoverclr' onChange={formik.handleChange} value={formik.values.lastName}></input>
        </label>

        <label className='custom-file-upload flex flex-col mt-2 text-sm font-mono text-mainTextclr'>
          Photo
          <input id="userphoto" name="userphoto" type='file' className='bg-lightBgclr font-semibold rounded-md border-[2px] border-markclr p-3 hover:border-markHoverclr' onChange={formik.handleChange} value={formik.values.userphoto}></input>
        </label>
        <label className='flex flex-col   text-sm font-mono text-mainTextclr'>
          Username
          <input  placeholder="Enter your email address..." id="userName" name="userName" type='text' className='bg-lightBgclr font-semibold rounded-md border-[2px] border-markclr p-3 hover:border-markHoverclr' onChange={formik.handleChange} value={formik.values.userName}></input>
          {formik.touched.userName && formik.errors.userName?
         (<div style={{color:'#F0E3CA',fontFamily:'sans-serif',fontStyle:'italic',fontSize:'10px'}}>{formik.errors.userName}</div>):null}
        </label>
        <label className='flex flex-col   text-sm font-mono text-mainTextclr' >
          Password
          <input  placeholder="Enter a password..." type='password' name='password' className='bg-lightBgclr font-semibold rounded-md border-[2px] border-markclr p-3 hover:border-markHoverclr'  onChange={formik.handleChange} value={formik.values.password}></input>
          {formik.touched.password && formik.errors.password?
            (<div style={{color:'#F0E3CA',fontFamily:'sans-serif',fontStyle:'italic',fontSize:'10px'}}>{formik.errors.password}</div>):null}
        </label>
        <label className='flex flex-col  text-sm font-mono text-mainTextclr'>
          Re-enter Password
          <input placeholder="Re-enter the password" type='password' name='repassword' className='font-semibold bg-lightBgclr  rounded-md border-[2px] border-markclr p-3 hover:border-markHoverclr'  onChange={formik.handleChange} value={formik.values.repassword}></input>
          {formik.touched.repassword && formik.errors.repassword?
            (<div style={{color:'#F0E3CA',fontFamily:'sans-serif',fontStyle:'italic',fontSize:'10px'}}>{formik.errors.repassword}</div>):null}
        </label>    
      </fieldset>
      <div className='flex items-center w-full justify-center'> <button type='submit' className='bg-lightBgclr font-semibold border-2 border-markclr text-mainTextclr   p-3 w-full rounded-lg  font-mono font-bold hover:bg-mainTextclr hover:text-lightBgclr hover:border-lightBgclr focus:border-lightBgclr'>Submit</button></div>
      <div className='pt-5 flex items-center gap-2 text-mainTextclr text-xs hover:text-[#FFF5E3] '><input type='checkbox' className='bg-lightBgclr size-3'></input><p>I agree to all terms and conditions</p></div>
        
      </form>
      <div className='flex  w-fit justify-center text-mainTextclr p-4 text-xs hover:text-[#FFF5E3] sm:inline'>Already have an account...<Link to={'/login'}><span style={{fontStyle:'italic',display:'inline'}}>SignIn</span></Link></div>
    </div>
  </div>
  )
}

export default SignUp