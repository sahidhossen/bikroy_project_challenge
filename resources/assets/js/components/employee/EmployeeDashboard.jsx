import React from "react";
import Navbar from '../elements/Navbar';
import Sidebar from '../elements/Sidebar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllFeedback } from '../../actions/feedbackAction';
import moment from 'moment';
import Feedback from './feedback/Feedback';

@connect( (store) => {
    return {
        feedbacks : store.feedbacks
    }
})
export default class EmployeeDashboard extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        let { fetched } = this.props.feedbacks;
        if( fetched === false )
            this.props.dispatch( fetchAllFeedback() );
    }


    componentWillReceiveProps(nextProps){
        // let { deleted } = nextProps.feedbacks;
        // if( deleted ) {
        //     this.props.dispatch({ type: 'NEW_FEEDBACK_RESET' });
        // }
    }

    reviewList(){
        let { feedbacks, fetched } = this.props.feedbacks;

        return ( fetched && feedbacks.length > 0 ) ? feedbacks.map( (review, index) => {
            return (
                <div className="employee-review review no-border p-b-0" key={index}>
                    <div className="flex-box item-align-center">
                        <div className="flex-3 part-1">
                            <h3 className="title"> <span className="circle new"></span> { review.review_name } </h3>
                            <p className="date"> Created : {  moment(review.created_at).format('h:mm:ss A | ddd, MMM YYYY ') } </p>
                            <div className="flex-box">
                                { review.reviewer === null ? null :
                                    <div className="flex-1">
                                        <p className="participate"><span> Participate By : </span> <span
                                            className="p-user"> {review.reviewer.last_name}  </span></p>
                                    </div>
                                }

                            </div>

                        </div>
                    </div>

                    <Feedback
                        type="self"
                        review_index={index}
                        review_id={review.id}
                        review={review}
                        reviews={feedbacks}
                        self_feedbacks={review.feedbacks} />

                </div>
            )
        }) : null;
    }


    render(){
        let { feedbacks } = this.props.feedbacks;
        return (
            <div className="adminRoot">
                <Navbar />
                <div className="container main-content-area">
                    <Sidebar />
                    <div className="col-md-8 main-content ">
                        <div className="content-widget bg-white">
                            <div className="bg-blue content-header">
                                <h3 className="title "> All Feedback List </h3>
                            </div>
                            <div className="content-body">
                                <div className="flex-box p-b-15 p-t-15 item-align-center">
                                    <div className="flex-2">
                                        <p className="total-employer">
                                            <span> {feedbacks.length} </span>
                                            <span> <small>Feedback</small> </span>
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