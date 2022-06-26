import Product from "./Component/Product/Product";
import { Routes, Route } from "react-router-dom";
import Detail from "./Component/Detail/Detail";
import { Fragment } from "react";
import AddProduct from "./Component/AddProduct/AddProduct";
import EditProduct from "./Component/EditProduct/EditProduct";

function App() {
  return (
    <Fragment>
      <div className="container mt-5">
        <Routes>                                    
          <Route path="/" exact element={<Product/>} />
          <Route path="detail" element={<Detail/>} />
          <Route path="add" element={<AddProduct/>} />
          <Route path="edit/:id" element={<EditProduct/>} />
        </Routes>
      </div>
    </Fragment>
    
  );
}

export default App;
