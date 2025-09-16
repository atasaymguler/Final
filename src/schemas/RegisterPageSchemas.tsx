import * as yup from 'yup'

export const registerPageSchema = yup.object().shape({
    username : yup.string().required("Kullanıcı Adı Boş Olamaz").min(5,"Kullanıcı Adı En Az 5 Karakterli Olmalı"),
    password : yup.string().required("Şifre Boş Olamaz").min(6,"Şifre En Az 6 Karakterli Olmalı")
})