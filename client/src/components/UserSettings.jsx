import * as React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Spinner } from './Spinner';

const size = {
	tablet: '1380px',
	phone: '500px',
	miniphone: '400px',
	midios: '850px',
	smallios: '450px',
};

const device = {
	tablet: `(max-width: ${size.tablet})`,
	phone: `(max-width: ${size.phone})`,
	miniphone: `(max-width: ${size.miniphone})`,
	phoneup: `(min-width: ${size.phone})`,
	landphoneheight: `(max-height:${size.phone}) and (max-width:900px)`,
	midios: `(max-height: ${size.midios})`,
	smallios: `(max-height: ${size.smallios})`,
};

const Container = styled.div`
	z-index: 2000000 !important;
	position: absolute;
	width: 100vw;
	background-color: rgba(0, 0, 0, 0.2);
	.show {
		display: block;
	}
	.hide {
		display: none;
	}
	.initial {
		display: none;
	}
	.wrapper {
		height: 100vh;
		width: 100vw;
	}
	.arrow-up {
		width: 0;
		height: 0;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-bottom: 10px solid white;
		position: absolute;
		right: 30px;
		top: 70px;
	}
`;

const UserContainer = styled.div`
	box-shadow: 0px 13px 20px rgba(0, 0, 0, 0.1);
	position: absolute;
	top: 80px;
	right: 30px;
	width: 250px;
	max-height: 80vh;
	background: white;
	border-radius: 10px;
	text-align: center;

	button {
		all: unset;
		color: #fff;
		width: 50%;
		height: 20px;
		background: #ff3dc9;
		padding: 10px 0;
		border-radius: 12px;
		cursor: pointer;
		font-size: 13px;
		margin: 20px 0;
	}
	.bio {
		width: 80%;
		font-size: 12px;
		margin-left: 20px;
		margin-top: 10px;
		.title {
			width: fit-content;
			> span {
				margin-left: 5px;
			}
			:hover {
				text-decoration: underline;
				cursor: pointer;
			}
			margin-bottom: 5px;
		}
		.box {
			border: 1px solid #ccc;
			border-radius: 5px;
			padding: 5px;
		}
		> div {
			text-align: left;
		}
	}
	.header {
		margin-top: 20px;
	}
	.new-bio {
		text-align: left;
		margin: 20px auto 0;
		width: 90%;

		height: fit-content;
		> input {
			width: 100%;
		}
	}
	.submit {
		all: unset;
		display: block;
		font-size: 13px;
		color: #000;
		border: 1px solid #444;
		border-radius: 5px;
		padding: 5px;
	}
`;

const UserInfo = styled.div``;

class UserSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			windowWidth: 0,
			bio: 'Available',
		};
	}

	onClose = () => {
		const { rootTree } = this.props;
		if (!rootTree) return null;
		rootTree.pageStatus.usersettingsClicked();
		rootTree.userStore.subscriber();
		window.removeEventListener('keyup', this.handleEscapePress);
	};
	changeBio = (e) => {
		this.setState({ bio: e.target.value });
	};
	handleSubmit = (e) => {
		e.preventDefault();
	};

	closeSettings = (e) => {
		e.preventDefault();
		this.props.rootTree.pageStatus.usersettingsClicked();
		window.removeEventListener('click', this.handleClickOutside);
		window.removeEventListener('keyup', this.handleEscapePress, false);
	};

	handleEscapePress = (e) => {
		e.preventDefault();
		if (e.keyCode === 27) {
			this.props.rootTree.pageStatus.usersettingsClicked();
			window.removeEventListener('click', this.handleClickOutside);
			window.removeEventListener('keyup', this.handleEscapePress, false);
		}
	};

	handleClickOutside = (e) => {
		if (e.target.className === 'wrapper') {
			this.props.rootTree.pageStatus.usersettingsClicked();
			window.removeEventListener('click', this.handleClickOutside);
			window.removeEventListener('keyup', this.handleEscapePress);
		}
	};

	componentDidUpdate() {
		if (this.props.rootTree.pageStatus.userSettingsClick) {
			window.addEventListener('keyup', this.handleEscapePress, false);
			window.addEventListener('click', this.handleClickOutside);
		}
	}

	render() {
		const { rootTree } = this.props;
		if (!rootTree) return null;
		var windowWidth = window.innerWidth;
		return (
			<Container
				style={{
					display:
						rootTree.pageStatus.usersettingsClickStatus() ===
						'initial'
							? 'none'
							: rootTree.pageStatus.usersettingsClickStatus() ===
							  'show'
							? 'block'
							: 'none',
				}}>
				<div className='arrow-up'></div>
				<div className='wrapper'>
					<UserContainer>
						<div className='header'>Hello, User</div>
						{rootTree.pageStatus.editBioStatus() ? (
							<div className='new-bio'>
								<textarea
									type='text'
									placeholder='Enter new bio'
									value={this.state.bio}
									onChange={this.changeBio}
								/>
								<button
									className='submit'
									onClick={(e) => {
										rootTree.pageStatus.editBioClicked();
										// this.handleSubmit();
									}}>
									Submit
								</button>
							</div>
						) : (
							<div className='bio'>
								<div
									className='title'
									onClick={(e) => {
										rootTree.pageStatus.editBioClicked();
									}}>
									Bio
									<span>
										<i class='fas fa-pencil-alt'></i>
									</span>
								</div>
								<div className='box'>{this.state.bio}</div>
							</div>
						)}
						<button
							onClick={(e) => {
								rootTree.authStore.logout();
							}}>
							LOGOUT
						</button>
					</UserContainer>
				</div>
			</Container>
		);
	}
}
UserSettings = inject('rootTree')(observer(UserSettings));
export { UserSettings };
