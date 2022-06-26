import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const [title, setTitle]= useState("");
    const [file, setFile]= useState("");
    const [preview, setPreView]= useState("");
    const {id} =useParams();
    const navigate = useNavigate();

    // console.log(id);
    useEffect(()=>{
        getProductByIDgg();
    },[]);

    const getProductByIDgg = async()=>{
        const res = await axios.get(`http://localhost:5000/products/${id}`);
        setTitle(res.data.name);
        setFile(res.data.image);
        setPreView(res.data.url);
    }

    const loadImage = (e)=>{
        const image = e.target.files[0];
        setFile(image);
        setPreView(URL.createObjectURL(image));
    }

    const updateProduct = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        try {
            await axios.patch(`http://localhost:5000/products/${id}`, formData,{
                headers:{
                    "content-type":"multipart/form-data"
                }
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='container'>
        <form onSubmit={updateProduct}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Nama Produk</label>
                <input type="text" className="form-control" id="title" value={title} onChange={(e)=> setTitle(e.target.value)} required/>
            </div>                        
            <div className="mb-3">
                <label htmlFor="files" className="form-label">Gambar</label>
                <input type="file" className="form-control" id="files" onChange={loadImage}/>
            </div>
            {
            preview?(
                <figure className='col-6'>
                    <img src={preview} alt="Preview Gambar" className='card-img-top'/>
                </figure>
            ):("")
            }
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    </div>
  )
}

export default EditProduct