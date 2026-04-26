'use client'

import SearchIcon from "../../../public/svg/search"



export default function Notifications() {

    return (
       <section className="min-h-screen h-full max-w-md mx-auto flex flex-col  overflow-scroll w-full mb-20">
            <div className="p-4 flex justify-between items-center dashboard-page mb-5 mt-5 border-b-1 border-gray-100">

<div >
         <h2 className="font-semibold font-sans text-xl align-middle">
                Notifications
            </h2>
</div>
             
                <div className="align-center">
                                <SearchIcon className="w-6 h-6 cursor-pointer"/>
                            </div>

            </div>

          
        </section>
    )
}