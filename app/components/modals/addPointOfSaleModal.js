


'user client'

import Image from "next/image";
import CloseIcon from "../../../public/svg/close";
import { useState } from "react";
import PrintIcon from "../../../public/svg/print";
import DownloadIcon from "../../../public/svg/download";
import { on } from "events";

export default function AddtPointOfSaleModal({ setIsModalOpen, onSend, data }) {

console.log('data to add', data);
   
    const [pointOfSaleToAdd, setPointOfSaleToAdd] = useState({
       ownerId:data,
        name:'',
        address:{
            city:'',
            country:'',
            state:'',
            street:'',
            zipCode:''
        },
        phone:'',
        cuisine:'',
        coverImage:'',
        description:'',
        status:'',
        website:''
    });
        console.log('point of sale to edit', pointOfSaleToAdd);

    const handleSubmit = async (e)=>{
      e.preventDefault();
        console.log('before sendinf', pointOfSaleToAdd);
setIsModalOpen(false);

        onSend(pointOfSaleToAdd)
       

    }
    return (
        <div className="z-0 w-full mh-100vh bg-black/50 fixed inset-0
        flex items-center justify-center py-8">
            <div className="bg-white w-1/2  h-full rounded-lg p-4 overflow-y-auto scroll-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 ">
                <div className="w-full flex justify-between border-b border-gray-200">
                    <h3 className="text-md font-semibold" style={{
                        'color': 'black'
                    }}>Add a new Point Of Sale</h3>
                    <button
                        onClick={() => setIsModalOpen(false)}
                    >

                        <CloseIcon className="w-5 h-5 cursor-pointer text-gray-400" />
                    </button>
                </div>
                <div className="mt-4 h-fit w-full flex flex-col justify-center items-center">
                    
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
                                value={pointOfSaleToAdd?.name || ""}
                                    onChange={(e) => setPointOfSaleToAdd({...pointOfSaleToAdd, name: e.target.value })}

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

                                    value={pointOfSaleToAdd?.address?.city || ""}
                                    onChange={(e) => setPointOfSaleToAdd({
                                        ...pointOfSaleToAdd,
                                         address: {
                                            ...pointOfSaleToAdd?.address,
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
                                   
                                    value={pointOfSaleToAdd?.address?.country || ""}
 onChange={(e) => setPointOfSaleToAdd({...pointOfSaleToAdd, address: { 
    ...pointOfSaleToAdd.address,
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
                               
                                    value={pointOfSaleToAdd?.address?.state || ""}
     onChange={(e) => setPointOfSaleToAdd({...pointOfSaleToAdd, address: { 
        ...pointOfSaleToAdd.address,
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
                               
                                    value={pointOfSaleToAdd?.address?.street || ""}
     onChange={(e) => setPointOfSaleToAdd({...pointOfSaleToAdd, address: { 
        ...pointOfSaleToAdd.address,
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
                                   
                                    value={pointOfSaleToAdd?.address?.zipCode || ""}
 onChange={(e) => setPointOfSaleToAdd({...pointOfSaleToAdd, address: { 
    ...pointOfSaleToAdd.address,
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
                        

                                    value={pointOfSaleToAdd?.phone || ""}
            onChange={(e) => setPointOfSaleToAdd({...pointOfSaleToAdd, phone: e.target.value})}
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
                                                                
                                    value={pointOfSaleToAdd?.website || ""}
onChange={(e)=>setPointOfSaleToAdd({...pointOfSaleToAdd,website:e.target.value})}

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
                                                              

                                    value={pointOfSaleToAdd?.cuisine || "" }  onChange={(e)=>setPointOfSaleToAdd({...pointOfSaleToAdd, cuisine:e.target.value})}

                                >
                                    <option value="All">All</option>
                                    <option value="Moroccan">Moroccan</option>
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
                            <div className="grid grid-cols-2 w-full">
                                <label
                                    htmlFor="file-upload"
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300">Choose file </label>
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300"
                                    placeholder="Upload an image"
                                    onChange={(e)=>setPointOfSaleToAdd({...pointOfSaleToAdd,coverImage:e.target.value})}

                                />

                                <label>Or <input  id="file-upload" type="text" placeholder="Enter an image URL" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300"
                                  onChange={(e)=>setPointOfSaleToAdd({...pointOfSaleToAdd, coverImage:e.target.value})}
                                /></label>
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
                                    value={pointOfSaleToAdd?.description || ""}
                                      onChange={(e)=>setPointOfSaleToAdd({...pointOfSaleToAdd, description:e.target.value})}

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
                                                    checked={pointOfSaleToAdd?.status === "active"}
                                                    onChange={(e) => setPointOfSaleToAdd({...pointOfSaleToAdd, status: e.target.value })}

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
      checked={pointOfSaleToAdd?.status === "inactive"}
                                                    onChange={(e) => setPointOfSaleToAdd({...pointOfSaleToAdd, 
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
                            >Create</button>
                             <button className="rounded-full bg-white text-blue-500 border border-blue-500 py-2 px-3 w-full text-blue-300 font-semibold cursor-pointer  hover:scale-110 transition-all duration-500 ease-in-out"
                                onClick={() => setIsModalOpen(false)}
                            >Cancel</button>
                        </div>

                    </form>


                </div>

            </div>

        </div>
    )
}