import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// const validate = values => {
//   const errors = {};
//   if (!values.userName) {
//     errors.userName= 'Required';
//     toast.error("Username cannot be empty")
//   } else if (values.userName.length > 15) {
//     errors.userName = 'Must be 15 characters or less';
//     toast.error("Username must be 15 characters or less")
//   }

//   if (!values.password) {
//     errors.password = 'Required';
//     toast.error("Enter your password")
//   } else if (values.password.length < 6) {
//     errors.password= 'Minimum five characters';
//     // toast.error("Password must be minimum 5 characters")
//   }
  


//   return errors;
// };
function Login() {

  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    // validate,
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      alert("Login successfull");
      // toast.success("Login Successfull")
      navigate('todopage')

    },
  });

  return (
    <div className='flex w-full min-h-screen bg-amber-100 items-center justify-center'>
      <div className='flex bg-amber-100 w-96 min-h-fit flex-col pl-14 rounded-lg' style={{borderLeft:'10px solid pink'}}>
        <div className='font-bold text-zinc-700 text-2xl font-sans'>Login here....</div>

        <form onSubmit={formik.handleSubmit}>
        <fieldset className='flex flex-col gap-4 py-14'>
          {/* <legend>Login</legend> */}
          <label className='flex flex-col gap-2 text-zinc-700 font-mono font-semibold'>Username<input id="userName" name="userName" type='text' className=' rounded border-2 border-zinc-700 p-4' onChange={formik.handleChange} value={formik.values.userName}></input></label>
          {/* <ToastContainer/> */}
          <label className='flex flex-col gap-2 text-zinc-700 font-mono font-semibold' >Password<input type='password'name='password' className='rounded border-2 border-zinc-700 p-4'  onChange={formik.handleChange} value={formik.values.password}></input></label>
        </fieldset>
        <div className='flex items-center w-full justify-center'> <button className='bg-green-400 p-3 w-32 rounded-lg  font-mono font-bold'>Login</button></div>
          
        </form>
        <div className='flex w-full justify-center text-zinc-500 p-4 text-xs hover:text-zinc-700 hover:text-sm'>Doesn't have aaccount?...<Link to={'signup'}><span style={{fontStyle:'italic'}}>SignUp</span></Link></div>
      </div>
    </div>
  )
}

export default Login