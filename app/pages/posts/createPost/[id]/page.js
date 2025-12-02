'use client'
    // console.log('data to add', data);
import { Suspense } from "react";
import AddPost from "../../../../components/modals/addPost";

export default function CreatePostPage() {
    return (
       <Suspense fallback={<div>Loading...</div>}>
        <AddPost/>


       </Suspense>
    
    )
}