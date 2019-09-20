import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';

import FIFSRegistration from './components/FIFSRegistration';
import './css/FIFSRegistration.css';

import CONFIG  from './config/config'

ReactDOM.render(
	<FIFSRegistration
		web3={window.ethereum}
		config={CONFIG}
	/>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
