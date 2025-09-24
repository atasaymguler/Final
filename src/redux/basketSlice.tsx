import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProductType } from '../types/Type'

export interface BasketSliceType{
    basket : ProductType[]
}

const initialState : BasketSliceType = {
    basket : []
}

const basketSlice = createSlice({
    name : "basket",
    initialState,
    reducers:{
        addProductToBasket : (state:BasketSliceType , action : PayloadAction<ProductType>) => {
           if(state.basket.length==0){
            // Hiç ürün yoksa
            state.basket = [action.payload]
           }
           else{
            //Ürün varsa
            const findProduct = state.basket.find((product:ProductType)=> product.id ===action.payload.id) // Eklenen ürün önceden var mı yok mu kontrol ederiz.
            if(findProduct && action.payload.count && findProduct.count){
                //Bu üründen daha önce eklenmiş
                findProduct.count += action.payload.count
                state.basket = [...state.basket.map((product:ProductType)=> product.id === findProduct.id ? findProduct : product)] // Daha önceden eklenen bir ürünün sayısı arttırıldığında o ürünün id'sini bul ve onun sayısını arttır
            }else{
                //Bu ürün daha önce eklenmemiş
                state.basket = [...state.basket , action.payload]
            }
           }
           localStorage.setItem("basket" , JSON.stringify(state.basket))
        },
        setBasket : (state:BasketSliceType , action : PayloadAction<ProductType[]>) => {
            state.basket = [...action.payload]
        }
    },

})
export const { addProductToBasket,setBasket } = basketSlice.actions

export default basketSlice.reducer