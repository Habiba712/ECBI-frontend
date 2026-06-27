'use client'
import Image from "next/image";
import Header from "./components/Header";
import { Children } from "react";
import PointOfSale from "./pages/dashboard/inf/page";
import PointOfSaleOwner from "./pages/dashboard/page";
 export default function Home() {
  const role = JSON.parse(localStorage.getItem("sessionData"))?.role;
  return (
    <div className="flex min-h-screen items-center justify-center font-sans w-full">
      {
        role === "RESTO_SUPER_ADMIN" ? <PointOfSaleOwner /> :  <PointOfSale />
      }
    
     
     </div>
  );
}
