import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { FIFSRegistration } from '../src';
import '../src/css/FIFSRegistration.css';

import CONFIG  from './config'

ReactDOM.render(
	<FIFSRegistration
		web3={window.ethereum}
		config={CONFIG}
	/>,
	document.getElementById('root')
);
