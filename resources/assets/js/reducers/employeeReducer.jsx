
export default function reducer(state = {
    employees : [],
    fetching: false,
    fetched: false,
    new_employee_fetching: false,
    new_employee_fetched: false,
    deleting: false,
    deleted: true,
    error: null
}, action ) {

    switch( action.type ){
        case 'FETCH_EMPLOYEE': {
            return { ...state, fetching: true }
        }
        case "FETCH_EMPLOYEE_REJECTED": {
            return { ...state, fetching: false, error: action.payload }
        }
        case 'FETCH_NEW_EMPLOYEE': {
            return { ...state, new_employee_fetching: true }
        }
        case "FETCH_EMPLOYEE_NEW_REJECTED": {
            return { ...state, new_employee_fetching: false, error: action.payload }
        }
        case "NEW_EMPLOYEE_RESET": {
            return { ...state, new_employee_fetching: false, new_employee_fetched: false, deleting: false, deleted: false }
        }
        case "FETCH_EMPLOYEE_DELETE_FULFILLED": {
            return { ...state, deleting: true, deleted: true, employees: action.payload }
        }
        case "FETCH_EMPLOYEE_NEW_FULFILLED": {
            return {
                ...state,
                new_employee_fetching: true,
                new_employee_fetched: true,
                employees: action.payload
            }
        }
        case "FETCH_EMPLOYEE_FULFILLED" : {
            return {
                ...state,
                fetching: true,
                fetched: true,
                employees : action.payload
            }
        }
    }
    return state;

}