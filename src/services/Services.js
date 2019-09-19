import React from "react";
import { ethers } from 'ethers';

import Context from '../context';
import CONFIG  from '../config/config'
import ENS     from '@ensdomains/ens/build/contracts/ENS.json'
import REGPROX from '../contracts/RegistrationProxy.json'

class Services extends React.Component
{
	state = {
		config:   CONFIG,
		provider: null,
		ens:      null,
		regprox:  null,
		ready:    false,
	}

	getWeb3()
	{
		return new Promise((resolve, reject) => {
			if (window.ethereum)
			{
				resolve(window.ethereum);
			}
			else
			{
				reject();
			}
		})
	}

	componentDidMount()
	{
		this.getWeb3()
		.then(async web3 => {
			await web3.enable()
			const provider = new ethers.providers.Web3Provider(web3);
			const ens      = new ethers.Contract('0x314159265dd8dbb310642f98f50c066173c1259b', ENS.abi, provider);
			const regprox  = new ethers.Contract(CONFIG.registration.proxy, REGPROX.abi, provider.getSigner());
			this.setState({ provider, ens, regprox, ready: true })
		})
		.catch(() => {
			alert('No web3 provider available')
		})
	}

	render()
	{
		return (
			<Context.Provider value={this.state}>
				{ this.state.ready && this.props.children }
			</Context.Provider>
		);
	};
}

export default Services;
