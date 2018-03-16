import React from "react";
import Navbar from '../elements/Navbar';
import Sidebar from '../elements/Sidebar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllEmployee, deleteEmployee } from '../../actions/employeeAction';
import { fetchAllReview } from '../../actions/reviewAction';
import moment from 'moment';
import CreateReview from './reviews/CreateReview';
import UpdateReview from './reviews/UpdateReview';
import Feedback from './reviews/Feedback';

@connect( (store) => {
    return {
        employees : store.employees,
        reviews: store.reviews
    }
})
export default class ReviewDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options: [],
            review: {
                review_name: '',
                description:'',
                assigned_id: 0,
                review_id: 0,
            },
            is_enable_form: false,
            update_index : null
        }

    }
    componentDidMount(){
        let { fetched } = this.props.employees;
        let review_fetched = this.props.reviews.fetched;
        if( fetched === false )
            this.props.dispatch( fetchAllEmployee() );
        if( review_fetched === false )
            this.props.dispatch( fetchAllReview() );
    }

    addReviewForm(event){
        event.preventDefault();
        this.setState({ is_enable_form: !this.state.is_enable_form });
    }
    cancelOperation(event){
        this.setState({ is_enable_form: !this.state.is_enable_form });
    }
    updateReview(index, event){
        console.log("index: ", index);

        event.preventDefault();
        let { update_index } = this.state;
        update_index = ( index === update_index ) ? null : index;
        this.setState({ update_index })
    }

    updateCancelOperation(){
        this.setState({ update_index: null })
    }

    reviewList(){
        let { reviews, fetched } = this.props.reviews;

        return ( fetched && reviews.length > 0 ) ? reviews.map( (review, index) => {
            return (
                <div className="review p-b-0 p-t-0" key={index}>
                    <div className="flex-box m-t-10 m-b-10 item-align-center">
                        <div className="flex-3 part-1">
                            <h3 className="title"> <span className="circle new"></span> { review.review_name } </h3>
                            <p className="date"> Created : {  moment(review.created_at).format('h:mm:ss A | ddd, MMM YYYY ') } </p>
                            <div className="flex-box">
                                <div className="flex-1">
                                    <p className="assign"> Assigned To: <span className="a-user"> { review.assign_user.first_name } { review.assign_user.last_name } </span></p>
                                </div>
                                { review.reviewer === null ? null :
                                    <div className="flex-1">
                                        <p className="participate"><span> Participate By : </span> <span
                                            className="p-user"> {review.reviewer.last_name}  </span></p>
                                    </div>
                                }

                            </div>

                        </div>
                        <div className="flex-1 control-part part-2">
                            { this.state.update_index !== index ?
                                <a href="#" className="soft-btn soft-blue"
                                   onClick={this.updateReview.bind(this, index)}> Update </a>
                                :
                                <a href="#" className="soft-btn soft-red"
                                   onClick={this.updateReview.bind(this, index)}> Cancel </a>
                            }
                        </div>
                    </div>
                    { this.state.update_index !== index ? null :
                        <UpdateReview
                            review={review}
                            review_index={index}
                            cancelOperation={this.updateCancelOperation.bind(this)}
                        />
                    }
                    { review.feedbacks.length > 0 ?
                        <Feedback
                            type="reviewer"
                            review={review}
                            self_feedbacks={review.feedbacks}/>
                        : null }
                </div>
            )
        }) : null;
    }


    render(){
        let { reviews } = this.props.reviews;
        return (
            <div className="adminRoot">
                <Navbar />
                <div className="container main-content-area">
                    <Sidebar />
                    <div className="col-md-8 main-content ">
                        <div className="content-widget bg-white">
                            <div className="bg-blue content-header">
                                <h3 className="title "> All Review List </h3>
                            </div>
                            <div className="content-body">
                                <div className="flex-box p-b-15 p-t-15 item-align-center">
                                    <div className="flex-2">
                                        <p className="total-employer">
                                            <span> {reviews.length} </span>
                                            <span> <small>Review</small> </span>
                                        </p>
                                    </div>
                                    <div className="action-part flex-1 text-center">
                                        <a href="#" className="btn btn-default btn-success" onClick={this.addReviewForm.bind(this)}> Add Review </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        { this.state.is_enable_form ?
                            <CreateReview
                                cancelOperation={this.cancelOperation.bind(this)}
                            />
                        : null }
                        <div className="content-widget bg-white">
                            <div className="content-body">
                                <div className="review-list">
                                    { this.reviewList() }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}