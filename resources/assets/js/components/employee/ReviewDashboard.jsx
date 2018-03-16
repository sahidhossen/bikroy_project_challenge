import React from "react";
import Navbar from '../elements/Navbar';
import Sidebar from '../elements/Sidebar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllReviewFeedback } from '../../actions/feedbackAction';
import moment from 'moment';
import Feedback from './feedback/Feedback';

@connect( (store) => {
    return {
        feedbacks : store.feedbacks
    }
})
export default class ReviewDashboard extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        let { review_feedback_fetching } = this.props.feedbacks;
        if( review_feedback_fetching === false )
            this.props.dispatch( fetchAllReviewFeedback() );
    }

    reviewList(){
        let { review_feedbacks, review_feedback_fetching } = this.props.feedbacks;

        return ( review_feedback_fetching && review_feedbacks.length > 0 ) ? review_feedbacks.map( (review, index) => {
            return (
                <div className="review" key={index}>
                    <div className="flex-box item-align-center">
                        <div className="flex-3 part-1">
                            <h3 className="title"> <span className="circle new"></span> { review.review_name } </h3>
                            <p className="date"> Created : {  moment(review.created_at).format('h:mm:ss A | ddd, MMM YYYY ') } </p>
                            <div className="flex-box">
                                { review.assigned === null ? null :
                                    <div className="flex-1">
                                        <p className="participate"><span> Left review for </span> <span
                                            className="p-user"> {review.assigned.last_name}  </span></p>
                                    </div>
                                }

                            </div>

                        </div>
                    </div>
                    <Feedback
                        type="reviewer"
                        review_index={index}
                        review_id={review.id}
                        review={review}
                        reviews={review_feedbacks}
                        self_feedbacks={review.feedbacks} />
                </div>
            )
        }) : null;
    }


    render(){
        let { review_feedbacks } = this.props.feedbacks;
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
                                            <span> {review_feedbacks.length} </span>
                                            <span> <small>Review</small> </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

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