
export default function reducer(state = {
    notification : null,
    type: 1,
    fetching: false,
    fetched: false,
    error: null
}, action ) {

    switch( action.type ){
        case 'FETCH_NOTIFICATION': {
            return { ...state, fetching: true }
        }
        case "NOTIFICATION_RESET": {
            return { ...state, fetching: false, fetched:false, notification:'' }
        }
        case "FETCH_NOTIFICATION_FULFILLED" : {
            return {
                ...state,
                fetching: true,
                fetched: true,
                type: action.notification_type,
                notification : action.payload
            }
        }
    }
    return state;

}