import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between p-5 pl-24 bg-gray-100 text-lg pt-6 pb-6'>
    <div className=''>Logo</div>
    <nav >
        <ul className='flex flex-row space-x-12 pr-10 font-medium'>
            <li><a href='/'>Home</a></li>
            <li><a href='/about'>About Us</a></li>
            <li><a href='/ourofferings'>Our Offerings</a></li>
            <li><a href='/contact'>Contact</a></li>
            <li><a href='/contact' className='bg-black text-white px-4 py-3 rounded-md text-sm'>Login</a></li>
        </ul>
    </nav>
    </div>
  )
}

export default Header