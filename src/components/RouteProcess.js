import React from 'react'
import { ethers } from 'ethers'

import Loading from './Loading'

class RouteProcess extends React.Component
{
	state = { done: false }

	componentDidMount()
	{
		this.props.context.proxy.registerENS(
			this.props.context.ens.address,
			this.props.context.config.resolver,
			ethers.utils.namehash(this.props.context.config.domain),
			ethers.utils.solidityKeccak256(['string'], [this.props.context.label]),
			this.props.context.address,
		)
		.then(() => this.props.callback(true))
		.catch(() => this.props.callback(false))
	}

	componentWillUnmount()
	{
	}

	render()
	{
		return (
			<Loading/>
		)
	}
}

export default RouteProcess
