
export default function reducer(state = {
    reviews : [],
    fetching: false,
    fetched: false,
    new_review_fetching: false,
    new_review_fetched: false,
    deleting: false,
    deleted: true,
    error: null
}, action ) {

    switch( action.type ){
        case 'FETCH_REVIEW': {
            return { ...state, fetching: true }
        }
        case "FETCH_REVIEW_REJECTED": {
            return { ...state, fetching: false, error: action.payload }
        }
        case 'FETCH_NEW_REVIEW': {
            return { ...state, new_review_fetching: true }
        }
        case "FETCH_NEW_REVIEW_REJECTED": {
            return { ...state, new_review_fetching: false, error: action.payload }
        }
        case "NEW_REVIEW_RESET": {
            return { ...state, new_review_fetching: false, new_review_fetched: false, deleting: false, deleted: false }
        }
        case "FETCH_REVIEW_DELETE_FULFILLED": {
            return { ...state, deleting: true, deleted: true, reviews: action.payload }
        }
        case "FETCH_NEW_REVIEW_FULFILLED": {
            return {
                ...state,
                new_review_fetching: true,
                new_review_fetched: true,
                reviews: action.payload
            }
        }
        case "FETCH_REVIEW_FULFILLED" : {
            return {
                ...state,
                fetching: true,
                fetched: true,
                reviews : action.payload
            }
        }
    }
    return state;

}