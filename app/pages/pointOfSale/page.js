'use client'

import Image from "next/image"
import EditIcon from "../../../public/svg/edit"
import QRCodeIcon from "../../../public/svg/qrCode"
import ViewIcon from "../../../public/svg/view"
import { useEffect, useState } from "react"
import QRCodeModal from "../../components/modals/qrCode"
import EditPointOfSaleModal from "../../components/modals/editPoinOfSale"

export default function PointOfSale() {
    const session = JSON.parse(localStorage?.getItem("sessionData"));

    const [isModalOpen, setIsModalOpen] = useState(false);
     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [modalData, setModalData] = useState();

    const [pointsOfSaleByOwner, setPointsOfSaleByOwner] = useState();
     const handleShowMOdal = (data) => {
        setModalData(data);
        setIsModalOpen(true);
    }
    const handleShowEditModal = (data)=>{
        setIsEditModalOpen(true);
        setModalData(data);

        
    }
    const handleEditPointOfSale = async (e)=>{
        e.preventDefault();
    }
    const userOwnerId = session?.userId;
    const handleDownloadQRCode = async (e)=>{
        e.preventDefault();
        
    }
    const getPointsOfSaleByOwnerId = async (next,req,res)=>{
       try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pointOfSale/getPointsOfSaleByOwnerId/${userOwnerId}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Authorization': `Bearer ${sessionData.token}`
                    },
                    method: "GET"
                }
            ).then((res) => {
                if (res.ok) {
                    

                    return res.json();
                }
                setPointsOfSaleByOwner(res.json());


            })
            setPointsOfSaleByOwner(res);
        } catch (err) {
            next(err)
        }
    }

    useEffect(()=>{
        getPointsOfSaleByOwnerId();
    },[])
    console.log('points of sale by owner', pointsOfSaleByOwner);
    return (
        <section className="mt-4 mx-auto max-w-4xl p-4 text-gray-500  w-full "

        >
            {/* first part */}
            <div className="p-4 text-md flex justify-between items-center w-full">
                <div>
                    <h1 className="font-bold text-2xl text-black">My Restaurant</h1>
                    <p className="text-sm">Manage your restaurant listings</p>
                </div>
                <div>
                    <button className="rounded-lg px-3 py-2 bg-blue-500 text-white font-semibold cursor-pointer hover:scale-110 transition-all ease-in-out duration-500">Add Restaurant </button>
                </div>

            </div>

            {/* second part */}

{
    pointsOfSaleByOwner && pointsOfSaleByOwner?.length > 0 &&
    pointsOfSaleByOwner.map((item, index)=>{
        return(
             <div 
             key={index || item.id}
             className="mt-4 rounded-lg shadow-lg flex flex-col gap-5 justify-between items-start p-4 w-[100%] h-[100%]">
                <div className="flex justify-between h-full w-full">
                    <div className="h-full w-2/3 flex-grow">
                        <Image src={item.coverImage}alt="restaurant" width={600} height={600} className="rounded-lg h-fit w-full object-cover flex-grow" />
                    </div>
                    <div className=" w-1/3 grid grid-cols-2 gap-3 flex-grow ">
                      
                        <div className=" w-full">
                             <h3 className="ml-4 text-black font-semibold">{item.name}</h3>
                        <div>
                           
                                        <p className="ml-4 text-sm">{item.address.country}</p> <p className="ml-4 text-sm">{item.address.state}</p>
                                         <p className="ml-4 text-sm">{item.address.city}</p> 
                                          <p className="ml-4 text-sm">{item.address.street}</p>
                                           <p className="ml-4 text-sm">{item.address.zipCode}</p>
                                        
                            
                        </div>
                        </div>
                         <div className="w-full  flex justify-end">
                             <span className=" text-white  px-2 flex items-start  w-fit h-fit text-sm font-semibold  rounded-full bg-green-500">{item.status}</span>
                        </div>
                       
                       
                    </div>

                </div>
                <div className="flex flex-col gap-3 w-full">
                    <div className="grid grid-cols-3 gap-3 items-center">
                        <div className="rounded-lg bg-purple-100 px-3 py-2 w-full flex flex-col justify-center items-center">
                            <span className="font-semibold text-purple-400"> {item.stats.totalVisits}</span>
                            <p className="text-sm">Total Visits</p>

                        </div>
                        <div className="rounded-lg bg-green-100 px-3 py-2 w-full flex flex-col justify-center items-center">
                            <span className="font-semibold text-green-400">{item.stats.averageRating}</span>
                            <p className="text-sm">Ratings</p>
                        </div>
                        <div className="rounded-lg bg-blue-100 px-3 py-2 w-full flex flex-col justify-center items-center">
                            <span className="font-semibold text-blue-400">{item.stats.totalReviews}</span>
                            <p className="text-sm">Reviews</p>
                        </div>

                    </div>
                    <div className="grid grid-cols-3 gap-3 items-center items-center">
                        <div className="flex justify-center bg-purple-100 rounded-lg py-1 px-2 text-sm hover:scale-110 transition-all ease-in-out duration-500 ">
                            <button className="flex gap-2 items-center cursor-pointer "
                            onClick={()=>handleShowEditModal(item)}
                            >
                                <EditIcon className="w-6 h-6 text-purple-400" />
                                Edit
                            </button>
                        </div>
                        <div className="flex justify-center bg-green-100 rounded-lg py-1 px-2 text-sm hover:scale-110 transition-all ease-in-out duration-500 ">
                            <button className="flex gap-2 items-center cursor-pointer "
                            onClick={()=>handleShowMOdal(item)}
                            >
                                <QRCodeIcon className="w-6 h-6 text-green-400" />
                                QR</button>

                        </div>
                        <div className="flex justify-center bg-blue-100 rounded-lg py-1 px-2 text-sm hover:scale-110 transition-all ease-in-out duration-500 ">
                            <button className="flex gap-2 items-center cursor-pointer ">
                                <ViewIcon className="w-6 h-6 text-blue-400" />
                                View</button>

                        </div>

                    </div>

                </div>



            </div>
        )
    })
}
           

 {isModalOpen &&
                <QRCodeModal
                    data={modalData}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    onSend={handleDownloadQRCode}
                />}
     {
         isEditModalOpen &&
         <EditPointOfSaleModal
             data={modalData}
             isModalOpen={isEditModalOpen}
             setIsModalOpen={setIsEditModalOpen}
             onSend={handleEditPointOfSale}     
         />
     }

        </section>
    )
}