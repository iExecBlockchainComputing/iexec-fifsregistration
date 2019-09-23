import React from "react"
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from "history"
import { ethers } from 'ethers'

import RouteLabel   from './RouteLabel'
import RouteAddress from './RouteAddress'
import RouteProcess from './RouteProcess'
import RouteSuccess from './RouteSuccess'
import RouteFailure from './RouteFailure'

const ABI = {
	ens:   [{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}],
	proxy: [{"constant":false,"inputs":[{"internalType":"contractENSRegistry","name":"ens","type":"address"},{"internalType":"contractResolver","name":"resolver","type":"address"},{"internalType":"bytes32","name":"domain","type":"bytes32"},{"internalType":"bytes32","name":"label","type":"bytes32"},{"internalType":"address","name":"addr","type":"address"}],"name":"registerENS","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],
}

class FIFSRegistration extends React.Component
{
	state = {
		config:   this.props.config,
		root:     this.props.root || '',
		history:  createBrowserHistory(),
		ethereum: this.props.ethereum || window.ethereum,
		provider: null,
		ens:      null,
		proxy:    null,
	}

	goTo(route)
	{
		this.state.history.push(`${this.state.root}/${route}`)
	}

	enable()
	{
		return new Promise((resolve, reject) => {
			if (this.state.ethereum.enable)
			{
				this.state.ethereum.enable().then(resolve, reject)
			}
			else
			{
				resolve()
			}
		})
	}

	componentDidMount()
	{
		this.enable()
		.then(() => {
			const provider = new ethers.providers.Web3Provider(this.state.ethereum)
			provider.ready.then(network => {
				this.setState(
					{
						provider,
						ens:     new ethers.Contract(this.state.config.ensAddress || network.ensAddress, ABI.ens, provider),
						proxy:   new ethers.Contract(this.state.config.proxy, ABI.proxy, provider.getSigner()),
					},
					// () => this.goTo(this.state.history.location.pathname.substr(1) || 'label') // Dangerous, state will not be set
					() => this.goTo('label')
				)
			})
		})
	}

	getLabel(label)
	{
		this.setState({ label })
		this.goTo('address')
	}

	getAddress(address)
	{
		this.setState({ address })
		this.goTo('process')
	}

	getProcess(success)
	{
		this.goTo(success ? 'success' : 'failure')
	}

	render()
	{
		return (
			<div className='FIFSRegistration'>
				<Router history={this.state.history}>
				{
					this.state.provider
					?
						<>
							<Route exact path={ `${this.state.root}/label`   } render={ (props) => <RouteLabel   context={this.state} callback={ this.getLabel.bind(this)   } {...props}/> } />
							<Route exact path={ `${this.state.root}/address` } render={ (props) => <RouteAddress context={this.state} callback={ this.getAddress.bind(this) } {...props}/> } />
							<Route exact path={ `${this.state.root}/process` } render={ (props) => <RouteProcess context={this.state} callback={ this.getProcess.bind(this) } {...props}/> } />
							<Route exact path={ `${this.state.root}/success` } render={ (props) => <RouteSuccess context={this.state}                                         {...props}/> } />
							<Route exact path={ `${this.state.root}/failure` } render={ (props) => <RouteFailure context={this.state}                                         {...props}/> } />
						</>
					:
						<>
							<Route exact path={ `${this.state.root}/`        } render={ (props) => null } />
						</>
				}
				</Router>
			</div>
		)
	}
}

export default FIFSRegistration
