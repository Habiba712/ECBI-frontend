
'user client'

import Image from "next/image";
import CloseIcon from "../../../public/svg/close";
import { useState } from "react";
import PrintIcon from "../../../public/svg/print";
import DownloadIcon from "../../../public/svg/download";

export default function QRCodeModal({data, setIsModalOpen, onSend}){
    console.log('review', data);

    const [reply, setReply] = useState("");

 const handleDowmload = ()=>{

    const link = document.createElement('a');
    link.href= data.qrCodeData;
    link.download =`${data.name || "point of sale"}-qr-code-png`;
    link.click();
 }
   const handlePrint = ()=>{
   const printWindow= window.open('','_blank');
   printWindow.document.write(`
     <html>
        <head><title>Print QR Code</title></head>
        <body style="display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
          <img src="${data.qrCodeData}" alt="QR Code" style="max-width:80%;height:auto;"/>
          <script>
            window.onload = function() { window.print(); window.onafterprint = () => window.close(); };
          <\/script>
        </body>
      </html>
    `)
printWindow.document.close();
   }
    return(
        <div className="z-0 w-full mh-100vh bg-black/50 fixed inset-0 
        flex items-center justify-center ">
            <div className="bg-white w-1/2 h-1/2 w-fit h-fit rounded-lg p-4">
                 <div className="w-full flex justify-between">
                                  <h3 className="text-md font-semibold" style={{
                                      'color':'black'
                                  }}>Reply To Review</h3>
                                  <button 
                                  onClick={()=>setIsModalOpen(false)}
                                  >
              
                                  <CloseIcon className="w-5 h-5 cursor-pointer text-gray-400" />
                                  </button>
                              </div>
                <div className="mt-4 h-fit flex flex-col justify-center items-center">
                    <h4 className="text-sm font-semibold text-black ">{data.name}</h4>
                    <p>Print this QR code and display it at your restaurant entrance</p>
                   <div
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
                        </div>
                </div>
               
            </div>
          
        </div>
    )
}