import React from 'react'

class RouteError extends React.Component
{
	render()
	{
		return (
			<div>RouteError: { this.props.context.error }</div>
		)
	}
}

export default RouteError
