import React from "react";
import { Provider } from 'react-redux';
import store from './store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import EmployeeDashboard from './components/employee/EmployeeDashboard';
import ReviewDashboard from './components/employee/ReviewDashboard';

import NoteFound from './components/errors/NoteFound';

export default class Employee extends React.Component {
    render(){
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/dashboard" component={EmployeeDashboard}/>
                        <Route exact path="/dashboard/reviews" component={ReviewDashboard}/>
                        <Route path="/*" component={NoteFound} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}