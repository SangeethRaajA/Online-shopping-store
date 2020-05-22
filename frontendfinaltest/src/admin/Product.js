import React, { Component } from 'react';
import {Modal,Button} from 'react-bootstrap';
import {Form,Row,Col} from 'react-bootstrap';
import {updateDiscount} from './apiAdmin';


export default class Product extends Component{

    constructor(props){
        super(props);

        this.state={
            show:       false,
            id:         this.props.product._id,
            photo:      this.props.product.photo,
            sold:       this.props.product.sold,
            name:       this.props.product.name,
            description:this.props.product.description,
            price:      this.props.product.price,
            category:   this.props.product.category,
            shipping:   this.props.product.shipping,
            quantity:   this.props.product.quantity,
            discount:   this.props.product.discount
        }
    }

    

    onChangeDiscount=(e)=>{
        this.setState({
            discount:e.target.value
        })
        console.log(this.state.discount);
    }

     handleClose = () =>{
         this.setState({
             show: false
         })
     };
     handleShow = () => {
         this.setState({
             show: true
         })
     };

    onSubmit=()=>{

        const product={
            id:         this.state.id,
            photo:      this.state.photo,
            sold:       this.state.sold,
            name:       this.state.name,
            description:this.state.description,
            price:      this.state.price,
            category:   this.state.category,
            shipping:   this.state.shipping,
            quantity:   this.state.quantity,
            discount:   Number(this.state.discount)
        }

        this.setState({
            show: false
        })

       
        updateDiscount(product)
        
        console.log("Submit occurs");
    }

    render(){
        return(
            
                
                    <tr>
                        <td>{this.props.product.category.name}</td>
                        <td>{this.props.product.name}</td>
                        <td>{this.props.product.quantity}</td>
                        <td>Rs.{this.props.product.price}</td>
                        <td>{this.props.product.discount}%</td>
                        <td>
                        <Button variant="primary" onClick={this.handleShow}>
                            Add Discount
                        </Button>
                        </td>
                    
                

                        <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                            <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2">
                                        Product Category
                                        </Form.Label>
                                        <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={this.props.product.category.name} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2">
                                        Product Name
                                        </Form.Label>
                                        <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={this.props.product.name} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextPassword">
                                        <Form.Label column sm="4">
                                        Discount (%)
                                        </Form.Label>
                                        <Col sm="8">
                                        <Form.Control type="text" onChange={this.onChangeDiscount} placeholder="Add Discount" />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.onSubmit}>
                                Save Changes
                            </Button>
                            </Modal.Footer>
                        </Modal>

                    </tr>
                
            
        )
    }
}
