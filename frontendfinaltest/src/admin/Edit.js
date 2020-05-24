import React, { Component } from 'react';
import {Modal,Button} from 'react-bootstrap';
import {Form,Row,Col} from 'react-bootstrap';
import {updateDiscount,getProductsWithID,getCategoryWithID} from './apiAdmin';
import {Card} from 'react-bootstrap';
import Menu from '../core/Menu';
import Noty from 'noty'
import { Link } from "react-router-dom";

import '../../node_modules/noty/lib/noty.css'
import '../../node_modules/noty/lib/themes/mint.css'



export default class Edit extends Component{

    constructor(props){
        super(props);
        this.state={
            category: "",
            catname:"",
            description: "",
            discount: 0,
            name: "",
            price: "",
            quantity: 0,
            shipping: false,
            sold: 0,
            discountprice:""
            
        }
    }

    componentDidMount(){
        getProductsWithID(this.props.match.params.id)
            .then(product=>{
                console.log(product)    
                this.setState({
                    category: product.category,
                    description: product.description,
                    discount: product.discount,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    shipping: product.shipping,
                    sold: product.sold,
                    discountprice:product.discountprice
                })
                this.checkCategory(product.category)
            });

            
    }

    checkCategory=(id)=>{
        getCategoryWithID(id)
            .then(category=>{
                this.setState({
                    category:category,
                    catname:category.name
                })
            })
            
    }

    onChangeDiscount=(e)=>{
        this.setState({
            discount:e.target.value
        })
    }

    onChangeQuantity=(e)=>{
        this.setState({
            quantity:e.target.value
        })
    }

    calcDiscountPrice=()=>{
        let val=this.state.discount
        let finalprice =(1-(val/100))*this.state.price
        
        this.setState({
            discountprice:finalprice
        })

    }
    
    backtoProducts=(e)=>{
        e.preventDefault();

        window.location='/create/manager/discount';
    }
    
    onSubmit=(e)=>{
        e.preventDefault();

        console.log("Discount:"+this.state.discount)
        console.log("Quantity:"+this.state.quantity)

        if((this.state.discount ==(null || "")) || (this.state.quantity == (null || ""))){
            new Noty({
                type:"error",
                layout:"topRight",
                text:"Quantity or Discount Cannot be empty",
                timeout:3000
            }).show()
            this.setState({
                discount:"",
                quantity:""
            })
        }
        else{
            const product={
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
                category: this.state.category,
                quantity: this.state.quantity,
                sold: this.state.sold,
                shipping: this.state.shipping,
                discount: this.state.discount,
                discountprice: this.state.discountprice
            }

            let name= this.state.name;
            let description= this.state.description;
            let price= this.state.price;
            let category= this.state.category;
            let quantity= this.state.quantity;
            let sold= this.state.sold;
            let shipping= this.state.shipping;
            let discount= this.state.discount;
            let discountprice= this.state.discountprice;


        
            updateDiscount(this.props.match.params.id,name,description,price,category,quantity,sold,shipping,discount,discountprice)
                .then(res=>{
                    console.log(res)
                })

            new Noty({
                type:"success",
                layout:"topRight",
                text:"Product Updated Successfully",
                timeout:3000
            }).show()
            
        }
    }

    render(){
        return(
            <div style={{backgroundColor:'#dcdcdc',height:'100vh'}}>
            <Menu/>
                <div style={{paddingTop:'50px'}}>
                    
                    <Card style={{ boxShadow:'4px 4px 12px',
                                    backgroundColor:'white-smoke',
                                     width: '80rem' , 
                                     width:'60%' ,
                                     margin:'0 auto',
                                     padding: '10px 0px'
                                     }}>
                        <Card.Body>
                            <Form>
                            <h3 style={{paddingBottom:'20px'}}>Edit Changes</h3>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label style={{fontWeight:'bold'}} column sm="2">
                                    Category
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control style={{ fontWeight:'400'}} plaintext readOnly defaultValue={this.state.catname} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label style={{fontWeight:'bold'}} column sm="2">
                                    Name
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control style={{ fontWeight:'10px'}} plaintext readOnly defaultValue={this.state.name} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label style={{fontWeight:'bold'}} column sm="2">
                                    Old Price (Rs.)
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control style={{ fontWeight:'400'}} plaintext readOnly defaultValue={this.state.price} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label style={{fontWeight:'bold'}} column sm="2">
                                    Quantity
                                    </Form.Label>
                                    <Col sm="8">
                                    <Form.Control style={{ fontWeight:'400'}} type="number" placeholder={this.state.quantity} onChange={this.onChangeQuantity}/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label style={{fontWeight:'bold'}} column sm="2">
                                    Discount (%)
                                    </Form.Label>
                                    <Col sm="8">
                                    <Form.Control style={{ fontWeight:'400'}} type="number" placeholder={this.state.discount} onChange={this.onChangeDiscount}/>`
                                    <Button style={{borderRadius:'6px', margin:'8px'}} onClick={this.calcDiscountPrice} variant="primary">Check New Price</Button>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label style={{fontWeight:'bold'}} column sm="2">
                                    New Price (Rs.)
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control style={{color:'green', fontWeight:'400'}} plaintext readOnly defaultValue={this.state.discountprice}/>
                                    </Col>
                                </Form.Group>
                                <Button style={{borderRadius:'6px'}} onClick={this.onSubmit} variant="success">Submit</Button>
                                <Link to="/create/manager/discount">
                                    <Button style={{borderRadius:'6px', marginLeft:'20px' }} variant="secondary">
                                        Back
                                    </Button> 
                                </Link>   
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}
