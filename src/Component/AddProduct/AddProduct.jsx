import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [title, setTitle]= useState();
    const [file, setFile]= useState();
    const [preview, setPreView]= useState();
    const navigate = useNavigate();

    const loadImage = (e)=>{
        const image = e.target.files[0];
        setFile(image);
        setPreView(URL.createObjectURL(image));
    }

    const saveProduct = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        try {
            await axios.post("http://localhost:5000/products", formData,{
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
        <form onSubmit={saveProduct}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Nama Produk</label>
                <input type="text" className="form-control" id="title" value={title} onChange={(e)=> setTitle(e.target.value)} required/>
            </div>                        
            <div className="mb-3">
                <label htmlFor="files" className="form-label">Gambar</label>
                <input type="file" className="form-control" id="files" onChange={loadImage} required/>
            </div>
            {
            preview?(
                <figure className='col-6'>
                    <img src={preview} alt="Preview Gambar" className='card-img-top'/>
                </figure>
            ):("")
            }
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default AddProduct