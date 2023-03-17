import React, { useState, useEffect, useContext } from "react";
import { NavLink, useHistory, Link, useParams, useNavigate } from "react-router-dom";
import { Button, Card, Modal, FloatingLabel, Form } from "react-bootstrap";

import axios from "axios";
import Swal from 'sweetalert2';

export const ProductDetail = () => {
    const navigate = useNavigate();
    const BaseUrl = process.env.REACT_APP_BASE_URL
    const [productId, setproductId] = useState(null);
    const { id } = useParams();
    const userid = window.sessionStorage.getItem("isLoggedIn")
    console.log("isLoggedIn", userid);
   useEffect(() => {
        if (id) {
            getEmployee();
        }
    
    }, [id]);

    const getEmployee =  () => {
        axios.get(BaseUrl + `/products/${id}`)
            .then((res) => {
               setproductId(res.data.data)
              
            })
            .catch((err) => {
                Swal.fire(
                    {
                        icon: 'fail',
                        text: "Failed to fetch product"
                    }
                )
            });
    };
    console.log("productId", productId?.[0].productprice);
      const addtoCart = () =>{
        console.log("add to cart", );
          cart()
    }


    console.log("===========>", productId?.[0].productprice);
    const cart = () => {
       const data =
        {
            "userid": userid,
            "cartItems": [
                {
                    "productid": id,
                    "productname": productId?.[0].productname,
                    "quantity": 1,
                    "price": productId?.[0].productprice
                }
            ]
        }
        axios.post(BaseUrl + `/cart`,data)
            .then((res) => {
               console.log("");
                // navigate(`${"/cartview"}/${userid}`)
                navigate("/cartview")

            })
            .catch((err) => {
                Swal.fire(
                    {
                        icon: 'fail',
                        text: "Failed to fetch product"
                    }
                )
            });
    };
    return (
        <div className="container mt-5">
             <div>
             {productId?.map((product) =>
                 <div className="card" key={product._id}>
                     <div className="card-body">
                         <h6 className="card-subtitle text-muted mb-2">Fruit Name : {product.productname}</h6>
                         <h6 className="card-title mb-2 text-muted">Fruit type : {product.producttype}</h6>
                         <p className="card-text">Description {product.productdescription}</p>
                         <h6 className="card-title mb-2 text-muted">Fruit Price: Rs,{product.productprice}</h6>
                        <div>
                             <Button
                                 className=" border-radius-15 px-3"
                                 variant="success"
                                 onClick={addtoCart}
                             >
                                 Add to cart
                             </Button>
                             <Button
                                 className=" border-radius-15 px-3 ml-4"
                                 variant="success"
                             >
                                 Buy
                             </Button>
                        </div>
                    </div>
                </div>
                )}
             </div>
        </div>
    );
};
