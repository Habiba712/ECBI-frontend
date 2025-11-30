'use client'

import SearchIcon from "../../../../public/svg/search"



export default function PointOfSale() {
    return (
        <section className="min-h-screen h-full max-w-md mx-auto flex flex-col   overflow-scroll mb-10 max-w-md mx-auto w-full"

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
           

          
        </section>
    )
}