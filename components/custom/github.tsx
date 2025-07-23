"use client"
import React from 'react'
import { GithubIcon } from "lucide-react"
const Github = () => {
    return (
        <button className='flex flex-row w-fit px-4 py-3 bg-black  text-white font-medium rounded-lg cursor-pointer'>
            <GithubIcon />
            Sign up with github
        </button>
    )
}

export default Github
