import React, { useState } from "react";
import { isAuthenticated } from "../auth";
import { createComment, getComment } from "./apiUser";
import Product from "../core/Product";

const AddComment = () => {
   
    const [comment, setComment] = useState("");     
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    // destructure user and token from localstorage
    const { user, token } = isAuthenticated();

    const handleChange = e => {
        setError("");        
        setComment(e.target.value);
    };     

    const clickSubmit = e => {
        e.preventDefault();       
        setError("");
        setSuccess(false);        
        
        // make request to api to create comment
        createComment(user._id, token, {comment}).then(data => {
            if (data.error) {
                setError(data.error);
            } else {               
                setError("");
                setSuccess(true);
            }
        });
    };

    const newCommentForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <textarea                    
                    className="form-control"
                    onChange={handleChange}
                    value={comment}
                    autoFocus
                    required
                    
                />
            </div>
            <button className="btn btn-primary">Comment</button>
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

    // const goBack = () => (
    //     <div className="mt-5">
    //         <Link to="/admin/dashboard" className="text-warning">
    //             Back to Dashboard
    //         </Link>
    //     </div>
    // );

    return (
        <div>
                    {showSuccess()}
                    {showError()}
                    {newCommentForm()}
                    {/* {goBack()} */}
        </div>                
    );
};

export default AddComment;
