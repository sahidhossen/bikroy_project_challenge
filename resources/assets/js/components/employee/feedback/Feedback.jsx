import React from 'react';
import { createNewFeedback } from '../../../actions/feedbackAction';
import { connect } from 'react-redux';
import moment from 'moment';
@connect( (store) => {
    return {
        feedbacks : store.feedbacks
    }
})
export default class Feedback extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            feedback : '',
            error : false
        }
    }

    componentWillReceiveProps( nextProps ){
        let { new_feedback_fetched } = nextProps.feedbacks;
        if( new_feedback_fetched )
            this.setState({ feedback: '' })
    }

    addFeedback(event){
        event.preventDefault();
        let { feedback, error } = this.state;
        let { reviews, review_id,  review_index } = this.props;
        let data = { feedback: feedback, review_id: review_id };
        if( feedback === '' || feedback.length < 5 ){
            this.setState({ error: true });
            return false;
        }
        this.setState({ error: false });
        this.props.dispatch( createNewFeedback(reviews,review_index, data ) );
    }
    changeField(event){
        let { feedback } = this.state;
        feedback = event.target.value;
        this.setState({ feedback });
    }

    meta_key(review, feedback){
        let options = { write_by : "Unknown", className: "" };

        if( review.reviewer_id === feedback.user_id ) {
            options.write_by = "Reviewer: " + review.reviewer.first_name + " " + review.reviewer.last_name;
            options.className = "reviewer";
        }
        if( review.assign_id === feedback.user_id ) {
            options.write_by = "Feedback: " + review.assigned.first_name + " " + review.assigned.last_name;
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
        let errorClass = this.state.error ? 'has-error' : '';
        return (
            <div className="feedback-area row">
                <div className="feedback-form">
                    <textarea name="feedback" onChange={this.changeField.bind(this)} value={this.state.feedback} className={"form-control " + errorClass} placeholder="Give your feedback!" />
                    <p className="text-right"><a href="#" className="soft-btn soft-blue" onClick={this.addFeedback.bind(this)}> Add Feedback </a></p>
                </div>

                <div className="feedback-list">
                    { this.feedbackList() }
                </div>
            </div>
        )
    }
}