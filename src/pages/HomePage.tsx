import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { UserType } from "../types/Type";
import { setCurrentUser } from "../redux/appSlice";

export default function HomePage() {
  const dispatch = useDispatch();

  // Sayfa yenilendiği zaman redux'un önbelleği temizlendiği için her sayfa yenilendiğin de storage'den giriş yapmış kullanıcıyı çekmemiz lazım.

  useEffect(() => {
    const result = localStorage.getItem("currentUser");
    if (result) {
      const currentUser: UserType = JSON.parse(result) as UserType; // JSON parse ile data string gelir as ile UserType'a çeviririz.
      dispatch(setCurrentUser(currentUser));
    }
  }, []);
  return <div>HomePage</div>;
}
