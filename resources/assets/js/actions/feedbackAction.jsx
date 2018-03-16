import axios from 'axios';
export function fetchAllFeedback(){
    return function (dispatch) {
        axios.get('/api/feedbacks')
            .then(function (response) {
                if( response.data.success === true ) {
                    dispatch({type: 'FETCH_FEEDBACK_FULFILLED', payload: response.data.feedbacks});
                }
            })
            .catch(function (error) {
                console.log("feedback error: ",error);
                if( typeof error.response !== 'undefined' && error.response.status === 401 )
                    dispatch({ type:'FETCH_OAUTH_EXPIRED', payload: true });

                dispatch({ type:'FETCH_FEEDBACK_REJECTED', payload: error })
            });
    }
}

export function fetchAllReviewFeedback(){
    return function (dispatch) {
        axios.get('/api/feedback/review')
            .then(function (response) {
                if( response.data.success === true ) {
                    dispatch({type: 'FETCH_REVIEW_FEEDBACK_FULFILLED', payload: response.data.feedbacks});
                }
            })
            .catch(function (error) {
                console.log("REVIEW feedback error: ",error);
                if( typeof error.response !== 'undefined' && error.response.status === 401 )
                    dispatch({ type:'FETCH_OAUTH_EXPIRED', payload: true });

                dispatch({ type:'FETCH_REVIEW_FEEDBACK_REJECTED', payload: error })
            });
    }
}


export function createNewReviewFeedback(reviews, review_index, data){
    return function (dispatch) {
        axios.post('/api/feedback/review/create', data)
            .then(function (response) {
                if( response.data.success === true ) {
                    let newReviewFeedback = response.data.feedback;
                    let feedbacks = reviews[review_index].feedbacks;
                    feedbacks.unshift(newReviewFeedback);
                    dispatch({type: 'FETCH_NEW_REVIEW_FEEDBACK_FULFILLED', payload: reviews});
                }
            })
            .catch(function (error) {
                console.log("add feedback error: ",error);
                if( typeof error.response !== 'undefined' && error.response.status === 401 )
                    dispatch({ type:'FETCH_OAUTH_EXPIRED', payload: true });
                dispatch({ type:'FETCH_NEW_REVIEW_FEEDBACK_REJECTED', payload: error })
            });
    }
}

export function createNewFeedback(reviews, review_index, data){
    return function (dispatch) {
        axios.post('/api/feedback/create', data)
            .then(function (response) {
                if( response.data.success === true ) {
                    let newReviewFeedback = response.data.feedback;
                    let feedbacks = reviews[review_index].feedbacks;
                    feedbacks.unshift(newReviewFeedback);
                    dispatch({type: 'FETCH_NEW_FEEDBACK_FULFILLED', payload: reviews});
                    dispatch({type:"FETCH_NOTIFICATION_FULFILLED", payload: response.data.message, notification_type:1 })
                }
            })
            .catch(function (error) {
                console.log("add feedback error: ",error);
                if( typeof error.response !== 'undefined' && error.response.status === 401 )
                    dispatch({ type:'FETCH_OAUTH_EXPIRED', payload: true });
                dispatch({ type:'FETCH_NEW_FEEDBACK_REJECTED', payload: error })
            });
    }
}

export function updateReview(feedbacks, index, data){
    return function (dispatch) {
        axios.post('/api/feedback/update', data)
            .then(function (response) {
                if( response.data.success === true ) {
                    feedbacks[index] = response.data.feedback;
                    dispatch({type: 'FETCH_NEW_FEEDBACK_FULFILLED', payload: feedbacks});
                    dispatch({type:"FETCH_NOTIFICATION_FULFILLED", payload: response.data.message, notification_type:1 })
                }
            })
            .catch(function (error) {
                console.log("add feedback error: ",error);
                if( typeof error.response !== 'undefined' && error.response.status === 401 )
                    dispatch({ type:'FETCH_OAUTH_EXPIRED', payload: true });

                dispatch({ type:'FETCH_NEW_FEEDBACK_REJECTED', payload: error })
            });
    }
}
