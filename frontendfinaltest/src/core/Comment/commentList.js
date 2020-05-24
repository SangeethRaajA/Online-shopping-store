import React, { Component } from "react";
// import Comment from "./Comment";
import { getComments } from "../../admin/apiAdmin";
import moment from "moment";

const CommentItem = props =>(
            
      <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">User Name :  {props.commentitem.userName}</h4>
        <hr/>
        <p>comment :  {props.commentitem.comment}</p>
        
        <p className="" style={{color:"red"}}>
          Added on {moment(props.commentitem.createdAt).fromNow()}
        </p>

    </div>
)


//Get the comment list and render 
export default class CommentList extends Component {
  constructor(props){
    super(props)
    this.state={
      comments:[]
    }
  }

  componentDidMount=()=>{
    getComments(this.props.proId)
      .then(data=>{
        this.setState({
          comments:data
        })
        console.log(data)
      })

      
  }

  commentlist=()=>{
    return this.state.comments.map(Currentproduct=>{
      return <CommentItem commentitem={Currentproduct} key={Currentproduct._id}/>
  })
  }

  render() {

    const { comments } = this.props;

    return (
      <div className="reviews">
          {this.commentlist()}
      </div>
    );
  }
}
