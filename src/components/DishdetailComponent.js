import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, 
        Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    class CommentForm extends Component {

        constructor(props){
            super(props);
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.state={
                isModalOpen: false
            };
        }

        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values){
            this.toggleModal();
            this.props.addComment(this.props.dishId,values.rating,values.author,values.comment);
        }

        render() {
            return(
                <div>
                    <Button outline onClick={this.toggleModal}>
                        <span className='fa fa-pencil fa-lg'> Submit Comment</span>
                    </Button>
                

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className='form-group'>
                                    <Label htmlFor='rating' md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model='.rating' id='rating' name='rating'
                                            className='form-control'>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>    
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor='author' md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model='.author' id='author' name='author' placeholder='Your Name'
                                            className='form-control' validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }} />
                                        <Errors 
                                            className='text-danger'
                                            model='.author'
                                            show='touched'
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor='comment' md={12}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model='.comment' id='comment' name='comment' row='6'
                                            className='form-control' />
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Col md={12}>
                                        <Button type='send' color='primary'>Submit</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    };

    function RenderDish({dish}){
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

    function RenderComments({comments, addComment, dishId}){
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
                    <CommentForm addComment={addComment} dishId={dishId} />
                 </div>
            );
        } else {
            return(
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {
        const dishComments = (props.dish == null) ? null : props.comments;

        if (props.isLoading){
            return(
                <div className='container'>
                    <div class='row'>
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess){
            return(
                <div className='container'>
                    <div className='row'>
                        <h4>props.errMess</h4>
                    </div>
                </div>
            );
        }
        else {
            return(
                <div className='container'>
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-5 m-1'>
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={dishComments}
                                addComment={props.addComment}
                                dishId={props.dish.id}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }

export default DishDetail;