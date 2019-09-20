import React from "react";
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { ethers } from 'ethers';

import GetLabel from './GetLabel';
import GetAddr  from './GetAddr';
import Process  from './Process';

const ABI = {
	ens:   [{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}],
	proxy: [{"constant":false,"inputs":[{"internalType":"contractENSRegistry","name":"ens","type":"address"},{"internalType":"contractResolver","name":"resolver","type":"address"},{"internalType":"bytes32","name":"domain","type":"bytes32"},{"internalType":"bytes32","name":"label","type":"bytes32"},{"internalType":"address","name":"addr","type":"address"}],"name":"registerENS","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],
}

class FIFSRegistration extends React.Component
{
	state = {
		config:   this.props.config,
		provider: null,
		ens:      null,
		proxy:    null,
		ready:    false,
	}

	enable()
	{
		return new Promise((resolve, reject) => {
			if (this.props.web3.enable)
			{
				this.props.web3.enable().then(resolve, reject);
			}
			else
			{
				resolve();
			}
		})
	}

	componentDidMount()
	{
		this.enable()
		.then(() => {
			const provider = new ethers.providers.Web3Provider(this.props.web3);
			provider.ready.then(network => {
				this.setState({
					provider,
					ens: new ethers.Contract(this.state.config.ensAddress || network.ensAddress, ABI.ens, provider),
					proxy: new ethers.Contract(this.state.config.proxy, ABI.proxy, provider.getSigner()),
					ready: true })
			})
		})
	}

	render()
	{
		return (
			<div className='FIFSRegistration'>
				{
					this.state.ready
					?
						<Router>
							<Route exact path='/'             render={ (props) => <GetLabel context={this.state} {...props}/> }/>
							<Route exact path='/:label'       render={ (props) => <GetAddr  context={this.state} {...props}/> }/>
							<Route exact path='/:label/:addr' render={ (props) => <Process  context={this.state} {...props}/> }/>
						</Router>
					:
						<div className='connecting'/>
				}
			</div>
		);
	};
}

export default FIFSRegistration;
