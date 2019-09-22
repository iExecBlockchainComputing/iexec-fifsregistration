import React from "react"
import { MemoryRouter as Router, Route, Redirect } from 'react-router-dom'
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
		ethereum: this.props.ethereum || window.ethereum,
		provider: null,
		ens:      null,
		proxy:    null,
		enabled:  false,
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
				this.setState({
					provider,
					ens:     new ethers.Contract(this.state.config.ensAddress || network.ensAddress, ABI.ens, provider),
					proxy:   new ethers.Contract(this.state.config.proxy, ABI.proxy, provider.getSigner()),
					enabled: true,
				})
			})
		})
	}

	setLabel(history, label)
	{
		this.setState({ label })
		history.push('/address')
	}

	setAddress(history, address)
	{
		this.setState({ address })
		history.push('/process')
	}

	finalize(history, success)
	{
		history.push(success ? '/success' : '/failure')
	}

	render()
	{
		return (
			<div className='FIFSRegistration'>
				<Router>
				{
					this.state.enabled
					?
						<>
							<Redirect exact from='/' to='/label' />
							<Route exact path='/label'   render={ (props) => <RouteLabel   context={this.state} callback={ this.setLabel.bind(this, props.history)   } {...props}/> } />
							<Route exact path='/address' render={ (props) => <RouteAddress context={this.state} callback={ this.setAddress.bind(this, props.history) } {...props}/> } />
							<Route exact path='/process' render={ (props) => <RouteProcess context={this.state} callback={ this.finalize.bind(this, props.history)   } {...props}/> } />
							<Route exact path='/success' render={ (props) => <RouteSuccess context={this.state}                                                        {...props}/> } />
							<Route exact path='/failure' render={ (props) => <RouteFailure context={this.state}                                                        {...props}/> } />
						</>
					:
						<>
							<Route exact path='/' render={ (props) => null } />
						</>
				}
				</Router>
			</div>
		)
	}
}

export default FIFSRegistration
