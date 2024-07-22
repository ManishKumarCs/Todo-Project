import React, {useState} from 'react';
import {useEffect} from 'react';
import Button from './Button';

function CartRow({thumbnail,title,price,noOfProduct,handleTotalPrice}){
  const [subtotal,setSubtotal]=useState(0);
   const [count,setCount]=useState(noOfProduct);
  useEffect(function(){
    console.log(price,count); 
    handleTotalPrice(price*count);
  },[count])
  function handleCountValue(event){
    setCount(+event.target.value); 
    setSubtotal(subtotal + price*count);   
  } 
  return( 

    <>
    <tr className="border-b-2">
      <td className=""></td>
      <td className="text-center"><img className="w-24 px-2" src={thumbnail}/></td>
      <td className="text-rose-400 font-bold p-2">{title}</td>
      <td className="text-center p-2">{price}</td>
      <td className="text-center p-2">
        <input className="text-center border justify-self-center w-16 p-2" value={count} onChange={handleCountValue}/>
      </td>
      <td className="text-center p-2">{price*count}</td>
    </tr>
    </>
  );
}
export default CartRow;