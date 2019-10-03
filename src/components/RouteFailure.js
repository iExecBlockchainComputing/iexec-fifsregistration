import React from 'react'

class RouteFailure extends React.Component
{
	render()
	{
		return (
			<div class="notification">
				<p>
					<h4>
						Something went wrong.
					</h4>
					Check your wallet provider for additional information.
				</p>
			</div>
		)
	}
}

export default RouteFailure
