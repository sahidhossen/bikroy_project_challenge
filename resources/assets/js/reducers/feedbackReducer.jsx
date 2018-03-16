
export default function reducer(state = {
    feedbacks : [],
    review_feedbacks : [],
    fetching: false,
    fetched: false,

    review_feedback_fetching: false,
    review_feedback_fetched: true,

    new_feedback_fetching: false,
    new_feedback_fetched: false,

    new_review_feedback_fetching: false,
    new_review_feedback_fetched: false,
    error: null
}, action ) {

    switch( action.type ){
        case 'FETCH_FEEDBACK': {
            return { ...state, fetching: true }
        }
        case "FETCH_FEEDBACK_REJECTED": {
            return { ...state, review_feedback_fetching: false, error: action.payload }
        }

        case 'FETCH_NEW_FEEDBACK': {
            return { ...state, new_feedback_fetching: true }
        }

        case "NEW_FEEDBACK_RESET": {
            return {
                ...state,
                new_feedback_fetching: false,
                new_feedback_fetched: false,
                new_review_feedback_fetching: false,
                new_review_feedback_fetched: false,
            }
        }

        case "FETCH_NEW_FEEDBACK_REJECTED": {
            return {
                ...state,
                new_feedback_fetching: false,
                new_review_feedback_fetched: false,
                error: action.payload
            }
        }
        case "FETCH_NEW_FEEDBACK_FULFILLED": {
            return {
                ...state,
                new_feedback_fetching: true,
                new_feedback_fetched: true,
                feedbacks: action.payload
            }
        }
        case "FETCH_FEEDBACK_FULFILLED" : {
            return {
                ...state,
                fetching: true,
                fetched: true,
                feedbacks : action.payload
            }
        }
        //REVIEW FEEDBACK
        case "FETCH_NEW_REVIEW_FEEDBACK_REJECTED": {
            return {
                ...state,
                new_feedback_fetching: false,
                new_review_feedback_fetched: false,
                error: action.payload
            }
        }
        case "FETCH_NEW_REVIEW_FEEDBACK_FULFILLED": {
            return {
                ...state,
                new_review_feedback_fetching: true,
                new_review_feedback_fetched: true,
                review_feedbacks: action.payload
            }
        }
        case "FETCH_REVIEW_FEEDBACK_REJECTED": {
            return { ...state, fetching: false, error: action.payload }
        }
        case "FETCH_REVIEW_FEEDBACK_FULFILLED" : {
            return {
                ...state,
                review_feedback_fetching: true,
                review_feedback_fetched: true,
                review_feedbacks : action.payload
            }
        }
    }
    return state;

}