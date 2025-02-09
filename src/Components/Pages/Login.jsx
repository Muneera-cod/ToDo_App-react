import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { IconArrowLeft } from '@tabler/icons-react';
import { useFormik } from 'formik'
import { ToastContainer,toast } from 'react-toastify';
import { supabase} from '../../services/supabaseClient';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { useGetUserQuery } from '../../redux/reducers/Api/authApi';
import { useSelector,useDispatch } from 'react-redux';
import { changeView } from '../../redux/reducers/View/ViewSlice';
import { useSignInMutation } from '../../redux/reducers/Api/authApi';
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

function Login() {
   const navigate=useNavigate()
   const curview=useSelector((state)=>state.view.currView)
   console.log('view', curview)
   const { data: user, error } = useGetUserQuery;
   console.log('user', user)
   const dispatch=useDispatch()
  const [loading, setLoading] = useState(false);
  const [errorMsg,setErrorMsg] =useState('')
  const errorref = useRef();
  const [ signIn ,{ isLoading,isError}] = useSignInMutation()

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validate,
    onSubmit: async(values) => {
      setLoading(true);
      try {
      
let { data:{session}, error } = await supabase.auth.signInWithPassword({


              email: values.userName,
              password:values.password,
             
                  })
                  if (error) {
                    console.log('Supabase Error:', error);
                    setErrorMsg(error.message)
                    throw new Error(error.message);
                  }
                
             navigate('/')
              console.log(';d;l',session.user.id)
              toast.success('Login successful',{
                className:'font-[700]  dark:bg-lightBgclr bg-lightModelightBg   border-2  p-3 w-full rounded-lg  font-mono font-bold hover:bg-mainTextclr   dark:border-markclr p-3 border-lightModelightBg'
              });
            
      } 
      catch (error) {
         console.log(error.message)
            toast.error('Login failed.',{
              className:'font-[700]  dark:bg-lightBgclr bg-lightModelightBg   border-2  p-3 w-full rounded-lg  font-mono font-bold  dark:border-markclr p-3 border-lightModelightBg '
            });
           
      } 
      finally {
            setLoading(false);
      }
     

    },
  });
 console.log(loading,'laoding')

 
  const location=useLocation()
  useEffect(()=>{
    if(location.pathname==='/login'){
       dispatch(changeView(0))
    }
    else if(location.pathname==='/forgot-password' || location.pathname==='/reset-password'){
         dispatch(changeView(1))
    }
  },[location.pathname])



  return (
    <>
    <IconArrowLeft onClick={()=>{navigate(-1);dispatch(changeView(0))}} className='absolute top-6 left-4 text-lightmodemainTextclr dark:text-darkmainTextclr '/>

<section className='flex w-full min-h-screen dark:bg-mainBgclr gap-4 bg-lightModeMainBg  text-lightmodemainTextclr dark:text-darkmainTextclr items-center justify-center flex flex-col'>
      
{ curview === 0 && <><p className='font-bold text-mainTextclr text-2xl font-sans'>Login here....</p>
  <p ref={errorref} className={`${errorMsg ? 'text-red-800 bg-red-100 w-[30rem]  flex items-center justify-center mt-6 px-6 py-3 rounded-md':'hidden'}`} aria-live="assertive">{  errorMsg }</p>

      <div className='flex  min-h-fit  flex-col sm:px-6 md:px-10 rounded-lg gap-4 sm:min-w-full md:min-w-[30rem] items-center justify-center'>
        <form onSubmit={formik.handleSubmit} className='w-full'>
        <fieldset className='flex flex-col gap-5 py-4'>
        
          <label className='flex flex-col gap-1  text-sm font-mono '>  
            Email
            <input  placeholder="Enter your email address" id="userName" name="userName" type='email' className='dark:bg-mainBgclr bg-lightModeMainBg  font-semibold rounded-md border-[3px] dark:border-markclr p-3 border-lightModelightBg' onChange={formik.handleChange} value={formik.values.userName}></input>
            {formik.touched.userName && formik.errors.userName?
        (<div style={{fontFamily:'sans-serif',fontStyle:'italic',fontSize:'10px'}}>{formik.errors.userName}</div>):null}
          </label>
          
          <label className='flex flex-col gap-1  text-sm font-mono ' >
            Password
            <input placeholder="Enter your password" type='password' name='password' className='dark:bg-mainBgclr bg-lightModeMainBg  font-semibold rounded-md border-[3px] dark:border-markclr p-3 border-lightModelightBg'  onChange={formik.handleChange} value={formik.values.password}></input>
            {formik.touched.password && formik.errors.password?
            (<div style={{fontFamily:'sans-serif',fontStyle:'italic',fontSize:'10px'}}>{formik.errors.password}</div>):null}
          </label>
        </fieldset>
        <div className='flex items-center w-full justify-center'> 
          <button disabled={loading} type='submit' className=' dark:hover:border-opacity-60  hover:bg-opacity-60 font-[700]  dark:bg-lightBgclr bg-lightModelightBg   border-2  p-3 w-full rounded-lg  font-mono font-bold hover:bg-mainTextclr  dark:border-markclr p-3 border-lightModelightBg focus:border-lightBgclr'>{loading ? 'Logging...' : 'Login'}</button>
        </div>
          
        </form>
        <div className='flex  w-full justify-between items-center font-[700] gap-4  text-xs  '>
           <Link to={'forgot-password'}><p style={{fontStyle:'italic',display:'inline'}} className='hover:opacity-60 dark:hover:text-[#FFF5E3]' onClick={()=>dispatch(changeView(1))}>Forgot password..?</p></Link>
           <p><Link to={'/signUP'}><span style={{fontStyle:'italic',display:'inline'}} className='hover:opacity-60 dark:hover:text-[#FFF5E3]'>SignUp</span></Link></p>

        </div>
      </div></>}
      {curview === 1 && <Outlet/>}
    </section>
   
    </>
  )
}

export default Login