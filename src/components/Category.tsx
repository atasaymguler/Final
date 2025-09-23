import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import categoryService from '../services/CategoryService';
import { useDispatch } from 'react-redux';
import { setLoading, setProducts } from '../redux/appSlice';
import { toast } from 'react-toastify';
import productService from '../services/ProductService';
import type { ProductType } from '../types/Type';

export default function Category() {
    // Kategorileri ve isimlerini servisten alacaz ve dolduracaz.CategoryService oluştur oraya geç.
    const [categories,setCategories] = useState<string[]>([])
    const dispatch = useDispatch()
    const getAllCategories =async () =>{
        try {
            dispatch(setLoading(true))
         const categories : string[] =  await categoryService.getAllCategories()
        setCategories(categories)
        } catch (error:any) {
            toast.error("Kategori Listesi Getirilirken Hata Oluştur : "+error.message)
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    const handleCategory = async(e:React.ChangeEvent<HTMLInputElement>,categoryName:string) =>{
      try {
        dispatch(setLoading(true))
         if(e.target.checked){
        // Tıklanan kategoriye göre ürün getir
       const products : ProductType[] = await categoryService.getProductsByCategoryName(categoryName)
       dispatch(setProducts(products))
       }else{
        // Tüm ürünleri Getir
        const products : ProductType[] = await productService.getAllProducts()
        dispatch(setProducts(products))
       }
      } catch (error:any) {
        toast.error(`Kategoriye göre ürünler getirilirken hata oluştu : ${error.message}`)
      }
      finally{
          dispatch(setLoading(false))
      }
    }   

    useEffect(() => {
        getAllCategories();
    },[])
  return (
    <div style={{marginTop:"60px",marginLeft:"20px"}}>
    <FormGroup>
        {
        categories&& categories.map((category:string,index:number)=>(
               <FormControlLabel  key={index} control={<Checkbox  onChange={(e : React.ChangeEvent<HTMLInputElement>)=>handleCategory(e,category)} />} label={category} />
        ))
        }
    </FormGroup>
    </div>
  )
        
}
