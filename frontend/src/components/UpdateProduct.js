import React,{useState,useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom'

const UpdateProduct = () =>{

    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [company,setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
        getProductDetails()
    },[])

    const getProductDetails = async()=>{
        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }


    const updateProduct = async() =>{
      console.warn(name,price,category,company)
      let result = await fetch(`http://localhost:5000/product/${params.id}`,{
          method:'Put',
          body:JSON.stringify({name, price, category, company}),
          headers:{
              'Content-Type':"application/json",
               authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
      });
      result = await result.json()
      console.warn(result)
      navigate('/')
    }
    

   

    return(
        <div className='add-products'>
            <h1>Update Product</h1>
            <input type='text' placeholder='Enter Product Name' className='inputBox' value={name} onChange={(e)=>{setName(e.target.value)}} />

            <input type='text' value={price} onChange={(e)=>{setPrice(e.target.value)}} 
            className='inputBox'  placeholder='Enter Product Price' />
            
            <input value={category} onChange={(e)=>{setCategory(e.target.value)}} 
            className='inputBox' type='text' placeholder='Enter Product Category' />

            <input value={company} onChange={(e)=>{setCompany(e.target.value)}}
            className='inputBox' type='text' placeholder='Enter Product Company' />
           
            <button onClick={updateProduct} className='appButton'>Add Product</button>
        </div>
    )
}

export default UpdateProduct;