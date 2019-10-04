import React from 'react'

class RouteError extends React.Component
{
	render()
	{
		return (
			<p>
				<h4>
					Oops.
				</h4>
				{ this.props.context.error }
			</p>
		)
	}
}

export default RouteError
