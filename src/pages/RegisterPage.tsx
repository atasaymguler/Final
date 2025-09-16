import "../css/RegisterPage.css";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import Button from "@mui/material/Button";
export default function RegisterPage() {
  return (
    <div className="register">
      <div className="main" >
        <form action="">
          <div className="form-div">
            <TextField
            sx={{marginBottom:"25px", width:"300px"}}
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
            />
             <TextField
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
            />
            <div>
              <Button size="small" sx={{textTransform:"none",marginRight:"10px"}} variant="contained" color="info">Kaydol</Button>
              <Button size="small" sx={{textTransform:"none",backgroundColor:"#e7bf90"}} variant="contained" >Temizle</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
