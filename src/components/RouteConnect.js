import React from 'react'

class RouteConnect extends React.Component
{
	submit(event)
	{
		event.preventDefault()
		this.props.callback()
	}

	render()
	{
		return (
			<form onSubmit={ this.submit.bind(this) } className='valid'>
				<button type='submit'>
					Connect to start
				</button>
			</form>
		)
	}
}

export default RouteConnect
