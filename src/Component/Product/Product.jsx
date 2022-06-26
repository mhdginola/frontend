import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Product = () => {
    const [prodg,setProdg]=useState([]);
    
    useEffect(()=>{
        getProdg();
    },[]);

    const getProdg = async()=>{
        const respon = await axios.get("http://localhost:5000/products");
        setProdg(respon.data);
    }

    const deleteProduct = async(pgid)=>{
        try {
            await axios.delete('http://localhost:5000/products/'+pgid);
            getProdg();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='container d-flex flex-wrap mt-5'>
        <div className='col-12'>
            <Link to="add">Add</Link>
        </div>
        {prodg.map((dtg)=>(
        <div className="card col-6" key={dtg.id}>
            <img src={dtg.url} className="card-img-top" alt="Gambar"/>
            <div className="card-body">
                <h5 className="card-title">{dtg.name}</h5>                
                <Link to={"edit/"+dtg.id} className='btn btn-primary me-3'>edit</Link>
                <button className='btn btn-primary' onClick={()=> deleteProduct(dtg.id)}>Delete</button>
        </div>
        </div>
        ))}
    </div>
  )
}

export default Product