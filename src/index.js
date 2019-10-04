import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import FIFSRegistration from './components/FIFSRegistration'
import './css/FIFSRegistration.css'

import CONFIG  from './config/config'

if (window.ethereum)
{
	window.ethereum.autoRefreshOnNetworkChange = false
}

ReactDOM.render(
	<FIFSRegistration
		root=''
		ethereum={window.ethereum}
		config={CONFIG}
	/>,
	document.getElementById('root')
)
