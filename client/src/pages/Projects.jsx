import React from 'react'
import CAllToAction from '../components/CAllToAction';

export default function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl fonr-semibold'>Projects</h1>
      <p className='text-md text-gray-500'>Build fun and engaging projects while learning HTML CSS and Javacript</p>
      <CAllToAction/>
    </div>
  )
}
