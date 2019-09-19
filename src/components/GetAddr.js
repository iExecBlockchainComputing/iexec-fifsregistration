import React from 'react';

import {
	MDBBtn,
	MDBInputGroup,
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
} from 'mdbreact';

import { ethers } from 'ethers'

import Scanner from './Scanner';

const ADDR = /0x[0-9a-zA-Z]{40}/

class GetAddr extends React.Component
{
	state = { addr: "" }

	resolveAddress(addr)
	{
		return new Promise((resolve, reject) => {
			try
			{
				resolve(ethers.utils.getAddress(ADDR.exec(addr)[0]))
			}
			catch
			{
				this.props.context.provider.resolveName(addr)
				.then(addr => { addr ? resolve(addr) : reject() })
				.catch(reject)
			}
		})
	}

	process(addr)
	{
		if (addr)
		{
			this.resolveAddress(addr)
			.then(address => {
				this.props.history.push(`/iexec-fifsregistration/${this.props.match.params.label}/${address}`)
			})
			.catch(() => {
				console.error(`'${addr}' is not an ethereum address`)
			})
		}
	}

	submit(event)
	{
		event.preventDefault()
		this.process(this.state.addr)
	}

	handleChange(ev)
	{
		this.setState({ addr: ev.target.value })
	}

	render()
	{
		return (
			<MDBContainer id="getAddr">
				<MDBRow center>
					<MDBCol>
						<MDBCard className='z-depth-5'>
							<Scanner callback={ this.process.bind(this) }/>
							<MDBCardBody>
								<form onSubmit={ this.submit.bind(this) }>
									<MDBInputGroup
										material
										hint='Your ethereum address'
										onChange={ this.handleChange.bind(this) }
										append={ <MDBBtn type='submit' color='dark'>Go</MDBBtn> }
									/>
								</form>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		);
	}
}

export default GetAddr;
