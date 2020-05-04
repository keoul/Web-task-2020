import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { UserSettings } from './UserSettings';
const Container = styled.div`
	width: 100%;
	background: #fff;
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	.header {
		font-weight: 600;
		font-size: 32px;
		color: #ff3dc9;
		font-family: 'Leckerli One';
	}
	border-bottom: 1px solid #ddd;
	.avatar {
		color: #888;
	}
`;

class Header extends React.Component {
	render() {
		return (
			<Container>
				<div className='header'>Studios</div>
				<div
					onClick={(e) => {
						this.props.rootTree.pageStatus.usersettingsClicked();
					}}
					className='avatar'>
					<i class='fas fa-user-circle fa-2x'></i>
				</div>
			</Container>
		);
	}
}
Header = inject('rootTree')(observer(Header));
export { Header };
