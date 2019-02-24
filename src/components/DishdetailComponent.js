import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    componentDidMount(){
        console.log('DishDetail Component componentDidMount invoked');
    }

    componentDidUpdate(){
        console.log('DishDetail Component componentDidMount invoked');
    }

    renderDish(dish){
        if(dish != null){
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        } else {
            return(
                <div></div>
            );
        }
    }

    renderComments(comments){
        if(comments != null) {
            
            const commentsList = comments.map((comment) => {
                return(
                    <div>
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-EN', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </li>
                    </div>
                );
            });

            return(
                <div>
                    <h4>Comments</h4>
                    <ul className='list-unstyled'>{commentsList}</ul>
                 </div>
            );
        } else {
            return(
                <div></div>
            );
        }
    }

    render(){
        const dishComments = (this.props.dish == null) ? null : this.props.dish.comments;
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(dishComments)}
                    </div>
                </div>
            </div>
        );
    }

}

export default DishDetail;