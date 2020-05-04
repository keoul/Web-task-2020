import React from 'react';
import { Switch, Redirect } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider, observer, inject } from 'mobx-react';
import { rootTree } from '../models/RootModel';
import { LoginPage } from '../components/Auth/LoginPage';
import { LandingPage } from '../components/LandingPage';

class RouterComponent extends React.Component {
	loginRequired = (Component) => {
		return this.props.rootTree.authStore.LoggedInStatus ? (
			Component
		) : (
			<Redirect to='/login' />
		);
	};
	render() {
		return (
			<BrowserRouter>
				<Route exact path='/login' component={LoginPage} />
				<Route exact path='/' component={LandingPage} />
			</BrowserRouter>
		);
	}
}

RouterComponent = inject('rootTree')(observer(RouterComponent));
export { RouterComponent };
