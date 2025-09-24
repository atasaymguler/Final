  import { ToastContainer } from 'react-toastify';
import './App.css'
import RouterConfig from './config/RouterConfig'
import Spinner from './components/Spinner';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import type { ProductType, UserType } from './types/Type';
import productService from './services/ProductService';
import { setCurrentUser, setProducts } from './redux/appSlice';
import { useEffect } from 'react';
import { addProductToBasket, setBasket } from './redux/basketSlice';

function App() {

  const {currentUser} = useSelector((state:RootState)=>state.app)
  // Sayfa tekrardan yüklediğinde tüm bilgilerim kayboluyor.Ürünler ve kişi
  const dispatch = useDispatch()

  const getAllProducts = async() =>{
    const products : ProductType[] = await productService.getAllProducts()
    dispatch(setProducts(products))
  }
  useEffect(()=>{
    getAllProducts()
  },[])
  useEffect(()=>{
    const currentUserString:string|null = localStorage.getItem("currentUser")
    if(currentUserString){
      const currentUser : UserType = JSON.parse(currentUserString) as UserType;
      dispatch(setCurrentUser(currentUser))
    }
  },[])
  useEffect(()=>{
    const basketString : string | null = localStorage.getItem("basket");
    if(basketString){
      const basket : ProductType[] = JSON.parse(basketString) as ProductType[];
      dispatch(setBasket(basket))
    }
  },[])
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
