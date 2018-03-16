import axios from 'axios';
export function fetchAllEmployee(){
    return function (dispatch) {
        axios.get('/api/employee')
            .then(function (response) {
                if( response.data.success === true ) {
                    dispatch({type: 'FETCH_EMPLOYEE_FULFILLED', payload: response.data.employees});
                }
            })
            .catch(function (error) {
                console.log("employee error: ",error);
                if( typeof error.response !== 'undefined' && error.response.status === 401 )
                    dispatch({ type:'FETCH_OAUTH_EXPIRED', payload: true });

                dispatch({ type:'FETCH_EMPLOYEE_REJECTED', payload: error })
            });
    }
}

export function createNewEmployee(allEmployee, data){
    return function (dispatch) {
        axios.post('/api/employee/create', data)
            .then(function (response) {
                if( response.data.success === true ) {
                    let newEmployee = response.data.employee;
                    allEmployee.unshift(newEmployee);
                    dispatch({type: 'FETCH_EMPLOYEE_NEW_FULFILLED', payload: allEmployee});
                    dispatch({type:"FETCH_NOTIFICATION_FULFILLED", payload: response.data.message, notification_type:1 })
                }
            })
            .catch(function (error) {
                console.log("add employee error: ",error);
                if( typeof error.response !== 'undefined' && error.response.status === 401 )
                    dispatch({ type:'FETCH_OAUTH_EXPIRED', payload: true });

                dispatch({ type:'FETCH_EMPLOYEE_NEW_REJECTED', payload: error })
            });
    }
}

export function updateEmployee(allEmployee, index, data){
    return function (dispatch) {
        axios.post('/api/employee/update', data)
            .then(function (response) {
                if( response.data.success === true ) {
                    allEmployee[index] = response.data.employee;
                    dispatch({type:"FETCH_NOTIFICATION_FULFILLED", payload: response.data.message, notification_type:1 })
                    dispatch({type: 'FETCH_EMPLOYEE_NEW_FULFILLED', payload: allEmployee});
                }
            })
            .catch(function (error) {
                console.log("add employee error: ",error);
                if( typeof error.response !== 'undefined' && error.response.status === 401 )
                    dispatch({ type:'FETCH_OAUTH_EXPIRED', payload: true });

                dispatch({ type:'FETCH_EMPLOYEE_NEW_REJECTED', payload: error })
            });
    }
}

export function deleteEmployee(allEmployee, index, data){
    return function (dispatch) {
        axios.post('/api/employee/delete', data)
            .then(function (response) {
                if( response.data.success === true ) {
                    allEmployee.splice(index, 1);
                    dispatch({type: 'FETCH_EMPLOYEE_DELETE_FULFILLED', payload: allEmployee});
                    dispatch({type:"FETCH_NOTIFICATION_FULFILLED", payload: response.data.message, notification_type:1 })
                }
            })
            .catch(function (error) {
                console.log("delete employee error: ",error);
                if( typeof error.response !== 'undefined' && error.response.status === 401 )
                    dispatch({ type:'FETCH_OAUTH_EXPIRED', payload: true });

                dispatch({ type:'FETCH_EMPLOYEE_DELETE_REJECTED', payload: error })
            });
    }
}