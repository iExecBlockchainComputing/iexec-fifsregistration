import React from "react"
import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { ethers } from 'ethers'

import RouteConnect from './RouteConnect'
import RouteError   from './RouteError'
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
		root:     this.props.root || '',
		history:  createMemoryHistory(),
		ethereum: this.props.ethereum || window.ethereum,
		provider: null,
		network:  null,
		ens:      null,
		proxy:    null,
	}

	goTo(route, args = {})
	{
		this.setState(args, () => { this.state.history.push(`${this.state.root}/${route}`) })
	}

	componentDidMount()
	{
		this.goTo('')
	}

	enable()
	{
		return new Promise((resolve, reject) => {
			if (this.state.ethereum.enable)
			{
				this.state.ethereum.enable().then(resolve).catch(reject)
			}
			else
			{
				resolve()
			}
		})
	}

	buildProvider()
	{
		const provider = new ethers.providers.Web3Provider(this.state.ethereum)
		provider.ready.then(({ chainId, ensAddress }) => {
			try
			{
				const network = this.props.config.networks[chainId]
				this.setState(
					{
						provider,
						network,
						ens:   new ethers.Contract(network.ensAddress || ensAddress, ABI.ens,   provider),
						proxy: new ethers.Contract(network.proxy,                    ABI.proxy, provider.getSigner()),
					},
					() => this.goTo('label')
				)
			}
			catch
			{
				this.setState(
					{
						provider: null,
						network:  null,
						ens:      null,
						proxy:    null,
					},
					() => this.goTo('error', { error: 'Switch to a supported Ethereum network'  })
				)
			}
		})
	}

	connect()
	{
		this.enable()
		.then(() => {
			this.state.ethereum.on('networkChanged', this.buildProvider.bind(this))
			this.buildProvider()
		})
		.catch(() => {
			this.goTo('error', { error: 'Connection refused' })
		})
	}

	getLabel(label)
	{
		this.goTo('address', { label })
	}

	getAddress(address)
	{
		this.goTo('process', { address })
	}

	getProcess(success)
	{
		this.goTo(success ? 'success' : 'failure')
	}

	render()
	{
		return (
			<div className='FIFSRegistration'>
				<h3 className='header'>
					iExec Username Registration
				</h3>
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
							<Route exact path={ `${this.state.root}/`        } render={ (props) => <RouteConnect context={this.state} callback={ this.connect.bind(this)    } {...props}/> } />
							<Route exact path={ `${this.state.root}/error`   } render={ (props) => <RouteError   context={this.state}                                         {...props}/> } />
						</>
				}
				</Router>
			</div>
		)
	}
}

export default FIFSRegistration
