  import { ToastContainer } from 'react-toastify';
import './App.css'
import RouterConfig from './config/RouterConfig'

function App() {

  return (
    <>
     
     <RouterConfig />
     <ToastContainer autoClose={2000} position='top-right' style={{fontSize:"13px"}} />
    </>
  )
}

export default App
