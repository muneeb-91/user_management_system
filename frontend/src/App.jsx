import {Routes, Route, Navigate} from 'react-router-dom';
import {useAuthStore} from './store/useAuthStore.js'
import { useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Loader2 } from 'lucide-react';
import {Toaster} from 'react-hot-toast';

function App() {
  const {checkAuth, authUser, isAuthenticating} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  }, [checkAuth]);

  if(isAuthenticating && !authUser){
    return(
      <div className='h-screen flex items-center justify-center'>
        <Loader2 className='size-10 animate-spin'/>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to='/login'/>}/>
        <Route path='/login' element={!authUser ? <Login/> : <Navigate to='/'/>}/>
        <Route path='/signup' element={!authUser ? <Signup/> : <Navigate to='/'/>}/>
      </Routes>

      <Toaster/>
    </>
  )
}

export default App