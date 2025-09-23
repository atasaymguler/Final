import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/appSlice";
import { toast } from "react-toastify";
import productService from "../services/ProductService";
import type { ProductType } from "../types/Type";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegSquareMinus } from "react-icons/fa6";
import Button from "@mui/material/Button";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const[product, setProduct] = useState<ProductType>();
  const [count,setCount] = useState<number>(0)

  const getProductById = async (productId: number) => {
 try {
      dispatch(setLoading(true));
     const product : ProductType =   await productService.getProductById(productId);
     setProduct(product)
    } catch (error:any) {
        toast.error(`Ürün Detayı Çekilirken Hata Oluştu ${error.message}`)
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
   getProductById(Number(id))
  },[]);
  return (
<Container maxWidth="lg">{
    product &&
    <>
    <div style={{ display:"flex",alignItems:"flex-start",marginTop:"60px" , boxShadow:"1px 2px 3px lightgrey" , padding:"10px"}}>
        <div>
        <img  src={product.image} width={250} height={400} />
        </div>
        <div style={{margin:"40px 0 0 60px"}}>
            <div style={{fontFamily:"arial",fontSize:"25px",fontWeight:"bold"}}>{product.title}</div>
            <div style={{fontFamily:"arial",fontSize:"16px",marginTop:"25px",height:"100px"}}>{product.description}</div>
            <div style={{fontFamily:"arial",fontSize:"25px",fontWeight:"bold"}}>{product.price}₺</div>
            <div style={{marginTop:"25px" , display:"flex", alignItems:"center"}}>
    <FaRegPlusSquare onClick={()=> setCount(count+1)} style={{fontSize:"30", cursor:"pointer",marginRight:"15px"}} />
        <span style={{fontSize:"30px",marginRight:"15px",cursor:"not-allowed"}}>{count}</span>
        <FaRegSquareMinus onClick={()=> setCount(count-1)} style={{fontSize:"30", cursor:"pointer",marginRight:"15px"}} />
            </div>
            <div style={{marginTop:"25px"}}>
                <Button size="small" sx={{textTransform:"none"}}  color="info" variant="contained">
                    Sepete Ekle
                </Button >
            </div>
        </div>
    </div>
    </>
    }</Container>
  );
}
