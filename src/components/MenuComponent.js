import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardImg, CardImgOverlay, CardText } from 'reactstrap';

class Menu extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedDish : null
        };
    };

    onDishSelect(dish){
        this.setState({ selectedDish : dish });
    }

    componentDidMount(){
        console.log('Menu Component componentDidMount invoked');
    }

    renderDish(dish){
        if(this.state.selectedDish != null){
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

    render(){
        const menu = this.props.dishes.map((dish) => {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card key={dish.key} onClick={() => this.onDishSelect(dish)}>
                        <CardImg width='100%' src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return (
            <div className='container'>
                <div className='row'>
                    {menu}
                </div>
                <div className='row'>
                    <div className='col-12 col-md-10 m-1'>
                        {this.renderDish(this.state.selectedDish)}
                    </div>
                </div>
            </div>
        );
    }

}

export default Menu;