import React from "react";
import { ethers } from 'ethers';

import Context    from '../context';

import ENS  from '@ensdomains/ens/build/contracts/ENS.json'
import FIFS from '@ensdomains/ens/build/contracts/FIFSRegistrar.json'
import CONFIG from '../config/config'

class Services extends React.Component
{
	state = {
		config:     CONFIG,
		provider: null,
		ens:      null,
		fifs:     null,
		ready:    false,
	}

	async componentDidMount()
	{
		await window.ethereum.enable();
		const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
		const ens      = new ethers.Contract('0x314159265dd8dbb310642f98f50c066173c1259b', ENS.abi, provider);
		const owner    = await ens.owner(ethers.utils.namehash(CONFIG.domain))
		const fifs     = new ethers.Contract(owner, FIFS.abi, provider.getSigner());
		this.setState({ provider, ens, fifs, ready: true })
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
