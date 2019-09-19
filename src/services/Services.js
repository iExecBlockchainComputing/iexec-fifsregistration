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

	async componentDidMount()
	{
		await window.ethereum.enable();
		const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
		const ens      = new ethers.Contract('0x314159265dd8dbb310642f98f50c066173c1259b', ENS.abi, provider);
		const regprox  = new ethers.Contract(CONFIG.registration.proxy, REGPROX.abi, provider.getSigner());
		this.setState({ provider, ens, regprox, ready: true })
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
