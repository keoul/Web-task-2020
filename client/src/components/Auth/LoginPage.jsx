import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { IECSElogologin } from '../IECSELogo.login';
import { Spinner } from '../Spinner';

const size = {
	mobileS: '375px',
	mobileM: '425px',
	mobileL: '768px',
	tablet: '1024px',
	laptop: '1440px',
	laptopL: '1560px',
};

const device = {
	mobileS: `(max-width: ${size.mobileS})`,
	mobileM: `(max-width: ${size.mobileM})`,
	mobileL: `(max-width: ${size.mobileL})`,
	tablet: `(max-width: ${size.tablet})`,
	laptop: `(max-width: ${size.laptop})`,
	laptopL: `(max-width: ${size.laptopL})`,
	desktop: `(max-width: ${size.desktop})`,
	desktopL: `(max-width: ${size.desktop})`,
};

const Container = styled.div`
	position: relative;
	width: 100vw;
	height: 100vh;
`;

const LoginBox = styled.div`
	width: 40%;
	height: 60%;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	margin: auto;
	text-align: center;
	box-shadow: 1px 4px 17px rgba(0, 0, 0, 0.11);
	border-radius: 10px;
	box-sizing: border-box;
	padding: 30px 25px;
	.header {
		font-weight: 600;
		font-size: 32px;
		color: #ff3dc9;
		font-family: 'Leckerli One';
	}
	input {
		all: unset;
		display: block;
		width: 90%;
		text-align: left;
		color: #848484;
		padding: 20px;
		font-size: 16px;
		border: 1px solid #c0c0c0;
		box-sizing: border-box;
		border-radius: 5px;
		margin: 30px auto 0;
		:focus {
			color: #1f3458;
		}
	}
	button {
		all: unset;
		color: #fff;
		width: 90%;
		height: 60px;
		background: #ff3dc9;
		border-radius: 12px;
		cursor: pointer;
	}
	.meta {
		min-height: 20px;
		text-align: center;
		margin-top: 10px;
		font-weight: 600;
		margin-bottom: 30px;
		color: #ff0800;
	}
	@media ${device.mobileS}, ${device.tablet} {
		width: 100vw;
		min-height: 100vh;
		overflow-y: scroll;
		padding-top: 100px;
		.subheading {
			font-size: 22px;
		}

		input {
			font-size: 14px;
		}

		button {
			height: 50px;
			font-size: 14px;
		}
	}
`;
class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
	}
	handleEmail = (event) => {
		this.props.rootTree.authStore.setMeta('');
		this.setState({ email: event.target.value });
	};
	handlePassword = (event) => {
		this.props.rootTree.authStore.setMeta('');
		this.setState({ password: event.target.value });
	};
	handleSubmit = (event) => {
		event.preventDefault();
		this.props.rootTree.authStore.login(
			this.state.email,
			this.state.password
		);
	};
	render() {
		const { rootTree } = this.props;
		if (rootTree.authStore.LoggedInStatus) {
			return <Redirect to='/' />;
		}
		return (
			<Container>
				<IECSElogologin />
				<LoginBox>
					<div className='header'>Studios</div>
					<div className='subhead'>
						A platform for designers to showcase their talent
					</div>
					<input
						type='email'
						placeholder='Enter emailId'
						onChange={this.handleEmail}
					/>
					<input
						type='password'
						placeholder='Enter password'
						onChange={this.handlePassword}
					/>
					<div className='meta'>{rootTree.authStore.getMeta}</div>
					<button onClick={this.handleSubmit}>
						{rootTree.authStore.progress ? <Spinner /> : 'Login'}
					</button>
				</LoginBox>
			</Container>
		);
	}
}
LoginPage = inject('rootTree')(observer(LoginPage));
export { LoginPage };
