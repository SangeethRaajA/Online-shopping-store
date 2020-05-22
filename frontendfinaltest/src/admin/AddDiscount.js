import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { getCategories, getProducts } from "../core/apiCore";
import Product from './Product';


export default class AddDiscount extends Component{

    constructor(props){
        super(props)

        this.state={
            products:[]
        }
    }

    componentDidMount(){
        getProducts()
            .then(resultProducts=>{
                this.setState({
                    products:resultProducts
                })
                console.log(resultProducts)
            });
            
    }

    productList=()=>{
        return this.state.products.map(Currentproduct=>{
            return <Product product={Currentproduct} key={Currentproduct._id}/>
        })
    }

    render(){
        return(
            <div>
                <h3>Product Details</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Product Category</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.productList()}
                    </tbody>
                </table>
            </div>
        )
    }
}