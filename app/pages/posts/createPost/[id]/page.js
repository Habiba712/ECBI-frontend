'use client'
    // console.log('data to add', data);
import { Suspense } from "react";
import AddPost from "../../../../components/modals/addPost";
import AuthWrapper from "../../../../utils/withAuth";

export default function CreatePostPage() {
    return (
       <Suspense fallback={<div>Loading...</div>}>
        <AuthWrapper>
            <AddPost/>
        </AuthWrapper>
       </Suspense>
    
    )
}