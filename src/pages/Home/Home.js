import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Modal, FloatingLabel, Form }from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";

import * as Yup from "yup";
import { NavLink, useHistory, Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import fruit from "../../Assets/fruits.jpg";
import { ProjectContext } from '../../Context/index';

const validationSchema = Yup.object({
    productname: Yup.string().required("product name is required"),
    producttype: Yup.string().required("product type is required"),
    productprice: Yup.string().required("product price is required"), 
    productdescription: Yup.string().required("product description is required"), 
});


export const Home = (props) => {
   const BaseUrl = process.env.REACT_APP_BASE_URL
    const [productlist, setProductlist] = useState(null);
    const { isLoggedIn, setIsLoggedIn } = useContext(ProjectContext);
    // const { productId, setproductId } = useContext(ProjectContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // console.log("Home--isLoggedIn", isLoggedIn);
  
    useEffect(() => {
        fetchData()
      
    },[]);

    const fetchData = async () => {
        axios.get(BaseUrl + "/products/list")
            .then((res) => {
                console.log("res", res.data.data)
                if (res.status == 200) {
                    setProductlist(res.data.data)
                } else {

                }
            })
            .catch((err) => {
                Swal.fire(
                    {
                        icon: 'fail',
                        text: "Failed to fetch products"
                    }
                )
            });
    };
    // function handleSubmit(id:any){
    //     // setproductId
    //     console.log("tesrer", productId );
    // }
   
    const ProductsList = productlist?.map((product) =>
        <div className="col-md-3 mb-4" key={product._id}>
            <NavLink className=" nav-link " to={`${"/productdetail"}/${product._id}`} 
             >
               <Card>
                    {/* <Card.Img variant="top" src={fruit} /> */}
                    <Card.Body>
                        <Card.Title>Fruit name : {product.productname}</Card.Title>
                        <h6>Type : {product.producttype}</h6>
                        <h6>Price : Rs,{product.productprice}</h6>
                        <Card.Text>
                            {product.productdescription}
                        </Card.Text>
                        {/* <div>
                        <Button
                            className=" border-radius-15 px-3"
                            variant="success"
                        >
                            Add to cart
                        </Button>
                        <Button
                            className=" border-radius-15 px-3 float-right"
                            variant="success"
                        >
                            Buy
                        </Button>
                        </div> */}
                    </Card.Body>
                </Card>
                </NavLink>
          </div>
    )

    // const { id } = useParams();

    // console.log("ffffffffffff",id);

 
return (
        <div className="mainContainer">
            <div className="mt-4">
                <div className="container">
                 <div>
                   <h5>Fruits Lists</h5>
                 </div>
                     <div className="row">
                     {productlist != null ? ProductsList :
                       <div>
                          <h5>Product List Empty</h5>
                      </div>}
                     </div>
                </div>
            </div>

        </div>
    );
};
