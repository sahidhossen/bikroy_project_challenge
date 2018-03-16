import React from "react";
import Navbar from '../elements/Navbar';
import Sidebar from '../elements/Sidebar';
import { connect } from 'react-redux';
import { updateEmployee } from '../../actions/employeeAction';
import { fetchAllEmployee } from '../../actions/employeeAction';

@connect( (store) => {
    return {
        employees : store.employees,
        user : store.user
    }
})

export default class UpdateEmployee extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            validate: {
                first_name: false,
                last_name: false,
                designation: false,
                mobile: false,
                email: false
            },
            employee : {
                first_name: '',
                last_name: '',
                designation: '',
                mobile: '',
                email: '',
                password: '',
                address: '',
                basic_info: '',
            }
        }
    }

    componentDidMount(){
        let { employees, fetched } = this.props.employees;
        if( fetched === false && employees.length === 0 )
            this.props.dispatch(fetchAllEmployee());
        else
            this.findEmployee(employees);
    }
    componentWillReceiveProps(nextProps){
        let { new_employee_fetched, fetched, employees } = nextProps.employees;
        if( new_employee_fetched ) {
            this.props.dispatch({ type: 'NEW_EMPLOYEE_RESET' });
            this.props.history.push('/dashboard', true);
        }
        if( fetched ){
            this.findEmployee(employees)
        }
    }
    findEmployee(employees){
        let { params } = this.props.match;
        const result = employees.find( employee => employee.id ===  parseInt(params.employee_id) );
        this.setState({ employee : result })
    }

    updateField(event){
        let { employee } = this.state;
        if( event.target.name === 'designation' )
            employee.designation = event.target.value;

        if( event.target.name === 'first_name' )
            employee.first_name = event.target.value;

        if( event.target.name === 'last_name' )
            employee.last_name = event.target.value;

        if( event.target.name === 'mobile' )
            employee.mobile = event.target.value;

        if( event.target.name === 'email' )
            employee.email = event.target.value;

        if( event.target.name === 'address' )
            employee.address = event.target.value;

        if( event.target.name === 'basic_info' )
            employee.basic_info = event.target.value;

        this.setState({ employee });

    }

    saveEmployee(event){
        event.preventDefault();

        let { employee, validate } = this.state;
        let { employees } = this.props.employees;
        validate.designation = ( employee.designation === '' || employee.designation.length < 3 );
        validate.first_name = ( employee.first_name === '' || employee.first_name.length < 2 );
        validate.last_name = ( employee.last_name === '' || employee.last_name.length < 3 );
        validate.mobile = ( employee.mobile === '' || employee.mobile.length < 10 );
        validate.email = ( employee.email === '' || !this.IsEmail(employee.email) );

        let error = this.checkValidation( validate );
        if( error )
            return false;

        this.props.dispatch( updateEmployee(employees, this.props.index, employee) );
        this.setState({ validate })
    }

    checkValidation(validate){
        let errorFound = false;
        for (let [key, value] of Object.entries(validate)) {
            if( value ) {
                errorFound = true;
                break;
            }
        }
        return errorFound;
    }



    IsEmail(email) {
        let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    render(){
        let { user, fetched }  = this.props.user;
        let { validate } = this.state;
        return (
            <div className="adminRoot">
                <Navbar />
                <div className="container main-content-area">
                    <Sidebar />
                    <div className="col-md-8 main-content ">
                        <div className="content-widget bg-white">
                            <div className="bg-blue content-header">
                                <h3 className="title "> Update Employee Information </h3>
                            </div>
                            <div className="content-body">
                                <div className="flex-box p-b-15 p-t-15 item-align-center">
                                    <div className="flex-1">
                                        <p> Please fill up the information carefully! </p>
                                    </div>
                                    <div className="action-part text-center"><a href="#" onClick={this.saveEmployee.bind(this)} className="btn btn-default btn-success"> Update </a></div>
                                </div>
                            </div>
                        </div>

                        <div className="content-widget bg-white">
                            <div className="content-body">
                                <form className="employee-form form" method="post">
                                    <div className="form-group">
                                        <label htmlFor="firstName">Designation
                                            <span className="required text-orange">*</span>
                                            {validate.designation ? <span className="error-msg text-red">(Required)</span>: null }
                                        </label>
                                        <input type="text" onChange={this.updateField.bind(this)} value={this.state.employee.designation} className="form-control" name="designation" placeholder="Designation"/>
                                    </div>
                                    <div className="form-group flex-box">
                                        <div className="flex-1 item-align-center part-1">
                                            <label htmlFor="firstName">First Name <span className="required text-orange">*</span></label>
                                            <input type="text" onChange={this.updateField.bind(this)} value={this.state.employee.first_name} className="form-control" name="first_name" placeholder="First Name"/>
                                        </div>
                                        <div className="flex-1 item-align-center part-2">
                                            <label htmlFor="firstName">Last Name <span className="required text-orange">*</span></label>
                                            <input type="text" onChange={this.updateField.bind(this)} value={this.state.employee.last_name} className="form-control" name="last_name" placeholder="Last Name"/>
                                        </div>
                                    </div>
                                    <div className="form-group flex-box">
                                        <div className="flex-1 item-align-center part-1">
                                            <label htmlFor="Mobile">Mobile <span className="required text-orange">*</span></label>
                                            <input type="text" onChange={this.updateField.bind(this)} value={this.state.employee.mobile} className="form-control" name="mobile" placeholder="Mobile"/>
                                        </div>
                                        <div className="flex-1 item-align-center part-2">
                                            <label htmlFor="firstName">Company </label>
                                            <input type="text" onChange={this.updateField.bind(this)} value={ fetched ? user.company.company_name : '' } className="form-control" readOnly={true} name="company" placeholder="Company"/>
                                        </div>
                                    </div>
                                    <div className="form-group flex-box">
                                        <div className="flex-1 item-align-center part-1">
                                            <label htmlFor="firstName">Email <span className="required text-orange">*</span></label>
                                            <input type="email" onChange={this.updateField.bind(this)} value={this.state.employee.email} className="form-control" name="email" placeholder="Email Address"/>
                                        </div>
                                        <div className="flex-1 item-align-center part-2">
                                            <label htmlFor="firstName">Password <span className="required text-orange">*</span></label>
                                            <input type="password" readOnly={true} value="password" className="form-control" name="password" placeholder="Password"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="firstName"> Address </label>
                                        <textarea name="address" onChange={this.updateField.bind(this)} className="form-control" value={this.state.employee.address === null ? '' : this.state.employee.address} placeholder="Address"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="firstName"> About Employee </label>
                                        <textarea name="basic_info" onChange={this.updateField.bind(this)} className="form-control" value={this.state.employee.basic_info === null ? '' : this.state.employee.basic_info} placeholder="About Employee"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}