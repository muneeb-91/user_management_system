import {useAuthStore} from '../store/useAuthStore.js';
import AdminDashboard from '../components/AdminDashboard';
import UserDashboard from '../components/UserDashboard';
import { Loader } from 'lucide-react';

const Home = () => {
  const {authUser, isAuthenticating} = useAuthStore();

  if(isAuthenticating){
    return(
      <div className='flex items-center justify-center'>
        <Loader size='10' className='animate-spin'/>
      </div>
    )
  }

  if(!authUser){
    return(
      <div className='text-center mt-10 truncate text-gray-600'>
        No user is logged in.
      </div>
    )
  }

  if(authUser && !isAuthenticating){ 
  return (
    <div className='min-h-screen'>
      {authUser?.role === 'user' ? <UserDashboard /> : <AdminDashboard/> }
    </div>
  )
}
}

export default Home