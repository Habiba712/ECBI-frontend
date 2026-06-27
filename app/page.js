'use client'
import Image from "next/image";
import Header from "./components/Header";
import { Children } from "react";
import PointOfSale from "./pages/dashboard/inf/page";
import PointOfSaleOwner from "./pages/dashboard/page";
 export default function Home() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
   useEffect(() => {
          const session = JSON.parse(localStorage.getItem("sessionData")) || null;
           setUserId(session?.userId);
          setToken(session?.token);
          setRole(session?.role);
      }, []);
  return (
    <div className="flex min-h-screen items-center justify-center font-sans w-full">
      {
        role === "RESTO_SUPER_ADMIN" ? <PointOfSaleOwner /> :  <PointOfSale />
      }
    
     
     </div>
  );
}
