import "../css/LoginPage.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { registerPageSchema } from "../schemas/RegisterPageSchemas";
import type { UserType } from "../types/Type";
import loginPageService from "../services/LoginPageService";
import { useDispatch } from "react-redux";
import { setCurrentUser, setLoading } from "../redux/appSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface CheckUserType {
  result: boolean;
  currentUser: UserType | null;
}

export default function LoginPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const checkUser = (
    userList: UserType[],
    username: String,
    password: string
  ) => {
    const response: CheckUserType = { result: false, currentUser: null };
    userList.forEach((user: UserType) => {
      if (user.password === password && user.username === username) {
        response.currentUser = user;
        response.result = true;
      }
    });
    return response;
  };

  const submit = async (values: any, action: any) => {
    try {
      dispatch(setLoading(true));
      let response: UserType[] = await loginPageService.login();
      if (response) {
        const checkUserResponse: CheckUserType = checkUser(
          response,
          values.username,
          values.password
        );
        if (checkUserResponse.result && checkUserResponse.currentUser) {
 
          toast.success("Giriş Başarılı")
          dispatch(setCurrentUser(checkUserResponse.currentUser));
          localStorage.setItem("currentUser", JSON.stringify(checkUserResponse.currentUser))
          navigate("/");
        } else {
      
          toast.error("Kullanıcı adı veya şifre yanlış");
        }
      }
    } catch (error: any) {
      toast.error(`Giriş Yapılırken Hata Oluştu : ${error.message}`);
    } finally {
    
      dispatch(setLoading(false));
    }
  };

  const {
    values,
    handleBlur,
    handleChange,
    resetForm,
    errors,
    handleSubmit,
    touched,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: registerPageSchema,
    onSubmit: submit,
  });

  const clear = () => {
    resetForm();
  };
  return (
    <div className="login">
      <div className="main">
        <form onSubmit={handleSubmit}>
          <div className="form-div">
            <TextField
              value={values.username}
              onChange={handleChange}
              sx={{ marginBottom: "25px", width: "300px" }}
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
              helperText={
                errors.username &&
                touched.username && (
                  <span style={{ color: "#eb4d4b" }}>{errors.username}</span>
                )
              }
            />
            <TextField
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ marginBottom: "25px", width: "300px" }}
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
              helperText={
                errors.password &&
                touched.password && (
                  <span style={{ color: "#eb4d4b" }}>{errors.password}</span>
                )
              }
            />
            <div>
              <Button
                type="submit"
                size="small"
                sx={{ textTransform: "none", marginRight: "10px" }}
                variant="contained"
                color="info"
              >
                Giriş Yap
              </Button>
              <Button
                onClick={clear}
                size="small"
                sx={{ textTransform: "none", backgroundColor: "#e7bf90" }}
                variant="contained"
              >
                Temizle
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
