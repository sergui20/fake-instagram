import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../header/containers/header';
import Homepage from '../homepage/containers/homepage';

import '../../css/styles.css';

const header = document.getElementById('header-container');
const mainContainer = document.getElementById('main-container');

ReactDOM.render(<Header></Header>, header)
ReactDOM.render(<Homepage></Homepage>, mainContainer);