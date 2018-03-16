import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { createNewReview } from '../../../actions/reviewAction';

@connect( (store) => {
    return {
        employees : store.employees,
        reviews : store.reviews
    }
})
export default class CreateReview extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options: [],
            review: {
                review_name: '',
                description:'',
                assign_id: 0,
                reviewer_id: 0,
            },
            validate: {
                review_name: false,
                assign_id: false
            }
        }
    }
    componentDidMount(){
        let { employees } = this.props.employees;
        this.prepareSelectOptions(employees);
    }

    componentWillReceiveProps(nextProps){
        let { new_review_fetched } = nextProps.reviews;
        if( new_review_fetched ) {
            this.props.dispatch({ type: 'NEW_REVIEW_RESET' });
            this.props.cancelOperation();
        }
    }

    prepareSelectOptions(employees){
        let options = employees.map( (employee, index)=> {
            return { value: employee.id, label:employee.first_name+' '+employee.last_name };
        });
        this.setState({ options })
    }

    cancelOperation(event){
        event.preventDefault();
        this.props.cancelOperation();
    }

    onChange(event){
        let { review } = this.state;

        if( event.target.name === 'review_name' )
            review.review_name = event.target.value;
        if( event.target.name === 'description' )
            review.description = event.target.value;
        this.setState({ review });
    }
    assignChange(option){
        let {review} = this.state;
        review.assign_id = (option === null ) ? 0 : option.value;
        this.setState({ review })
    }
    reviewerChange(option){
        let {review} = this.state;
        review.reviewer_id = (option === null ) ? 0 : option.value;
        this.setState({ review })
    }
    saveReview(event){
        event.preventDefault();
        let { review, validate } = this.state;
        let { reviews } = this.props.reviews;
        validate.review_name = ( review.review_name === '' || review.review_name.length < 5 );
        validate.assign_id = ( review.assign_id === 0 );
        let error = this.checkValidation( validate );
        if( error )
            return false;
        this.props.dispatch( createNewReview(reviews, review) );
    }

    checkValidation(validate){
        let errorFound = false;
        for (let [key, value] of Object.entries(validate)) {
            if( value ) {
                errorFound = true;
                break;
            }
        }
        return errorFound;
    }

    render(){
        return (
            <div className="content-widget bg-white">
                <div className="content-body">
                    <div className="create_new_review">
                        <form className="form">
                            <div className="form-group">
                                <label htmlFor="reviewName">Review Name</label>
                                <input type="text" onChange={this.onChange.bind(this)} className="form-control" placeholder="Title" name="review_name"/>
                            </div>
                            <div className="form-group flex-box">
                                <div className="flex-1 assign-box">
                                    <label htmlFor="AssignUser">Assign: </label>
                                    <Select
                                        name="assigned_id"
                                        value={this.state.review.assign_id}
                                        onChange={this.assignChange.bind(this)}
                                        options={this.state.options}
                                    />
                                </div>
                                <div className="flex-1 reviewer-box">
                                    <label htmlFor="AssignUser">Reviewer: </label>
                                    <Select
                                        name="reviewer_id"
                                        value={this.state.review.reviewer_id}
                                        onChange={this.reviewerChange.bind(this)}
                                        options={this.state.options}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Details"> Details <small className="text-muted">(optional)</small> </label>
                                <textarea name="description" onChange={this.onChange.bind(this)} className="form-control" placeholder="Description"/>
                            </div>
                            <div className="control-box">
                                <a href="#" className="btn btn-success btn-md" onClick={this.saveReview.bind(this)}> Create </a>
                                <a href="#" className="btn btn-danger btn-md" onClick={this.cancelOperation.bind(this)}> Cancel </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}