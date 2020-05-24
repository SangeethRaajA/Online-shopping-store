import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import { Link } from "react-router-dom";
import { isAuthenticated,createOrder } from "../auth";


const Checkout = ({ products }) => {

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            if(nextValue.discount==0){
                return currentValue + nextValue.count * nextValue.price;
            }else{
                return currentValue + nextValue.count * nextValue.discountprice;
            }
        }, 0);
    };    

    let tot = getTotal();
    
    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        userName: user.name ,
        address: "",
        email: user.email,
        price: "",
        error: false,
        success: false
    });

    const { userName,
            address, 
            email, 
            price,  
            success, error } = values;

    //address done
    const handleChange = value => event => {
        setValues({ ...values, error: false, [value]: event.target.value });
    };
    
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        //api call
        createOrder({userName, address, email, price}).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    userName:"",
                    address: "" ,
                    email: "",
                    price: tot,
                    error: "",
                    success: true
                });
            }
        });
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{checkouform()}</div>
            
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };
  
    const checkouform = () =>(
        <div className="col-8 float-left"><br></br>
        <form className="form-group bg-secondary container ">
            <h4 className="text-white">Checkout Detail</h4>
            <div className="form-group">
                <label>User Name :</label>                    
                  <label className="bg-white form-control">{user.name}</label>                
            </div>
            <div className="form-group">
                <label>User Email :</label>    
                      <input className="bg-white form-control"
                      onChange={handleChange("email")}
                      type="text"
                      value={email} 
                      />
            </div>
            <div className="form-group">
                Address
                <input 
                    onChange={handleChange("address")}
                    type="text"
                    className="form-control md-8"
                    value={address}
                    placeholder="Enter address"
                    required
                />
            </div>

            <div className="form-group">                
                <label>Total Price :</label>
                <input 
                    onChange={handleChange("price")}
                    className="bg-white form-control"
                      value={tot}
                      />
            </div>
            <button className="btn btn-primary btn-lg btn-block" onClick={clickSubmit}>Checkout</button>
            <hr></hr>
        </form>
        </div>
        );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}
        >
            <h4>placed Order successfully</h4>
        </div>
    );

    return (
        <div>
            <h4>Grand Total: Rs.{getTotal()}</h4>
            {showSuccess()}
            {showError()}
            {showCheckout()}
        </div>
    );
};

export default Checkout;
