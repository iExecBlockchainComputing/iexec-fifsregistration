import React from 'react';

import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardImage,
	MDBCardBody,
} from 'mdbreact';

import { ethers } from 'ethers'

import Loading from './Loading';

class Process extends React.Component
{
	state = { done: false }

	componentDidMount()
	{
		this.props.context.fifs.register(
			ethers.utils.solidityKeccak256(['string'], [this.props.match.params.label]),
			this.props.match.params.addr,
		)
		.then(() => {
			this.setState({ done: true })
		})
		.catch(console.error)
	}

	render()
	{
		return (
			this.state.done
			?
				<MDBContainer id="getAddr">
					<MDBRow center>
						<MDBCol>
							<MDBCard className='z-depth-5'>
								<MDBCardImage
									className='black white-text d-flex justify-content-center align-items-center flex-column p-4 rounded-top'
									tag='div'
								>
									<h2>Congratulation</h2>
								</MDBCardImage>
								<MDBCardBody>
									You can know manage your ens name <a href={ `https://manager.ens.domains/name/${this.props.match.params.label}.${this.props.context.config.domain}` }>here</a>
								</MDBCardBody>
							</MDBCard>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
			:
				<Loading/>
		);
	}
}

export default Process;
