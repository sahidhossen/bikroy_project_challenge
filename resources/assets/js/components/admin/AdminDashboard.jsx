import React from "react";
import Navbar from '../elements/Navbar';
import Sidebar from '../elements/Sidebar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllEmployee, deleteEmployee } from '../../actions/employeeAction';
import moment from 'moment';

@connect( (store) => {
    return {
        employees : store.employees
    }
})
export default class AdminDashboard extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        let { fetched } = this.props.employees;
        if( fetched === false )
            this.props.dispatch( fetchAllEmployee() );
    }

    onDelete(index, event){
        event.preventDefault();
        let { employees } = this.props.employees;
        let target_employee = employees[index];
        let data ={ id: target_employee.id };
        this.props.dispatch(deleteEmployee(employees, index, data ))
    }

    componentWillReceiveProps(nextProps){
        let { deleted } = nextProps.employees;
        if( deleted ) {
            this.props.dispatch({ type: 'NEW_EMPLOYEE_RESET' });
        }
    }

    employerList(){
        let { employees, fetched } = this.props.employees;
        return ( fetched && employees.length > 0 ) ? employees.map( (employee, index) => {
            return (
                <div className="employee" key={index}>
                    <div className="flex-box item-align-center">
                        <div className="flex-2 user-info">
                            <h3 className="username"> { employee.first_name } { employee.last_name } <span className="date-time"> From: {  moment(employee.created_at).format('MMM YYYY ') } </span> </h3>
                            <p className="designation"> { employee.designation } </p>
                        </div>
                        <div className="action-part flex-1 text-center">
                            <a href="#" className="soft-btn soft-red" onClick={this.onDelete.bind(this, index)}> Delete </a>
                            <Link className="soft-btn soft-blue" to={`/dashboard/employee/${employee.id}`}> Update </Link>
                        </div>
                    </div>
                </div>
            )
        }) : null;
    }


    render(){
        let { employees } = this.props.employees;
        return (
            <div className="adminRoot">
                <Navbar />
                <div className="container main-content-area">
                    <Sidebar />
                    <div className="col-md-8 main-content ">
                        <div className="content-widget bg-white">
                            <div className="bg-blue content-header">
                                <h3 className="title "> All Employers List </h3>
                            </div>
                            <div className="content-body">
                                <div className="flex-box p-b-15 p-t-15 item-align-center">
                                    <div className="flex-2">
                                        <p className="total-employer">
                                            <span> {employees.length} </span>
                                            <span> <small>Employer</small> </span>
                                        </p>
                                    </div>
                                    <div className="action-part flex-1 text-center">
                                        <Link to="/dashboard/new_employee" className="btn btn-default btn-success" replace> Add Employee </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="content-widget bg-white">
                            <div className="content-body">
                                <div className="employee-list">
                                    { this.employerList() }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}