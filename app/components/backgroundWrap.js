// app/BackgroundWrapper.jsx
'use client'
import { usePathname } from 'next/navigation'
import bg_image from '../../public/fancy_resto_bg.webp'
export default function BackgroundWrapper({ children }) {
  const pathname = usePathname();
  if(pathname.includes("/register") || pathname.includes("/login") || pathname.includes("/createOwner") || pathname.includes("/password")){
return (
   <div
     
  className="w-full h-full px-4 py-3 flex justify-center items-center bg-[linear-gradient(135deg,#6D5BFF_0%,#8A7CFF_35%,#A78BFA_70%,#60A5FA_100%)]"
    >
      {children}
    </div>
   
  )


  
}
}
