


"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreatePost() {

    return (
        <section className="mt-4 mx-auto max-w-4xl p-4 text-gray-500  w-full ">
            <div className="p-4 text-md flex justify-between items-center w-full">
                <div>
                    <h1 className="font-bold text-md text-2xl text-black">Create Post</h1>
                    <p className="text-sm">Manage your posts</p>
                </div>
                <div>
                    <button className="rounded-lg px-3 py-2 bg-blue-500 text-white font-semibold cursor-pointer hover:scale-110 transition-all ease-in-out duration-500">Add Post</button>
                </div>

            </div>

        </section>
    )
}