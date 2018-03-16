import React from "react";
import { Provider } from 'react-redux';
import store from './store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AdminDashboard from './components/admin/AdminDashboard';
import AddEmployee from './components/admin/AddEmployee';
import UpdateEmployee from './components/admin/UpdateEmployee';
import ReviewDashboard from './components/admin/ReviewDashboard';
import NoteFound from './components/errors/NoteFound';

export default class Admin extends React.Component {
    render(){
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/dashboard" component={AdminDashboard}/>
                        <Route exact path="/dashboard/new_employee" component={AddEmployee}/>
                        <Route exact path="/dashboard/employee/:employee_id" component={UpdateEmployee}/>
                        <Route exact path="/dashboard/reviews" component={ReviewDashboard}/>
                        <Route path="/*" component={NoteFound} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}