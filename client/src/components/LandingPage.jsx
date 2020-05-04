import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router';
import { Header } from './Header';
import styled from 'styled-components';
import { ShotCard } from './ShotCard';
import { UserSettings } from './UserSettings';
const Container = styled.div`
	position: relative;
	max-width: 100vw;
	min-height: 100vh;
	overflow-x: hidden;
	margin: 0;
	margin-bottom: 30px;
	padding: 0;
	.shots {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-column-gap: 20px;
		grid-row-gap: 30px;
		padding: 0 30px;
		margin-bottom: 30px;
	}
	ul {
		display: flex;
		color: #6e6d7a;
		font-size: 15px;
		justify-content: space-between;
		width: fit-content;
		margin: 10px auto;
		> li {
			padding: 10px 12px;
			list-style-type: none;
			cursor: pointer;
		}
		.active {
			background-color: #ccc;
			border-radius: 5px;
		}
	}
`;
class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 'All',
		};
	}
	componentDidMount() {
		this.props.rootTree.shotsStore.loadShotsData();
	}
	handleClick = (e) => {
		this.setState({ active: e });
	};
	render() {
		const navOptions = [
			'All',
			'Animations',
			'Branding',
			'Illustrations',
			'Mobile',
			'Print',
			'ProductDesign',
			'Typography',
			'Web Design',
		];
		const { rootTree } = this.props;
		if (!rootTree.authStore.LoggedInStatus) {
			return <Redirect to='/login' />;
		}
		return (
			<Container>
				<UserSettings />
				<Header />
				<div>
					<ul>
						{navOptions.map((option, i) => {
							return (
								<li
									key={i}
									className={
										option === this.state.active
											? 'active'
											: ''
									}
									onClick={(e) => {
										this.handleClick(option);
									}}>
									{option}
								</li>
							);
						})}
					</ul>
				</div>
				<div className='shots'>
					{this.props.rootTree.shotsStore.getAllShots.map((shot) => {
						console.log(shot);
						return <ShotCard {...shot} />;
					})}
				</div>
			</Container>
		);
	}
}

LandingPage = inject('rootTree')(observer(LandingPage));
export { LandingPage };
