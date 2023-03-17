import React from "react";
import { RouterStrings } from "../routeStrings";
import { Routes, Route } from "react-router-dom";
import { ComponentOne } from "../../pages/componentOne";
import { ComponentTwo } from "../../pages/componentTwo";
import { Register } from "../../pages/Register/Register";
import { Home } from "../../pages/Home/Home";
import { Login } from "../../pages/Login/Login";
import { Header } from "../../Components/Header/Header";
import { ProductDetail } from "../../pages/ProductDetail/ProductDetail";
import { CartView } from "../../pages/CartView/CartView";

export const DashboardRoutes = () => {
  const user = window.sessionStorage.getItem("isLoggedIn")
  return (
    <div>
    

      {user ? <div>  <Header />
        <Routes>
          <Route path={RouterStrings.register} element={<Register />} />
          <Route path={RouterStrings.home} element={<Home />} />
          <Route path={RouterStrings.productdetail} element={<ProductDetail />} />
          <Route path={RouterStrings.cartview} element={<CartView />} />
        </Routes></div>:<div>
          <Routes>
            <Route path={RouterStrings.register} element={<Register />} />
            <Route path={RouterStrings.login} element={<Login />} />
          </Routes>
          </div>}

     
    </div>  
  );
};
