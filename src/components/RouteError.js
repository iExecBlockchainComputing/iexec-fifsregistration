import React from 'react'

class RouteError extends React.Component
{
	render()
	{
		return (
			<div class="notification">Oops: { this.props.context.error }</div>
		)
	}
}

export default RouteError
