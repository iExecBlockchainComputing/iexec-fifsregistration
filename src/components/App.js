import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Services from '../services/Services';
import Context  from '../context';

import GetLabel from './GetLabel';
import GetAddr  from './GetAddr';
import Process  from './Process';

class App extends React.Component
{
	render()
	{
		return (
			<Services>
				<Context.Consumer>
					{
						context =>
							<Router>
								<Route exact path='/iexec-fifsregistration/'             render={ (props) => <GetLabel context={context} {...props}/> }/>
								<Route exact path='/iexec-fifsregistration/:label'       render={ (props) => <GetAddr  context={context} {...props}/> }/>
								<Route exact path='/iexec-fifsregistration/:label/:addr' render={ (props) => <Process  context={context} {...props}/> }/>
							</Router>
					}
				</Context.Consumer>
			</Services>
		);
	}
}

export default App;
