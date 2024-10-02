import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div className='flex justify-center items-center flex-col w-full h-screen bg-gradient-to-tr from-green-500 to-blue-500'>
        <Link to="/ingame">
            <div className='ingame text-4xl font-bold text-white bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300 ease-in-out rounded-lg shadow-lg p-4 my-4'>
                Ingame
            </div>
        </Link>
        <Link to="/multiplayer">
            <div className='multiplayer text-4xl font-bold text-white bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out rounded-lg shadow-lg p-4 my-4'>
                Online
            </div>
        </Link>
    </div>

  )
}

export default Home