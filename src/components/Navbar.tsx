import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MagarIcon from "../images/magara.png";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts, setCurrentUser, setProducts } from "../redux/appSlice";
import { toast } from "react-toastify";
import productService from "../services/ProductService";
import type { ProductType } from "../types/Type";
import { FaShoppingBasket } from "react-icons/fa";
import Badge from "@mui/material/Badge";
import type { RootState } from "../redux/store";

export default function Navbar() {
  const {basket} = useSelector((state:RootState)=>state.basket)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleFilter = async (e:React.ChangeEvent<HTMLInputElement>) =>{
   try {
    if(e.target.value){
      //Filtreleme yapılıyor
      dispatch(filterProducts(e.target.value))
    }
    else{
      //Filtreleme yok bütün ürünleri getir
      const products :ProductType[] = await productService.getAllProducts()
      dispatch(setProducts(products))
    }
    
   } catch (error:any) {
    toast.error(`Ürünleri filtrelerken hata oluştur : ${error.message}`)
   }
  }
  const logout = () => {
    localStorage.removeItem("currentUser");
    dispatch(setCurrentUser(null))
    navigate("/login")
    toast.success("Çikiş Yapıldı")
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "#454242" }}>
      <Toolbar>
        <IconButton
          onClick={() => navigate("/")}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <img src={MagarIcon} height="60px" width="60px" />
        </IconButton>
        <Typography
          onClick={() => navigate("/")}
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
        >
          Magara Yol
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap:"15px"
          }}
        >
          <TextField
          onChange={(e:React.ChangeEvent<HTMLInputElement> )=> handleFilter(e)}
            sx={{ width: "300px", color: "#fff" }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
                // textfield'in style'ını buradan veririz. slotProps içinde input
                style: { color: "lightgrey" , borderBottom:"1px solid lightgrey"},
              },
            }}
            id="searchInput"
            placeholder="Bir Şey Ara"
            variant="standard"
          />
             <Badge style={{cursor:"pointer"}} badgeContent={basket.length} color="primary">
          <FaShoppingBasket style={{fontSize:"18px"}} />
          </Badge>
          <Button onClick={logout} sx={{ textTransform: "none",color: "lightgrey" ,cursor:"pointer"}} color="inherit">
            Çıkış Yap
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
