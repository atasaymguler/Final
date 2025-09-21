import axios, { type AxiosResponse } from "axios" // Bizim normal axios'u kullanırız çünkü axios create ile oluşturduğumuz localhost:5000'e istek atar ama ürünler url'si farklı.
import type { ProductType } from "../types/Type"
class ProductService{

    BASE_URL="https://fakestoreapi.com"

    getAllProducts():Promise<ProductType[]>{

        return new Promise((resolve:any,reject:any)=>{

            axios.get(`${this.BASE_URL}/products`)
            .then((response:AxiosResponse<any, any, {}>)=> resolve(response.data))
            .catch((error:any)=> reject(error))

        })

    }

}
export default new ProductService()