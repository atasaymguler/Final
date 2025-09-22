import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MagarIcon from "../images/magara.png";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/appSlice";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
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
            gap:"10px"
          }}
        >
          <TextField
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
          <Button onClick={logout} sx={{ textTransform: "none",color: "lightgrey" ,cursor:"pointer"}} color="inherit">
            Çıkış Yap
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
