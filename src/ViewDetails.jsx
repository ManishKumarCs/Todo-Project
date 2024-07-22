import React,{useState,useEffect} from 'react';
import {getProductData} from './api';
import Loading from './Loading'
import NotFound from './NotFound'
import BackButton from './BackButton'
import {useParams} from 'react-router-dom'
import { MdOutlineArrowBack } from "react-icons/md";
import {Link} from 'react-router-dom'

function ViewDetails({addToCart}){
   const [product,setProduct]=useState();
   const [loading,setLoading]=useState(true);
   const [count,setCount]=useState(1);
    function handleCountButton(){
         addToCart(id, count);
    }
    function handleCountValue(event){
      setCount(+event.target.value); 
    }
  const params = useParams();
  const id = params.key;
  useEffect(function(){
    setCount(1);
    const p=getProductData(id);
    p.then(function(response){
      setProduct(response);
      setLoading(false);
     })
      .catch(function(error){
      console.log("error aya",error);
      setLoading(false);
    })
  },[id]);
  if(loading) {return <Loading></Loading>}
  if(!product) {return <NotFound></NotFound>}
  
  return(
    <>
      <div className="bg-gray-200 md:py-8 pt-2">
        <div className="p-4 max-w-6xl md:mx-auto m-4 bg-white">
          <div className="md:flex">
      <BackButton to="/"></BackButton>
           <img className="md:w-2/6 w-64 inline-block object-cover" src={product.thumbnail} alt="product_img" />
         <div className="flex flex-col gap-5 md:items-start sm:items-start ml-1 md:w-4/6 py-4">
           <h1 className="text-gray-400 font-sans md:block hidden">Home / {product.category} / {product.title}</h1>
           <h1 className="text-3xl font-bold mt-2 md:m-0">{product.title}</h1>
           <h3 className="font-bold text-xl md:text-2xl">Rs. {product.price}</h3>
           <p className=" md:text-left sm:text-left">
             {product.description}
           </p>
             <div className="">
               <input type="number" onChange={handleCountValue} value={count} className="border border-gray-500 w-12 h-8 p-2 rounded" />
               <button onClick={handleCountButton} className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-1 rounded-md font-semibold mx-2">ADD TO CART</button>
             </div>
           <h1 className="font-sans mb-2 text-xl">Category: <span className="text-rose-500">{product.category}</span></h1>
         </div>
         {/* <div className="border-t-2">
        
           <h3 className="text-xl hover:border-t-4 border-rose-500 inline-block mr-1">Description</h3>
            <h3 className="text-xl hover:border-t-4 border-rose-500 inline-block">Reviews</h3>
            <p className="py-4">{product.description}</p>
            <h2 className="font-bold text-2xl">Related Products</h2>
         </div> */}
      </div>
      </div>
       <div className="my-8 flex gap-4 justify-between max-w-6xl mx-auto">
         { id>1 && <Link className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-2 rounded-md" to={"/viewDetails/" + (id-1)}>
           Previous Product</Link>}
         { id<100 && <Link className="justify-self-end bg-rose-500 hover:bg-rose-600 text-white px-8 py-2 rounded-md" to={"/viewDetails/" + ((id*1) + 1)}>
           Next Product</Link>}
        </div>
       
      </div>
  </>
  );
}
export default ViewDetails;