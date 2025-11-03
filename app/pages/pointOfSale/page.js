'use client'

import Image from "next/image"
import EditIcon from "../../../public/svg/edit"
import QRCodeIcon from "../../../public/svg/qrCode"
import ViewIcon from "../../../public/svg/view"

export default function PointOfSale() {
    return (
        <section className="mt-4 mx-auto max-w-4xl p-4 text-gray-500  w-full "

        >
            {/* first part */}
            <div className="p-4 text-md flex justify-between items-center w-full">
                <div>
                    <h1 className="font-bold text-md text-2xl text-black">My Restaurant</h1>
                    <p className="text-sm">Manage your restaurant listings</p>
                </div>
                <div>
                    <button className="rounded-lg px-3 py-2 bg-blue-500 text-white font-semibold cursor-pointer hover:scale-110 transition-all ease-in-out duration-500">Add Restaurant </button>
                </div>

            </div>

            {/* second part */}

            <div className="rounded-lg shadow-lg flex flex-col gap-3 justify-between items-start p-4 ">
                <div className="grid grid-cols-2 justify-between">
                    <div className="">
                        <Image src="/fancy_resto_bg.webp" alt="restaurant" width={500} height={500} className="rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-3 w-full flex-grow ">
                        <div className="w-full flex justify-end">
                             <span className=" text-white py-1 px-2 text-center w-fit text-sm font-semibold  rounded-full bg-green-500">Active</span>
                        </div>
                       
                        <h3 className="ml-4 text-black font-semibold">Point Of Sale</h3>
                        <p className="ml-4 text-sm">123 Main St, Downtown</p>
                    </div>

                </div>
                <div className="flex flex-col gap-3 w-full">
                    <div className="grid grid-cols-3 gap-3 items-center">
                        <div className="rounded-lg bg-purple-100 px-3 py-2 w-full flex flex-col justify-center items-center">
                            <span className="font-semibold text-purple-400"> 1200</span>
                            <p className="text-sm">Total Visits</p>

                        </div>
                        <div className="rounded-lg bg-green-100 px-3 py-2 w-full flex flex-col justify-center items-center">
                            <span className="font-semibold text-green-400">4.5</span>
                            <p className="text-sm">Ratings</p>
                        </div>
                        <div className="rounded-lg bg-blue-100 px-3 py-2 w-full flex flex-col justify-center items-center">
                            <span className="font-semibold text-blue-400">120</span>
                            <p className="text-sm">Reviews</p>
                        </div>

                    </div>
                    <div className="grid grid-cols-3 gap-3 items-center items-center">
                        <div className="flex justify-center bg-purple-100 rounded-lg py-1 px-2 text-sm hover:scale-110 transition-all ease-in-out duration-500 cursor-pointer">
                            <button className="flex gap-2 items-center cursor-pointer ">
                                <EditIcon className="w-6 h-6 text-purple-400" />
                                Edit
                            </button>
                        </div>
                        <div className="flex justify-center bg-green-100 rounded-lg py-1 px-2 text-sm hover:scale-110 transition-all ease-in-out duration-500 cursor-pointer">
                            <button className="flex gap-2 items-center cursor-pointer ">
                                <QRCodeIcon className="w-6 h-6 text-green-400" />
                                QR</button>

                        </div>
                        <div className="flex justify-center bg-blue-100 rounded-lg py-1 px-2 text-sm hover:scale-110 transition-all ease-in-out duration-500 cursor-pointer">
                            <button className="flex gap-2 items-center cursor-pointer ">
                                <ViewIcon className="w-6 h-6 text-blue-400" />
                                View</button>

                        </div>

                    </div>

                </div>



            </div>

            <div>

            </div>

        </section>
    )
}