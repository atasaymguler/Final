  import { ToastContainer } from 'react-toastify';
import './App.css'
import RouterConfig from './config/RouterConfig'
import Spinner from './components/Spinner';

function App() {

  return (
    <>
     
     <RouterConfig />
     <ToastContainer autoClose={2000} position='top-right' style={{fontSize:"13px"}} />
     <Spinner />
    </>
  )
}

export default App
