


'user client'

import Image from "next/image";
import CloseIcon from "../../../public/svg/close";
import { useState } from "react";
import PrintIcon from "../../../public/svg/print";
import DownloadIcon from "../../../public/svg/download";

export default function EditPointOfSaleModal({data, setIsModalOpen, onSend}){
    console.log('review', data);

    const [reply, setReply] = useState("");

    return(
        <div className="z-0 w-full mh-100vh bg-black/50 fixed inset-0 
        flex items-center justify-center ">
            <div className="bg-white w-1/2 h-100 rounded-lg p-4 overflow-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100">
                 <div className="w-full flex justify-between">
                                  <h3 className="text-md font-semibold" style={{
                                      'color':'black'
                                  }}>Edit Point Of Sale</h3>
                                  <button 
                                  onClick={()=>setIsModalOpen(false)}
                                  >
              
                                  <CloseIcon className="w-5 h-5 cursor-pointer text-gray-400" />
                                  </button>
                              </div>
                <div className="mt-4 h-fit w-full flex flex-col justify-center items-center">
                    <h4 className="text-sm font-semibold text-black ">{data.name}</h4>
                    <form className="w-full flex flex-col gap-4">
                        <div className="flex flex-col w-full ">
                            <div className="flex items-center">
                                 <label className="block text-sm font-medium text-gray-700 text-start">
                                Name
                            </label>
                            </div>
                           <div className="w-full">
                            <input type="text" placeholder="Enter your point of sale name" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300" />
                           </div>
                            
                        </div>

                         <div className="flex flex-col w-full">
                            <div className="flex items-center">
                                 <label className="block text-sm font-medium text-gray-700 text-start">
                                Address
                            </label>
                            </div>
                           <div className="w-full">
                            <input type="text" placeholder="Enter your address" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300" />
                           </div>
                            
                        </div>

                         <div className="flex flex-col w-full">
                            <div className="flex  items-center">
                                 <label className="block text-sm font-medium text-gray-700 text-start">
                                Phone 
                            </label>
                            </div>
                           <div className="w-full">
                            <input type="text" placeholder="Enter your point of sale phone" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300" />
                           </div>
                            
                        </div>

                         <div className="flex flex-col w-full">
                            <div className="flex items-center ">
                                 <label className="block text-sm font-medium text-gray-700 text-start">
                                Cuisine Type
                            </label>
                            </div>
                           <div className="w-full">
                            <select type="text" placeholder="Enter your address" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300">
                                    <option value="0">All</option>
                                    <option value="1">American</option>
                                    <option value="2">Chinese</option>
                                    <option value="3">Indian</option>
                                    <option value="4">Japanese</option>
                                    <option value="5">Korean</option>
                                    <option value="6">Mexican</option>      

                            </select>
                           </div>

                            <div className="flex flex-col w-full">
                            <div className="flex  items-center">
                                 <label className="block text-sm font-medium text-gray-700 text-start">
                                Description 
                            </label>
                            </div>
                           <div className="w-full">
                            <textarea type="text" placeholder="Enter your point of sale phone" className="mt-1 block w-full min-h-[150px] rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300" />
                           </div>
                            
                        </div>

                           <div className="flex flex-col w-full">
                            <div className="flex  items-center">
                                 <label className="block text-sm font-medium text-gray-700 text-start">
                                Description 
                            </label>
                            </div>
                           <div className="w-full">
                            <div  className="mt-1 block w-full min-h-[150px] rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300" >
                                <Image src={''} alt="restaurant" width={600} height={600} className="rounded-lg h-fit w-full object-cover flex-grow" />
                            </div>
                           </div>
                            
                        </div>
                            
                        </div>
                    </form>
                   
                   {/* <div
                   className="mt-2 border-2 border-gray-200 rounded-lg  p-4"
                   ><Image src={data.qrCodeData} alt="qr code" width={200} height={200} className="rounded-lg" />
                    </div> 
                    <div className="bg-blue-100 rounded-lg p-4 text-sm mt-3">💡 How it works:
                        <ul className="text-gray-800">
                            
<li>• Customers scan this QR code with their phone</li>
<li>• They automatically check in to your restaurant</li>
<li>• They earn points and can leave reviews</li>
<li>• You get more visibility and customer engagement!</li>
                        </ul>
                    </div>
                   <div className="flex justify-center w-full mt-3 px-2 text-center items-center gap-3">
                           
                            <button className="rounded-full bg-blue-300 py-2 px-3 w-full flex justify-center gap-2 text-white font-semibold cursor-pointer hover:scale-110 transition-all ease-in-out duration-500 text-nowrap"
                            type="sumbit"
                            onClick={()=>handlePrint()}
                            >Print 
                            <PrintIcon/>
                            </button> <button className="rounded-full bg-white text-blue-300 border border-blue-300 py-2 px-3 w-full flex justify-center gap-2 text-blue-300 font-semibold cursor-pointer hover:scale-110 transition-all ease-in-out duration-500 text-nowrap"
                            onClick={()=>handleDowmload()}
                            >Download <DownloadIcon/></button>
                        </div> */}
                </div>
               
            </div>
          
        </div>
    )
}