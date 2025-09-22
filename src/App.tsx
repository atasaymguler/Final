  import { ToastContainer } from 'react-toastify';
import './App.css'
import RouterConfig from './config/RouterConfig'
import Spinner from './components/Spinner';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';

function App() {

  const {currentUser} = useSelector((state:RootState)=>state.app)
  
  return (
    <>
    {
      currentUser &&  <Navbar /> 
    }
    
     <RouterConfig />
     <ToastContainer autoClose={2000} position='top-right' style={{fontSize:"13px"}} />
     <Spinner />
    </>
  )
}

export default App
