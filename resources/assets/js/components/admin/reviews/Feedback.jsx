import React from 'react';
import moment from 'moment';

export default class Feedback extends React.Component {
    constructor(props){
        super(props);
    }


    meta_key(review, feedback){
        let options = { write_by : "Unknown", className: "" };

        if( review.reviewer_id === feedback.user_id ) {
            options.write_by = "Reviewer: " + review.reviewer.first_name + " " + review.reviewer.last_name;
            options.className = "reviewer";
        }
        if( review.assign_id === feedback.user_id ) {
            options.write_by = "Feedback: " + review.assign_user.first_name + " " + review.assign_user.last_name;
            options.className = "self";
        }
        return options;
    }

    feedbackList(){
        let { self_feedbacks } = this.props;
        return ( self_feedbacks.length > 0 ) ? self_feedbacks.map( (feedback, index) => {
            let { review } = this.props;
            let options = this.meta_key(review, feedback);
            return (
                <div className={"feedback "+options.className} key={index}>
                    <div className="writer">
                        { options.write_by }
                        <div className="time"> {  moment(feedback.created_at).format('h:mm:ss A | ddd, MMM YYYY ') } </div>
                    </div>
                    <div className="feedback-details">
                        <div className="details">
                            {feedback.feedback}
                        </div>
                    </div>
                </div>
            )
        }) : null ;
    }

    render(){
        return (
            <div className="feedback-area row">
                <div className="feedback-list">
                    { this.feedbackList() }
                </div>
            </div>
        )
    }
}