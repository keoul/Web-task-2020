import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router';

class LandingPage extends Component {
	render() {
		const { rootTree } = this.props;
		if (!rootTree.authStore.LoggedInStatus) {
			return <Redirect to='/login' />;
		}
		return <div>Landing</div>;
	}
}

LandingPage = inject('rootTree')(observer(LandingPage));
export { LandingPage };
