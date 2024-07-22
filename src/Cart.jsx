import React,{useState,useEffect} from 'react';
import {getProductData} from './api';
import Loading from './Loading';
import CartRow from './CartRow';
import EmptyCart from './EmptyCart';
import Button from './Button';
import BackButton from './BackButton';

function Cart({cart}) {
  const [data,setData]=useState([]);
  const [totalPrice,setTotalPrice]=useState(0);
  const [loading,setLoading]=useState(true);
  useEffect(function(){
    const promises = Object.keys(cart).map(function(productId){
     
      return getProductData(productId);
    });
    const allPromises = Promise.all(promises);
      allPromises.then(function(response){
      setData(response);
      setLoading(false);
    }
    )
  },[])
  function handleSubTotal(totalPrice){
    return data.map(function(data){
     setTotalPrice(totalPrice+data.price*(cart[data.id]));
    })
  }
  console.log(cart);
  if(Object.keys(cart).length === 0 ){
    return <EmptyCart></EmptyCart>
  }
  if(loading) {return <Loading></Loading>}
  
  return (
    <>
      <div className="bg-gray-200 md:py-8">
        <div className="px-2 pt-1 max-w-6xl mx-auto bg-white rounded">
   <BackButton to="/"></BackButton>
    <div className="">
      <table className="border w-full">
          <thead>
             <tr className="border bg-gray-300">
                <th className="p-2"></th>
                <th className="text-center p-2">Product</th>
                <th className="p-2"></th>
                <th className="p-2">Price</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">SubTotal</th>
               </tr>
             </thead>
             <tbody>
                {data.map(function(data){
              return <CartRow handleTotalPrice={handleSubTotal}
                       key={data.title}
                       thumbnail={data.thumbnail}
                       price={data.price}
                       noOfProduct={cart[data.id]}
                       title={data.title}
                       ></CartRow>
                  })}
             </tbody>
           </table>
           <div className="my-4 md:flex w-full gap-2">
           <input className="border p-1" placeholder="Coupon Code"></input>
             <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-1 rounded-md font-semibold mx-1">APPLY COUPON</button>
             <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-1 rounded-md font-semibold justify-self-end my-4 md:my-0">UPDATE CART</button>
             
           </div>
    </div>
      <div className="border w-80 my-8">
        <h3 className="p-2 text-xl border bg-gray-200">Cart Totals</h3>
        <div className="p-2">
          <h4 className="p-2 border-b">Subtotal<span className="px-8">{totalPrice}</span></h4>
          <h4 className="p-2 border-b mb-3">Total<span className="px-8">{totalPrice}</span></h4>
          <Button text="PROCEED TO CHECKOUT"></Button>
        </div>
      </div>
        </div>
      </div>
      </>
  );
}

export default Cart;