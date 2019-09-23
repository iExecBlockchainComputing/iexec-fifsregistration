import React from 'react'
import { ethers } from 'ethers'

class RouteLabel extends React.Component
{
	state = { label: "", valid: false }

	componentDidMount()
	{
	}

	componentWillUnmount()
	{
	}

	checkValidity(label)
	{
		return new Promise((resolve, reject) => {
			if (label.includes('.'))
			{
				reject()
			}
			else
			{
				const name = `${label}.${this.props.context.network.domain}`
				const node = ethers.utils.namehash(name)
				this.props.context.ens.owner(node)
				.then(owner => {
					(owner === ethers.constants.AddressZero) ? resolve(label) : reject()
				})
			}
		})
	}

	submit(event)
	{
		event.preventDefault()
		this.checkValidity(this.state.label)
		.then(this.props.callback)
		.catch(() => console.error('invalid label'))
	}

	handleChange(ev)
	{
		this.setState({ label: ev.target.value })
		this.checkValidity(ev.target.value)
		.then (() => { this.setState({ valid: true  }) })
		.catch(() => { this.setState({ valid: false }) })
	}

	render()
	{
		return (
			<form onSubmit={ this.submit.bind(this) } className={ this.state.valid ? 'valid' : '' }>
				<div className='inputgroup'>
					<input
						className='align-right'
						placeholder='username'
						onChange={ this.handleChange.bind(this) }
					/>
					<span className='input-append'>
						{ this.props.context.network.domain }
					</span>
				</div>
				<button type='submit'>
					Claim
				</button>
			</form>
		)
	}
}

export default RouteLabel
