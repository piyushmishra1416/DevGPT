import React from 'react'
import chatgpt from "../assets/chatgpt.svg"
import EditNoteIcon from '@mui/icons-material/EditNote';

export const Header = () => {
  return (
    <nav className=' bg-black w-[20%] text-white flex  items-center fixed p-4 space-x-5'>
      <img src={chatgpt} className='h-[40px] w-[40px]'/>
      <p className='flex-grow font-poppins'>
         New Chat
      </p>
      <EditNoteIcon fontSize='large' className='flex-end'/>

    </nav>
  )
}
