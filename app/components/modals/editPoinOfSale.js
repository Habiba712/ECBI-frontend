


'user client'

import Image from "next/image";
import CloseIcon from "../../../public/svg/close";
import { useState } from "react";
import PrintIcon from "../../../public/svg/print";
import DownloadIcon from "../../../public/svg/download";
import { on } from "events";
import { motion } from "framer-motion";

export default function EditPointOfSaleModal({ data, setIsModalOpen, onSend }) {
    console.log('data to edit', data);

       const [posPicToAdd, setPosPicToAdd] = useState(null);

    const [pointOfSaleToEdit, setPointOfSaleToEdit] = useState({
        id:data?._id,
        name:data?.name,
        address:{
            city:data?.address?.city,
            country:data?.address?.country,
            state:data?.address?.state,
            street:data?.address?.street,
            zipCode:data?.address?.zipCode
        },
        phone:data?.phone,
        cuisine:data?.cuisine,
        coverImage:data?.coverImage,
        description:data?.description,
        status:data?.status,
        website:data?.website
    });
        console.log('point of sale to edit', pointOfSaleToEdit);

    const handleSubmit = async (e)=>{
      e.preventDefault();
        console.log('before sendinf', pointOfSaleToEdit);
setIsModalOpen(false);

        onSend(pointOfSaleToEdit)
       

    }
    console.log('postpic', posPicToAdd);
    return (
         <motion.div 
                            className="min-h-screen h-full max-w-md mx-auto z-50 w-full  fixed inset-0 flex items-end sm:items-center justify-center py-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                        >
                        <div className="z-0 w-full mh-100vh bg-black/50 fixed inset-0
        flex items-center justify-center py-8">
            <div className="bg-white w-1/2  h-full rounded-lg p-4 overflow-y-auto scroll-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 ">
                <div className="w-full flex justify-between">
                    <h3 className="text-md font-semibold" style={{
                        'color': 'black'
                    }}>Edit Point Of Sale</h3>
                    <button
                        onClick={() => setIsModalOpen(false)}
                    >

                        <CloseIcon className="w-5 h-5 cursor-pointer text-gray-400" />
                    </button>
                </div>
                <div className="mt-4 h-fit w-full flex flex-col justify-center items-center">
                    <h4 className="text-sm font-semibold text-black ">{pointOfSaleToEdit?.name}</h4>
                    <form className="w-full flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col w-full ">
                            <div className="flex items-center">
                                <label className="block text-sm font-medium text-gray-700 text-start">
                                    Name
                                </label>
                            </div>
                            <div className="w-full mt-1 ">
                                <input type="text" placeholder="Enter your point of sale name" className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300"
                                value={pointOfSaleToEdit?.name || ""}
                                    onChange={(e) => setPointOfSaleToEdit({...pointOfSaleToEdit, name: e.target.value })}

                                />
                            </div>

                        </div>

                        <div className="flex flex-col w-full">
                            <div className="flex items-center">
                                <label className="block text-sm font-medium text-gray-700 text-start">
                                    City
                                </label>
                            </div>
                            <div className="w-full">
                                <input type="text" placeholder="Enter your city" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300"

                                    value={pointOfSaleToEdit?.address?.city || ""}
                                    onChange={(e) => setPointOfSaleToEdit({
                                        ...pointOfSaleToEdit,
                                         address: {
                                            ...pointOfSaleToEdit?.address,
                                            city: e.target.value } })}

                                />
                            </div>

                        </div>

                        <div className="flex flex-col w-full">
                            <div className="flex items-center">
                                <label className="block text-sm font-medium text-gray-700 text-start">
                                    Country
                                </label>
                            </div>
                            <div className="w-full">
                                <input type="text" placeholder="Enter your country" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300"
                                   
                                    value={pointOfSaleToEdit?.address?.country || ""}
 onChange={(e) => setPointOfSaleToEdit({...pointOfSaleToEdit, address: { 
    ...pointOfSaleToEdit.address,
    country: e.target.value } })}
                                />
                            </div>

                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex items-center">
                                <label className="block text-sm font-medium text-gray-700 text-start">
                                    State
                                </label>
                            </div>
                            <div className="w-full">
                                <input type="text" placeholder="Enter your state (if any)" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300"
                               
                                    value={pointOfSaleToEdit?.address?.state || ""}
     onChange={(e) => setPointOfSaleToEdit({...pointOfSaleToEdit, address: { 
        ...pointOfSaleToEdit.address,
        state: e.target.value } })}
                                />
                            </div>

                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex items-center">
                                <label className="block text-sm font-medium text-gray-700 text-start">
                                    Street
                                </label>
                            </div>
                            <div className="w-full">
                                <input type="text" placeholder="Enter your street" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300"
                               
                                    value={pointOfSaleToEdit?.address?.street || ""}
     onChange={(e) => setPointOfSaleToEdit({...pointOfSaleToEdit, address: { 
        ...pointOfSaleToEdit.address,
        street: e.target.value } })}
                                />
                            </div>

                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex items-center">
                                <label className="block text-sm font-medium text-gray-700 text-start">
                                    Zip Code
                                </label>
                            </div>
                            <div className="w-full">
                                <input type="text" placeholder="Enter your zip code" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300"
                                   
                                    value={pointOfSaleToEdit?.address?.zipCode || ""}
 onChange={(e) => setPointOfSaleToEdit({...pointOfSaleToEdit, address: { 
    ...pointOfSaleToEdit.address,
    zipCode: e.target.value } })}
                                />
                            </div>

                        </div>

                        <div className="flex flex-col w-full">
                            <div className="flex  items-center">
                                <label className="block text-sm font-medium text-gray-700 text-start">
                                    Phone
                                </label>
                            </div>
                            <div className="w-full">
                                <input type="text" placeholder="Enter your point of sale phone" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300"
                        

                                    value={pointOfSaleToEdit?.phone || ""}
            onChange={(e) => setPointOfSaleToEdit({...pointOfSaleToEdit, phone: e.target.value})}
                                />
                            </div>

                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex  items-center">
                                <label className="block text-sm font-medium text-gray-700 text-start">
                                    Website
                                </label>
                            </div>
                            <div className="w-full">
                                <input type="text" placeholder="Enter your point of sale website" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300"
                                                                
                                    value={pointOfSaleToEdit?.website || ""}
onChange={(e)=>setPointOfSaleToEdit({...pointOfSaleToEdit,website:e.target.value})}

                                />
                            </div>

                        </div>

                        <div className="flex flex-col w-full">
                            <div className="flex items-center ">
                                <label className="block text-sm font-medium text-gray-700 text-start mb-1">
                                    Cuisine Type
                                </label>
                            </div>

                            <div className="w-full">
                                <select
                                                type="text"

                                placeholder="Enter your address" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300"
                                                              

                                    value={pointOfSaleToEdit?.cuisine || "" }  onChange={(e)=>setPointOfSaleToEdit({...pointOfSaleToEdit, cuisine:e.target.value})}

                                >
                                    <option value="All">All</option>
                                    <option value="American">American</option>
                                    <option value="Mexican">Chinese</option>
                                    <option value="Indian">Indian</option>
                                    <option value="Japanese">Japanese</option>
                                    <option value="Korean">Korean</option>
                                    <option value="Mexican">Mexican</option>
                                    <option value="Italian">Italian</option>

                                </select>
                            </div>


                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex  items-center">
                                <label className="block text-sm font-medium text-gray-700 text-start">
                                    Background Image
                                </label>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label
                                    htmlFor="file-upload"
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300">Choose file </label>
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300"
                                    placeholder="Upload an image"
                                    onChange={(e)=>{
                                        const file = e.target.files[0];
                                        if(file){
                                             setPosPicToAdd(URL.createObjectURL(file))
                                        setPointOfSaleToEdit({...pointOfSaleToEdit,coverImage:e.target.value})}}
                                        }
                                       

                                />
                                  

                                <label>Or <input  id="file-upload" type="text" placeholder="Enter an image URL" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300"
                                  onChange={(e)=>setPointOfSaleToEdit({...pointOfSaleToEdit, coverImage:e.target.value})}
                                /></label> {
                                            posPicToAdd && (
                                                
                                                <div className="transition duration-300 ease-in-out w-full flex justify-center bg-purple-50 border-2 border-dashed border-purple-300 rounded-xl text-center p-3 cursor-pointer hover:bg-purple-100 transition">

                                                    <img src={posPicToAdd} alt="Preview Image" className="w-[200px] h-[200px] object-cover aspect-square" />
                                                </div>
                                            )

                                        }
                            </div>

                        </div>

                        <div className="flex flex-col w-full">
                            <div className="flex  items-center">
                                <label className="block text-sm font-medium text-gray-700 text-start">
                                    Description
                                </label>
                            </div>
                            <div className="w-full mt-1">
                                <div className="block w-full" >
                                    <textarea className="w-full h-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300" placeholder="Enter your description" rows="5"
                                    value={pointOfSaleToEdit?.description || ""}
                                      onChange={(e)=>setPointOfSaleToEdit({...pointOfSaleToEdit, description:e.target.value})}

                                    ></textarea>
                                </div>
                            </div>

                        </div>
                        <div className="flex justify-center  w-full ">
                            <div className="flex justify-start w-fit">
                                <div className="flex w-fit items-center ">
                                <label className="block text-sm font-medium text-gray-700 text-start">
                                    Active
                                </label>
                            </div>
                            <div className="w-fit flex items-center">
                                <input type="radio" placeholder="Enter your point of sale phone" className="block w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300"
                                    
                                                   
                                                    name="status"

                                                    
                                                    value="active"
                                                    checked={pointOfSaleToEdit?.status === "active"}
                                                    onChange={(e) => setPointOfSaleToEdit({...pointOfSaleToEdit, status: e.target.value })}

                                />
                            </div> 
                            </div>
                              <div className="flex justify-start  w-fit ">
                                <div className="flex w-fit items-center ">
                                <label className="block text-sm font-medium text-gray-700 text-start">
                                    Inactive
                                </label>
                            </div>
                            <div className="w-fit flex items-center">
                                <input type="radio" placeholder="Enter your point of sale phone" className="block w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300"
                                    
                                                   
                                                    name="status"

                                                         value="inactive"
      checked={pointOfSaleToEdit?.status === "inactive"}
                                                    onChange={(e) => setPointOfSaleToEdit({...pointOfSaleToEdit, 
                                                        'status': e.target.value
                                                     })}

                                />
                            </div> 
                            </div>
                           

                        </div>
                        <div className="flex justify-around w-full mt-3 px-2 text-center items-center gap-3">

                            <button className="rounded-full bg-blue-500 py-2 px-3 w-full text-white font-semibold cursor-pointer
                            hover:scale-110 transition-all duration-500 ease-in-out
                            "
                                type="submit"
                            >Update</button>
                             <button className="rounded-full bg-white text-blue-500 border border-blue-300 py-2 px-3 w-full text-blue-500 font-semibold cursor-pointer  hover:scale-110 transition-all duration-500 ease-in-out"
                                onClick={() => setIsModalOpen(false)}
                            >Cancel</button>
                        </div>

                    </form>


                </div>

            </div>

        </div>       
                        </motion.div>
     
    )
}