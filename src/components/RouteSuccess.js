import React from 'react'

class RouteSuccess extends React.Component
{
	render()
	{
		return (
			<p>
				<h4>
					Success!
				</h4>
				You can now manage your ENS Name <a target='_blank' rel='noopener noreferrer' href={
					[
						'https://app.ens.domains/name/',
						this.props.context.label,
						'.',
						this.props.context.network.domain
					].join('')
				}>
					here
				</a>
			</p>
		)
	}
}

export default RouteSuccess
