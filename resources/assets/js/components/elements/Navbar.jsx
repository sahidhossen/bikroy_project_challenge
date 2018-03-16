import React from 'react'; 
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchCurrentUser } from  '../../actions/userAction';
import { Link } from 'react-router-dom'

@connect( (store) => {
    return {
        user : store.user,
        notification: store.notification
    }
})

export default class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            notification_allow : false
        }
    }

    componentDidMount(){
        let { fetched } = this.props.user;
        if( fetched === false )
            this.props.dispatch( fetchCurrentUser() );
    }

    componentWillReceiveProps(nextProps){
        let { notification_list } = this.state;
        let { notification, fetched } = nextProps.notification;
        if( fetched === true ){
            setTimeout(() => {
                this.props.dispatch({ type:"NOTIFICATION_RESET"})
            }, 10000);

        }

    }

    logOut(e){
        e.preventDefault();
        axios.post('/user_logout')
            .then(function (response) {
                if( response.data.success === true ){
                    window.location.reload()
                }else {
                    console.log("Something went wrong!");
                }
            })
            .catch(function (error) {
                console.log("logout-error: ", error);
            });
    }

    notification(){
        let { notification } = this.props.notification;
        return (
            <div className="notification">
                <div className="notification-message">
                    <p> { notification } </p>
                </div>
            </div>
        )

    }

    render(){
        let { fetched } = this.props.notification;
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
                            <span className="sr-only">Toggle Navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">XYZ</a>
                    </div>

                    <div className="collapse navbar-collapse" id="app-navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/dashboard" replace> Dashboard </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/reviews" replace> Reviews </Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">

                            <li className="dropdown">
                                <a onClick={this.logOut.bind(this)} href="/logout">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>

                { (fetched) ? this.notification() : null }

            </nav>
        )
    }
}
