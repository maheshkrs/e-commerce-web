import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from 'sweetalert2';
export const CartView = (props) => {
    const userid = window.sessionStorage.getItem("isLoggedIn")
    const BaseUrl = process.env.REACT_APP_BASE_URL
    const [cartList, setcartList] = useState(null);
    console.log("isLoggedIn", userid);

    useEffect(() => {
        if (userid) {
            getCart();
        }
    }, [userid]);
    const getCart = async() => {
        await axios.get(BaseUrl + `/cart/${userid}`)
            .then((res) => {
                setcartList(res.data.data[0].cartItems)

            })
            .catch((err) => {
                Swal.fire(
                    {
                        icon: 'fail',
                        text: "Failed to fetch cart list"
                    }
                )
            });
    };
  
    return (
        <div className="container mt-4">
              <h5>Cart List</h5>
              <div className="py-3">
                {cartList?.map((cart) =>
                    <div className="card mb-4" key={cart._id}>
                        <div className="card-body">
                            {/* <h6 className="card-subtitle text-muted mb-2">Product Id: {cart.productid}</h6> */}
                            <h6 className="card-title mb-2 text-muted">Fruit name : {cart.productname}</h6>
                            <h6 className="card-title mb-2 text-muted"> Quantity : {cart.quantity}</h6>
                            {/* <p className="card-text">Price {cart.price}</p> */}
                            <h6 className="card-title mb-2 text-muted">Price {cart.price}</h6>
                        </div>
                    </div>
                )}
              </div>
        </div>
    );
};
