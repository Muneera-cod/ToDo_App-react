import {useState} from 'react'
import { SupabaseClient } from '@supabase/supabase-js';
import { IconArrowLeft } from '@tabler/icons-react';
import { supabase } from '../../services/supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { changeView } from '../../redux/reducers/View/ViewSlice';
import { useDispatch } from 'react-redux';
function ForgetPwdForm() {
    const [email, setEmail] = useState('');
      const [message, setMessage] = useState('');
     const navigate = useNavigate()
   
     const dispatch=useDispatch()
      const handleResetPassword = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
          setMessage(`Error: ${error.message}`);
          toast.error(error.message);
        } else {
          setMessage('Password reset email sent successfully!');
          toast.success('Password reset email sent successfully!');
        }
      };
  return (
    
      
    
         <>
         <IconArrowLeft onClick={()=>{navigate(-1);dispatch(changeView(0))}} className='absolute top-6 left-4 text-lightmodemainTextclr dark:text-darkmainTextclr '/>
        < div className='flex flex-col text-lightmodemainTextclr dark:text-darkmainTextclr  items-start sm:min-w-full md:min-w-[30rem] md:max-w-1/3 sm:px-6 md:px-14 text-mainTextclr  font-sans'>
          <ToastContainer />
          <h2 className='font-bold text-xl'>Forgot Password</h2>
          <form onSubmit={handleResetPassword} className='flex  min-h-fit flex-col  py-4 rounded-lg gap-4 w-full items-center justify-center'>
            <input className='dark:bg-mainBgclr bg-lightModeMainBg  font-semibold w-full rounded-md border-[0.5px]  dark:border-markclr p-3 border-lightModelightBg'
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className=' dark:hover:border-opacity-60  hover:bg-opacity-60 border-[0.5px] dark:border-markclr p-3 border-lightModelightBg dark:bg-lightBgclr bg-lightModelightBg  px-6 py-2 rounded-md font-bold'>Reset Password</button>
          </form>
          {message && <p>{message}</p>}
        </div>
        </>
      );
    };
    
   
    


export default ForgetPwdForm