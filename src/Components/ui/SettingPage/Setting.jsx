import { IconTrashFilled } from "@tabler/icons-react";
import { useGetUserQuery } from "../../../redux/reducers/Api/authApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorFetch from "../../Pages/ErrorFetch";
import LoadingPage from "../../Pages/LoadingPage"; 
import { toast } from "react-toastify";
import { supabase } from "../../../services/supabaseClient";

function Setting() {
  const { data: user, isError, isLoading,refetch } = useGetUserQuery();
  const [pwd, setPwd] = useState('');
  const [rePwd, setRePwd] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setEmail(user.user_metadata.email || '');
      setFirstName(user.user_metadata.first_name || '');
      setLastName(user.user_metadata.last_name || '');
    }
  }, [user]);

 

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorFetch />;
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setPhoto(file); // Update the state with the selected file
    }
  };

 
   const updateUserProfile=async(field,value)=>{
       if(value.trim() === '' ){
        toast.error("Please enter the field.");
        return;
       }
       try{
       const { error } = await supabase.auth.updateUser({data:{ [field] : value }});
       if(error) throw error;
       toast.success("Profile updated successfully!");
       }
      
       catch(error){
        toast.error("An error occured.",error.message);

       }
   }
   
const updatePassword = async() => {
  if(pwd !== rePwd) {
     toast.error("Passwords do not match.");
     return;
    }
  try{
     const { error } = await supabase.auth.updateUser({ password: pwd });
     if(error) throw error;
     toast.success("Password updated successfully!");
     setPwd('');
     setRePwd('');
   } 
catch(error) {
     toast.error("An error occurred: "+ error.message);
   }
 };
 useEffect(()=>{
  refetch()
},[updatePassword,updateUserProfile])
  return (
    <>
      <p onClick={() => navigate('/')} className="mr-auto font-[700] text-sm opacity-40 hover:opacity-100 text-lightmodemainTextclr dark:text-darkmainTextclr z-20">back</p>

      <div className="flex flex-col w-full  sm:px-2 md:px-6 py-10 ">
        <div className='flex sm:flex-col md:flex-row items-center gap-8 px-12 pb-12 pt-6 sm:justify-center md:justify-between sm:w-full md:w-fit'>
          {user?.user_metadata.photoURL ? (
            <img src={user.user_metadata.photoURL || placeholderimg} className='rounded-full max-w-[150px] max-h-[150px] sm:min-w-[100px] md:min-w-[120px] sm:min-h-[100px] md:min-h-[120px] relative top-20' />
          ) : (
            <div className='flex items-center justify-center text-6xl rounded-full bg-amber-400 max-w-[150px] max-h-[150px] sm:min-w-[100px] md:min-w-[120px] sm:min-h-[100px] md:min-h-[120px]'>
              {user?.user_metadata.email.split('')[0]}
            </div>
          )}
          <input type="file" className="m-auto" onChange={handlePhotoChange} />
        </div>

        <div className="flex w-full sm:flex-col md:flex-row sm:text-sm md:text-md font-[700] gap-6 md:items-center border-b-2 py-2 pt-6 border-lightModelightBg dark:border-lightBgclr">
          <p className="flex-1">First Name</p>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Add First Name" className="dark:bg-lightBgclr bg-lightModelightBg px-4 rounded-md bg-opacity-30 py-2 dark:border-markclr border-lightModelightBg border-[0.5px] text-lightmodemainTextclr dark:text-darkmainTextclr" />
          <button onClick={()=>updateUserProfile('first_name',firstName)} className="dark:bg-lightBgclr bg-lightModelightBg py-2 px-4 rounded-md dark:border-markclr border-lightModelightBg border-[0.5px]">{`${firstName ? 'Update' : 'Add'}`}</button>
        </div>

        <div className="flex w-full sm:flex-col md:flex-row sm:text-sm md:text-md font-[700] gap-6 md:items-center border-b-2 py-2 pt-6 border-lightModelightBg dark:border-lightBgclr">
          <p className="flex-1">Last Name</p>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Add Last Name" className="dark:bg-lightBgclr bg-lightModelightBg px-4 rounded-md bg-opacity-30 py-2 dark:border-markclr border-lightModelightBg border-[0.5px] text-lightmodemainTextclr dark:text-darkmainTextclr" />
          <button onClick={()=>updateUserProfile('last_name',lastName)} className="dark:bg-lightBgclr bg-lightModelightBg py-2 px-4 rounded-md dark:border-markclr border-lightModelightBg border-[0.5px]">{`${lastName ? 'Upadte' : 'Add'}`}</button>
        </div>

        <div className="flex w-full sm:flex-col md:flex-row sm:text-sm md:text-md font-[700] gap-6 md:items-center border-b-2 py-2 sm:pt-16 lg:pt-32 border-lightModelightBg dark:border-lightBgclr">
          <p className="flex-1">Email</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Add Email" className="dark:bg-lightBgclr bg-lightModelightBg px-4 rounded-md bg-opacity-30 py-2 dark:border-markclr border-lightModelightBg border-[0.5px] text-lightmodemainTextclr dark:text-darkmainTextclr" />
          <button onClick={()=>updateUserProfile('email',email)} className="dark:bg-lightBgclr bg-lightModelightBg py-2 px-4 rounded-md dark:border-markclr border-lightModelightBg border-[0.5px]">{`${email ? 'Update' : 'Add'}`}</button>
        </div>

        <div className="flex w-full sm:flex-col xl:flex-row sm:text-sm md:text-md font-[700] gap-6 border-b-2 py-2 sm:pt-16 lg:pt-32 border-lightModelightBg dark:border-lightBgclr">
          <p className="flex-1">Password</p>
          <div className="flex sm:flex-col md:flex-row gap-2 sm:w-full xl:w-fit">
            <input value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Enter new password" className="w-full dark:bg-lightBgclr bg-lightModelightBg px-4 rounded-md bg-opacity-30 py-2 dark:border-markclr border-lightModelightBg border-[0.5px] text-lightmodemainTextclr dark:text-darkmainTextclr" />
            <input value={rePwd} onChange={(e) => setRePwd(e.target.value)} placeholder="Re-Enter Password" className="w-full dark:bg-lightBgclr bg-lightModelightBg px-4 rounded-md bg-opacity-30 py-2 dark:border-markclr border-lightModelightBg border-[0.5px] text-lightmodemainTextclr dark:text-darkmainTextclr" />
          </div>
          <button onClick={()=>updatePassword()} className="sm:w-full md:w-fit dark:bg-lightBgclr bg-lightModelightBg py-2 px-4 rounded-md dark:border-markclr border-lightModelightBg border-[0.5px]">Update</button>
        </div>

        <div className="flex w-full flex-row sm:text-sm md:text-md font-[700] gap-6 items-center justify-between border-b-2 py-2 sm:pt-16 lg:pt-32 border-lightModelightBg dark:border-lightBgclr">
          <p className="flex-1">Delete Account</p>
          <IconTrashFilled className="cursor-pointer" />
        </div>
      </div>
    </>
  );
}

export default Setting;