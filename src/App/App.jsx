import  { useEffect, useMemo , useState } from 'react'
import { mainrouter } from '../config/Routes/Routes'
import { unauthRouter } from '../config/Routes/UnauthRoutes'
import { RouterProvider } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetUserQuery } from '../redux/reducers/Api/authApi'
import { supabase } from '../services/supabaseClient'
import LoadingPage from '../Components/Pages/LoadingPage'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'
function App() {
  const isDarkmode=useSelector((state)=>state.theme.isDarkmode)
  console.log('isDarkmode', isDarkmode)
  const [user, setUser] = useState(null)
  const[loading,setLoading] = useState(false)
  useEffect(() => {
    if (isDarkmode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkmode])
  useEffect(() => {
    setLoading(true)
    const fetchUser = async () => {
      try{
      const { data: { session } } = await supabase.auth.getSession();

      setUser(session?.user || null)
    }

      catch(error){
         console.log('ERROR OCCURED')
         window.alert('error')
      }
     
    };

    fetchUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user);
        console.log('signedIn block')

      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        console.log('signedOut block')

         
      }
    });
    
  
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const { data: userData, isLoading: userLoading, isError: userError,refetch } = useGetUserQuery();

  useEffect(() => {
   refetch()
   setLoading(false)
  }, [user]);

  const router = useMemo(() => {
    if (user) {
      return mainrouter
    }
    else{
    return unauthRouter
  }
  }, [user])
  
  console.log('user', user)

 if (loading || userLoading) {
  return <LoadingPage/>;
}


  return (
     <>
     <ToastContainer/>
      <RouterProvider router={router}></RouterProvider>
      </>
    
  )
}

export default App
