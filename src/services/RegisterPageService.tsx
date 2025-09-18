import type { AxiosResponse } from "axios";
import axios from "../config/Axiosconfig";
import type { UserType } from "../types/Type";

class RegisterPageService {
  register(newUser:UserType) : Promise<any> {
    return new Promise((resolve: any, reject: any) => {
        axios.post("/users",newUser)
        .then((response:AxiosResponse<any, any, {}>)=> resolve(response.data))
        .catch ((error:any)=> reject(error))
    });
  }
}
// Nesne üretip dışarıya açarım.
export default new RegisterPageService();
