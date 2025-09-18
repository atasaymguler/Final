import "../css/RegisterPage.css";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import Button from "@mui/material/Button";
 import { useFormik } from 'formik';
import { registerPageSchema } from "../schemas/RegisterPageSchemas";
import registerPageService from "../services/RegisterPageService";
import type { UserType } from "../types/Type";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

  const navigate = useNavigate();

  const submit = async (values:any,actions:any) => {
   
   try {

    const payload : UserType = {
      id : String(Math.floor(Math.random()*999999)),
      username : values.username,
      password : values.password,
      balance : 1000
    }

  const response = await registerPageService.register(payload) 
  if(response){
    toast.success("Kayıt Başarılı")
    clear()
    navigate("/login")
  }
    
   } catch (error:any) {
    toast.error(`Hata : ${error.message}`)
   }

  }

   const {values,handleBlur,handleChange,resetForm,errors , handleSubmit , touched} = useFormik({
     initialValues: {
     username:"",
     password : ""
     },
     validationSchema : registerPageSchema
     ,
     onSubmit: submit
   });
   
   const clear = () => {
    resetForm()
   }
  return (
    <div className="register">
      <div className="main" >
        <form  onSubmit={handleSubmit}>
          <div className="form-div">
            <TextField
            value={values.username}
            onChange={handleChange}
            sx={{marginBottom:"25px", width:"300px"}}
            onBlur={handleBlur}
              id="username"
          placeholder="Kullanıcı Adı"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                     <IoPersonCircleSharp />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              helperText={errors.username && touched.username && <span style={{color:"#eb4d4b"}}>{errors.username}</span>}
            />
             <TextField
             value={values.password}
             onChange={handleChange}
             onBlur={handleBlur}
              sx={{marginBottom:"25px", width:"300px" }}
              id="password"
          placeholder="Şifre"
          type="password"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                <FaLock />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              helperText={errors.password && touched.password && <span style={{color:"#eb4d4b"}}>{errors.password}</span>}
            />
            <div>
              <Button type="submit" size="small" sx={{textTransform:"none",marginRight:"10px"}} variant="contained" color="info">Kaydol</Button>
              <Button onClick={clear} size="small" sx={{textTransform:"none",backgroundColor:"#e7bf90"}} variant="contained" >Temizle</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
