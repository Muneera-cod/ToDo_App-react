import {useState} from 'react'
import { IconArrowLeft } from '@tabler/icons-react';
import { supabase } from '../../services/supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { changeView } from '../../redux/reducers/View/ViewSlice';
import { useDispatch } from 'react-redux';
function ResetPasswordFrom() {
  const [ password, setPassword ] = useState('');
  const [ repassword, setRepassword ] = useState('')
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);  
  const navigate = useNavigate()
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/'), 2000);
    }
    setIsLoading(false);
  };
  return (
    <>
    <IconArrowLeft onClick={()=>{navigate(-1);dispatch(changeView(0))}} className='absolute top-6 left-4 text-lightmodemainTextclr dark:text-darkmainTextclr '/>
   < div className='min-h-screen max-h-screen  flex flex-col text-lightmodemainTextclr dark:text-darkmainTextclr  items-center  justify-center sm:min-w-full md:min-w-[30rem] md:max-w-1/3 sm:px-6 md:px-14 text-mainTextclr  font-sans'>
     <ToastContainer />
     <h2 className='font-bold text-xl'>Forgot Password</h2>
     <form onSubmit={handleResetPassword} className='flex  min-h-fit flex-col  py-4 rounded-lg gap-4 sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/3 items-center justify-center'>
       <input className='dark:bg-mainBgclr bg-lightModeMainBg  font-semibold w-full rounded-md border-[0.5px]  dark:border-markclr p-3 border-lightModelightBg'
         type="password"
         placeholder="Enter new password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required
       />
        <input className='dark:bg-mainBgclr bg-lightModeMainBg  font-semibold w-full rounded-md border-[0.5px]  dark:border-markclr p-3 border-lightModelightBg'
         type="password"
         placeholder="Re-enter new password"
         value={repassword}
         onChange={(e) => setRepassword(e.target.value)}
         
       />
       <button type="submit" disabled={isLoading} className='dark:hover:border-opacity-60  hover:bg-opacity-60 border-[0.5px] dark:border-markclr p-3 border-lightModelightBg dark:bg-lightBgclr bg-lightModelightBg  px-6 py-2 rounded-md font-bold'>{isLoading ? 'Sending' : 'Reset Password'}</button>
     </form>
     {message && <p>{message}</p>}
   </div>
   </>
  )
}

export default ResetPasswordFrom