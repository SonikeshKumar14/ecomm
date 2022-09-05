import React,{useState} from 'react';


const AddProduct = () =>{

    const [product,setProduct] = useState({
        name:"",
        price:"",
        category:"",
        company:"",
    });
    const [error,setError] = useState(false)

    const handleChange = e =>{
        setProduct(prevValues=>{
            return {...prevValues,[e.target.name]:e.target.value}
        })
    }

    const addProduct = async() =>{
 
        console.log(!product.name)
        if(!product.name || !product.price || product.category || product.company)
        {
            setError(true);
            return false;
        }
       
        console.log(product.name,product.price,product.category,product.company)
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/add-product',{
            method:'POST',
            data:{
                name:product.name,price:product.price,
                category:product.category,company:product.company,
                id:userId
            },
            headers:{
                'Content-Type':"application/json",
                 authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.warn(result);
    }
    

   

    return(
        <div className='add-products'>
            <h1>Add Product</h1>
            <input value={product.name} onChange={handleChange} name='name'
            className='inputBox' type='text' placeholder='Enter Product Name' />
            {error && !product.name && <span className='invalid-input'>Enter valid name</span>}

            <input value={product.price} onChange={handleChange} name='price'
            className='inputBox' type='text' placeholder='Enter Product Price' />
            {error && !product.price && <span className='invalid-input'>Enter valid name</span>}

            <input value={product.category} onChange={handleChange} name='category'
            className='inputBox' type='text' placeholder='Enter Product Category' />
            {error && !product.category && <span className='invalid-input'>Enter valid price</span>}

            <input value={product.company} onChange={handleChange} name='company'
            className='inputBox' type='text' placeholder='Enter Product Company' />
            {error && !product.company && <span className='invalid-input'>Enter valid company</span>}
        
            <button onClick={addProduct} className='appButton'>Add Product</button>
        </div>
    )
}

export default AddProduct;