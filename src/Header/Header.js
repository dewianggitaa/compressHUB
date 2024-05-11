import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div class='fixed border-slate-400 border-b border-opacity-25 font-bold text-3xl text-white w-full h-16 p-3 pl-5 bg-dark'>
            <Link to="/" class="hover:text-blue">compressHUB</Link>
        </div>
    )
}

export default Header