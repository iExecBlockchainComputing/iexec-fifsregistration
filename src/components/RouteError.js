import React from 'react'

class RouteError extends React.Component
{
	render()
	{
		return (
			<div class="notification">
				<p>
					<h4>
						Oops.
					</h4>
					{ this.props.context.error }
				</p>
			</div>
		)
	}
}

export default RouteError
