import React from 'react';

import Instascan from '@eventstag/instascan';

class Scanner extends React.Component
{
	state: { scanner: null }

	componentDidMount()
	{
		Instascan.Camera.getCameras()
		.then(cameras => {
			let scanner = new Instascan.Scanner({ video: document.getElementById('scanner-preview') })
			scanner.addListener('scan', this.getAddress.bind(this))
			scanner.start(cameras[0])
			.then(() => this.setState({ scanner }))
			.catch(console.error)
		})
		.catch(console.error)
	}

	componentWillUnmount()
	{
		this.state.scanner.stop()
	}

	getAddress(addr)
	{
		if (this.props.callback) this.props.callback(addr)
	}

	render()
	{
		return (
			<video id='scanner-preview'/>
		);
	}
}

export default Scanner;
