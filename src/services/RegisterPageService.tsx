import type { AxiosResponse } from "axios";
import axios from "../config/Axiosconfig";
import type { UserType } from "../types/Type";

// Bizim axios ile oluşturduğumuz instance bu yüzden istenilen ismi veririz artık normal axios'u çağırmayız.

class RegisterPageService {
  register(newUser:UserType) : Promise<UserType> {
    return new Promise((resolve: any, reject: any) => {
        axios.post("/users",newUser)
        .then((response:AxiosResponse<any, any, {}>)=> resolve(response.data))
        .catch ((error:any)=> reject(error))
    });
  }
}
// Nesne üretip dışarıya açarım.
export default new RegisterPageService();
