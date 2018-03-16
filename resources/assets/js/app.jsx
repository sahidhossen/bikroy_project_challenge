require('./bootstrap');

import React from "react";
import ReactDOM from "react-dom";

import Admin from './Admin';
if (document.getElementById('admin')) {
    ReactDOM.render(<Admin />, document.getElementById('admin'));
}

import Employee from './Employee';
if (document.getElementById('employee')) {
    ReactDOM.render(<Employee />, document.getElementById('employee'));
}

