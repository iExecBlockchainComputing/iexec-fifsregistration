import React from 'react';
import { ethers } from 'ethers'
import Instascan from '@eventstag/instascan';

const ADDR = /0x[0-9a-zA-Z]{40}/

class GetAddr extends React.Component
{
	state = { scanner: null, addr: "", valid: false }

	componentDidMount()
	{
		Instascan.Camera.getCameras()
		.then(cameras => {
			let scanner = new Instascan.Scanner({ video: document.getElementById('preview') })
			scanner.addListener('scan', this.process.bind(this))
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

	checkValidity(addr)
	{
		return new Promise((resolve, reject) => {
			try
			{
				resolve(ethers.utils.getAddress(ADDR.exec(addr)[0]))
			}
			catch
			{
				this.props.context.provider.resolveName(addr)
				.then(addr => { addr ? resolve(addr) : reject() })
				.catch(reject)
			}
		})
	}

	process(addr)
	{
		if (addr)
		{
			this.checkValidity(addr)
			.then(address => {
				this.props.history.push(`/${this.props.match.params.label}/${address}`)
			})
			.catch(() => {
				console.error(`'${addr}' is not an ethereum address`)
			})
		}
	}

	submit(event)
	{
		event.preventDefault()
		this.process(this.state.addr)
	}

	handleChange(ev)
	{
		this.setState({ addr: ev.target.value })
		this.checkValidity(ev.target.value)
		.then (() => { this.setState({ valid: true  }) })
		.catch(() => { this.setState({ valid: false }) })
	}

	render()
	{
		return (
			<form onSubmit={ this.submit.bind(this) } className={ this.state.valid ? 'valid' : '' }>
				<video id='preview'/>
				<div className='inputgroup'>
					<input
						placeholder='ethereum address'
						onChange={ this.handleChange.bind(this) }
					/>
				</div>
				<button type='submit'>
					Go
				</button>
			</form>
		);
	}
}

export default GetAddr;
