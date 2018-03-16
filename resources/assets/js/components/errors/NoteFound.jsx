import React from "react";

export default class NoteFound extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="noteFoundRoot">
                <h1 className="text-center"> Sorry you may mistake url typing !  </h1>
            </div>
        )
    }
}