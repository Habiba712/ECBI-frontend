
'use client'
import Image from "next/image";
import thankYou from "../../../public/checked.png";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
export default function ThankYou({id, onClose}) {
    const router = useRouter();
    return (
      <motion.div 
                 className="min-h-screen h-full max-w-md mx-auto z-50 w-full  fixed inset-0 flex items-end sm:items-center justify-center py-8"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setIsModalOpen(false)}
             >
       <div className="min-h-screen h-full max-w-md mx-auto z-0 w-full mh-100vh bg-black/50 fixed inset-0
        flex items-center justify-center py-8">
            <div className="bg-white w-full h-full rounded-lg p-4 overflow-y-auto scroll-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 ">
            
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <Image src={thankYou} alt="thank you" width={100} height={100} className="rounded-full object-cover aspect-square transition-all duration-500 ease-in-out" />
                <h2 className="font-bold text-xl font-sans text-gray-900">Thank you!</h2>
                <p className="text-gray-600 font-semibold"> Your review has been submitted successfully.</p>
                <button className="bg-purple-600 rounded-lg w-[60%] flex items-center justify-center text-white font-semibold py-2 cursor-pointer hover:scale-110 transition-all ease-in-out duration-500"
                    onClick={()=>
                        {
                            router.push(`/pages/pointOfSale/user/${id}`)
                        onClose()
                        }
                        
                    }
                
                >
                    Back to POS Profile 
                </button>
            </div>
            </div>
            </div>  
    </motion.div>
        
    )
}