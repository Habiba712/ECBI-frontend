

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
export default function CreatePostForPos() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const {id}= useParams();
    console.log('point of sale id', id);

    return(
        <div>
            {
        isModalOpen ? <AddPost/> : null
       }
        </div>
        
    )
}