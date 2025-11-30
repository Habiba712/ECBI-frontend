'use client'

import SearchIcon from "../../../../public/svg/search"
import { useState } from "react";
import AddPost from "../../../components/modals/addPost";
export default function PointOfSale() {


const handleClick = ()=>{
setIsModalOpen(true);
}
    return (
        <section className="min-h-screen h-full max-w-md mx-auto flex flex-col   overflow-scroll mb-10 w-full"

        >
              <div className="inf-dash-top fixed top-0 max-w-md mx-auto w-full ">
                <div>
                     <h1 className="font-semibold text-2xl font-sans
                 ">ECBI Feed</h1>
                <p className="">Discover what's happening at local spots.</p>
                </div>
                <div>
                    <SearchIcon className="w-6 h-6 text-white cursor-pointer"/>
                </div>
               
            </div>
            <div className="mt-30">
                <button 
                onClick={()=>handleClick()}
                className="rounded-full bg-gradient-to-r from-purple-700 to-blue-700 px-4 py-2 cursor-pointer text-white font-semibold hover:scale-110 transition-all duration-500 ease-in-out">
                    Create New Post
                </button>
            </div>
           

          
        </section>
       
    )
}