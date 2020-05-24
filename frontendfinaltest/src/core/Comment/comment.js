import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, addComment } from "../../auth";

const Comment = ({proId}) => {

    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        userName:user.name,
        comment:"",
        productId: proId,
        error: false,
        success: false
    });

    const { 
        userName,
        comment, 
        productId, 
        success, 
        error 
    } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        //api call
        addComment({userName, comment, productId}).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    userName:"",
                    comment:"",
                    productId: "" ,
                    error: "",
                    success: true
                });
            }
        });
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{commentForm()}</div>            
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">View Comment</button>
            </Link>
        );
    };

    const commentForm = () =>(
        <form className="form-group container ">
            <div className="form-group">
                <h5>Comment {console.log(proId)} </h5>
                
                <textarea 
                    onChange={handleChange("comment")}
                    type="text"
                    className="form-control"
                    value={comment}
                    placeholder="Enter comment"
                    required
                />
                
            </div>
            <small className="review-date">{new Date().toDateString()}</small>
            <button className="btn btn-outline-primary float-right" onClick={clickSubmit}>comment</button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h4 className="text-success">comment is added</h4>;
        }
    };

    const showError = () => {
        if (error) {
            return <h4 className="text-danger">comment not accepted</h4>;
        }
    };


    return (
        <div>
                    {showSuccess()}
                    {showError()}
                    {showCheckout()}
        </div>                
    );
}

export default Comment;