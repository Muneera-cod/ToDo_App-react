import React from 'react'
import { useFormik } from 'formik';
function SignUp() {
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
      userphoto:[]
    },
    // validate,
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      alert("Registered successfully");
      // toast.success("Login Successfull")
      navigate('todopage')

    },
  });
  return (
    <div className='flex w-full min-h-screen bg-amber-100 items-center justify-center'>
    <div className='flex bg-amber-100 w-96 min-h-fit flex-col pl-14 rounded-lg' style={{borderLeft:'10px solid pink'}}>
      <div className='font-bold text-zinc-700 text-2xl font-sans'>Register here....</div>

      <form >
      <fieldset className='flex flex-col gap-4 py-14'>
        {/* <legend>Login</legend> */}
        <label className='flex flex-col gap-2 text-zinc-700 font-mono font-semibold'>Username<input  id="userName" name="userName" type='text' className=' rounded border-2 border-zinc-700 p-4' onChange={formik.handleChange} value={formik.values.userName}></input></label>
        <label className='flex flex-col gap-2 text-zinc-700 font-mono font-semibold'>Username<input  id="userphoto" name="userphoto" type='file' className=' rounded border-2 border-zinc-700 p-4' onChange={formik.handleChange} value={formik.values.userphoto}></input></label>
        <label className='flex flex-col gap-2 text-zinc-700 font-mono font-semibold' >Password<input type='password'name='password' className='rounded border-2 border-zinc-700 p-4'  onChange={formik.handleChange} value={formik.values.password}></input></label>
        <label className='flex flex-col gap-2 text-zinc-700 font-mono font-semibold' >Re-enter Password<input type='password'name='password' className='rounded border-2 border-zinc-700 p-4'  onChange={formik.handleChange} value={formik.values.password}></input></label>    
      </fieldset>
      <div className='flex items-center w-full justify-center'> <button className='bg-green-400 p-3 w-32 rounded-lg  font-mono font-bold'>Submit</button></div>
        
      </form>

    </div>
  </div>
  )
}

export default SignUp