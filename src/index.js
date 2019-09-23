import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import FIFSRegistration from './components/FIFSRegistration';
import './css/FIFSRegistration.css';

import CONFIG  from './config/config'

ReactDOM.render(
	<FIFSRegistration
		root='/react/ens-registration'
		ethereum={window.ethereum}
		config={CONFIG}
	/>,
	document.getElementById('root')
);
