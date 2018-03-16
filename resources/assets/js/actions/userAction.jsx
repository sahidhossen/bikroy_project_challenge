import axios from 'axios';
export function fetchCurrentUser(){
    return function (dispatch) {
        axios.get('/api/user')
            .then(function (response) {

                dispatch({ type:'FETCH_USER_FULFILLED', payload:response.data.user });
            })
            .catch(function (error) {

                if( typeof error.response !== 'undefined' && error.response.status === 401 )
                    dispatch({ type:'FETCH_OAUTH_EXPIRED', payload: true });

                console.log(error);

                dispatch({ type:'FETCH_USER_REJECTED', payload: error })
            });
    }
}