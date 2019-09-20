import React from 'react';
import { ethers } from 'ethers'

class Process extends React.Component
{
	state = { done: false }

	componentDidMount()
	{
		this.props.context.proxy.registerENS(
			this.props.context.ens.address,
			this.props.context.config.resolver,
			ethers.utils.namehash(this.props.context.config.domain),
			ethers.utils.solidityKeccak256(['string'], [this.props.match.params.label]),
			this.props.match.params.addr,
		)
		.then(() => {
			this.setState({ done: true })
		})
		.catch(console.error)
	}

	componentWillUnmount()
	{
	}

	render()
	{
		return (
			this.state.done
			?
				<div className='success'/>
			:
				<div className='loading'/>
		);
	}
}
// <a href={ `https://manager.ens.domains/name/${this.props.match.params.label}.${this.props.context.config.domain}` }/>

export default Process;
