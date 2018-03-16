import axios from 'axios';
export function fetchAllReview(){
    return function (dispatch) {
        axios.get('/api/reviews')
            .then(function (response) {
                console.log("response: ", response);
                if( response.data.success === true ) {
                    dispatch({type: 'FETCH_REVIEW_FULFILLED', payload: response.data.reviews});
                }
            })
            .catch(function (error) {
                console.log("review error: ",error);
                if( typeof error.response !== 'undefined' && error.response.status === 401 )
                    dispatch({ type:'FETCH_OAUTH_EXPIRED', payload: true });

                dispatch({ type:'FETCH_REVIEW_REJECTED', payload: error })
            });
    }
}

export function createNewReview(reviews, data){
    return function (dispatch) {
        axios.post('/api/review/create', data)
            .then(function (response) {
                if( response.data.success === true ) {
                    let newReview = response.data.reviews;
                    reviews.unshift(newReview);
                    dispatch({type: 'FETCH_NEW_REVIEW_FULFILLED', payload: reviews});
                    dispatch({type:"FETCH_NOTIFICATION_FULFILLED", payload: response.data.message, notification_type:1 })
                }
            })
            .catch(function (error) {
                console.log("add review error: ",error);
                if( typeof error.response !== 'undefined' && error.response.status === 401 )
                    dispatch({ type:'FETCH_OAUTH_EXPIRED', payload: true });

                dispatch({ type:'FETCH_NEW_REVIEW_REJECTED', payload: error })
            });
    }
}

export function updateReview(reviews, index, data){
    return function (dispatch) {
        axios.post('/api/review/update', data)
            .then(function (response) {
                if( response.data.success === true ) {
                    reviews[index] = response.data.reviews;
                    dispatch({type: 'FETCH_NEW_REVIEW_FULFILLED', payload: reviews});
                    dispatch({type:"FETCH_NOTIFICATION_FULFILLED", payload: response.data.message, notification_type:1 })
                }
            })
            .catch(function (error) {
                console.log("add review error: ",error);
                if( typeof error.response !== 'undefined' && error.response.status === 401 )
                    dispatch({ type:'FETCH_OAUTH_EXPIRED', payload: true });

                dispatch({ type:'FETCH_NEW_REVIEW_REJECTED', payload: error })
            });
    }
}

export function deleteReview(reviews, index, data){
    return function (dispatch) {
        axios.post('/api/review/delete', data)
            .then(function (response) {
                if( response.data.success === true ) {
                    reviews.splice(index, 1);
                    dispatch({type: 'FETCH_REVIEW_DELETE_FULFILLED', payload: reviews});
                    dispatch({type:"FETCH_NOTIFICATION_FULFILLED", payload: response.data.message, notification_type:1 })
                }
            })
            .catch(function (error) {
                console.log("delete review error: ",error);
                if( typeof error.response !== 'undefined' && error.response.status === 401 )
                    dispatch({ type:'FETCH_OAUTH_EXPIRED', payload: true });

                dispatch({ type:'FETCH_REVIEW_DELETE_REJECTED', payload: error })
            });
    }
}