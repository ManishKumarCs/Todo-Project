import React from 'react';
import { IoHomeOutline, IoCartOutline} from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import {Link} from 'react-router-dom'
function Header({cartCount}) {
  return (
    <div className="flex justify-between max-w-6xl mx-auto py-1 gap-16 bg-white md:max-h-16 my-2 px-6 md:px-2">
     <img className="md:w-2/12 w-3/12 object-cover" src="https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo-640x400.png"/> 
       <Link className="flex flex-col items-center hover:border-b-2 border-rose-500 justify-center relative" to="/cart">
         {cartCount>0 && <div className=" border-2 border-white bg-rose-600 px-2 text-white absolute -right-2 -top-1 rounded-full">{cartCount}</div>}
         <IoCartOutline className="text-2xl md:text-4xl"/>
       </Link>
      </div>
  );
}

export default Header;