import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div``;
class Spinner extends Component {
	render() {
		return (
			<Container>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='50px'
					height='50px'
					viewBox='0 0 100 100'
					preserveAspectRatio='xMidYMid'
					className={this.props.blue ? 'blueColor' : ''}>
					<circle
						cx='50'
						cy='50'
						fill='none'
						stroke='#ffffff'
						strokeWidth='10'
						r='35'
						strokeDasharray='164.93361431346415 56.97787143782138'
						transform='rotate(197.7 50 50)'>
						<animateTransform
							attributeName='transform'
							type='rotate'
							repeatCount='indefinite'
							dur='1s'
							values='0 50 50;360 50 50'
							keyTimes='0;1'></animateTransform>
					</circle>
				</svg>
			</Container>
		);
	}
}

export { Spinner };
