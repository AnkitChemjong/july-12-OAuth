import React,{useContext} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/Auth.jsx';

const Navbar = () => {
    const {user,logout}=useContext(AuthContext);
    const navigate=useNavigate();
  return (
    <div>
      <nav className="bg-gray-800">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      
        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Open main menu</span>
         
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
       
          <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex flex-shrink-0 items-center">
          <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/>
        </div>
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            <Link to='/' className='rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'>Home</Link>
          
          </div>
        </div>
      </div>
        {user===null? 
          (
            <div className="flex space-x-4">
            <Link to='/login' className='rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'>Log in</Link>
          
          </div>
          ):
          (
            <div className="flex space-x-4">
           
            <button onClick={(e)=>{
                logout(e)
             navigate('/')
             }} className='rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'>Logout</button>
          </div>
          

          )

        }
    </div>
  </div>

</nav>

    </div>
  )
}

export default Navbar
