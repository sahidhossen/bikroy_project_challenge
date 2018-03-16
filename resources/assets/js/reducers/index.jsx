import { combineReducers } from 'redux'

import user from './userReducer';
import employees from './employeeReducer';
import reviews from './reviewReducer';
import feedbacks from './feedbackReducer';
import notification from './notificationReducer';

export default combineReducers({
    user,
    employees,
    reviews,
    feedbacks,
    notification
})