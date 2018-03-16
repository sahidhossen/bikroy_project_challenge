import React from 'react';
import { connect } from 'react-redux';
import avatar from '../../avatar.png';

@connect( (store) => {
    return {
        user : store.user
    }
})
export default class Sidebar extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        let avatarStyle = { backgroundImage: 'url('+avatar+')'};
        let { user, fetched } = this.props.user;
        return (
            <div className="col-md-4 sidebar">
                <div className="inner-sidebar">
                    <div className="widget company-profile bg-white">
                        <div className="widget-body">
                            <div className="company-name">
                                <h3 className="title text-blue"> XYZ IT Firm </h3>
                            </div>
                            <div className="flex-box item-align-center">
                                <div className="profile-pic"><i style={avatarStyle} className="avatar-thumb"></i></div>
                                <div className="user-info flex-1">
                                    <h3 className="username">  { fetched ? user.first_name +' '+user.last_name : <span className="false-data"> Full Nam </span>} </h3>
                                    <small> {fetched ? user.designation : <span className="false-data"> Designation </span> } </small>
                                </div>
                            </div>
                            <div className="special-doc m-t-10">
                                <p> { fetched  ? user.basic_info  : <span> About User Information </span>} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}