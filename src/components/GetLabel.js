import React from 'react';

import {
	MDBBtn,
	MDBInputGroup,
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
} from 'mdbreact';

import { ethers } from 'ethers'
import iExecLogoHorizontal from '../assets/iExec-logo-horizontal-white.svg';

class GetLabel extends React.Component
{
	state = { label: "", valid: false }

	checkAvailability(label)
	{
		return new Promise((resolve, reject) => {
			if (label.includes('.'))
			{
				reject()
			}
			else
			{
				const name = `${label}.${this.props.context.config.domain}`
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
		this.checkAvailability(this.state.label)
		.then((label) => {
			this.props.history.push(`/${label}`)
		})
		.catch(() => console.error('invalid label'))
	}

	handleChange(ev)
	{
		this.setState({ label: ev.target.value })
		this.checkAvailability(ev.target.value)
		.then (() => { this.setState({ valid: true  }) })
		.catch(() => { this.setState({ valid: false }) })
	}

	render()
	{
		return (
			<MDBContainer id="getLabel" className={ this.state.valid ? 'valid' : ''}>
				<MDBRow center>
					<MDBCol>
						<MDBCard className='z-depth-5'>
							<MDBCardImage className='img-fluid rounded-top black' src={iExecLogoHorizontal}/>
							<MDBCardBody>
								<form onSubmit={ this.submit.bind(this) }>
									<MDBInputGroup
										material
										hint='username'
										onChange={ this.handleChange.bind(this) }
										append={ `.${this.props.context.config.domain}` }
									/>
									<MDBBtn type='submit' color='dark'>Claim</MDBBtn>
								</form>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		);
	}
}

export default GetLabel;
