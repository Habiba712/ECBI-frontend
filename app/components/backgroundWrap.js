// app/BackgroundWrapper.jsx
'use client'
import { usePathname } from 'next/navigation'
import bg_image from '../../public/fancy_resto_bg.webp'
export default function BackgroundWrapper({ children }) {
  const pathname = usePathname();
  if(pathname.includes("/register") || pathname.includes("/login") || pathname.includes("/createOwner") || pathname.includes("/password")){
return (
   <div
     style={{
   
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.36), rgba(0, 0, 0, 0.83)), url(${bg_image.src})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center center',
    minHeight: '100vh',


  }}
  className='flex justify-center items-center'
    >
      {children}
    </div>
   
  )


  
}
else{
  return (
    <div
      
      className='flex justify-center items-center'
    >
      {children}
    </div>

  )

}}
