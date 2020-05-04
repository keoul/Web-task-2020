import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ShotDetailed } from './ShotDetailed';

const show = keyframes`
	0%{
		opacity: 0;
	}
	100%{
		opacity: 100%;
	}
`;
const hider = keyframes`
	0%{
		opacity: 100%;
	}
	100%{
		opacity: 0%;
	}
`;

const Container = styled.div`
	.img-container {
		position: relative;
		width: 100%;

		.overlay {
			animation: ${show} 0.3s ease-in;
			position: absolute;
			display: block;
			width: 100%;
			height: 100%;
			min-height: 0px;
			top: 0;
			left: 0;
			box-shadow: inset 0px -50px 40px rgba(0, 0, 0, 0.41);
			border-radius: 10px;
			z-index: 20;
			cursor: pointer;
			color: #fff;
			.overlay-content {
				margin-top: 60%;
				display: flex;
				justify-content: space-between;
				padding: 10px;
				.title {
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 13px;
					width: 50%;
					max-height: 15px;
				}
				max-height: 50px;
				.add,
				.like {
					display: inline-block;
					border-radius: 5px;
					background: #aaa;
					padding: 0 5px;
					:hover {
						background: #ff3dc9;
					}
				}
				.add {
					margin-right: 5px;
				}
			}
			.overlay-icon {
				color: #fff;
			}
		}
		> img {
			border-radius: 10px;
			width: 100%;
			height: 100%;
		}
		.hide {
			display: none;
		}
	}
	.info-container {
		display: flex;
		align-items: center;
		font-size: 15px;
		.user-icon {
			width: 15px;
			display: inline-block;
			margin-right: 5px;
			> img {
				border-radius: 50%;
				width: 100%;
			}
		}

		.user {
			align-self: middle;
		}
		.comments {
			margin-right: 7px;
		}
		.right > span {
			color: #ccc;
		}
		justify-content: space-between;
	}
	.hide {
		display: none;
	}
`;
class ShotCard extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const target = document.querySelector('.card' + this.props.id);
		target.addEventListener('mouseenter', this.handleMouseEnter);
		target.addEventListener('mouseleave', this.handleMouseLeave);
	}
	handleMouseEnter = (event) => {
		document.querySelector('.id' + this.props.id).classList.remove('hide');
	};
	handleMouseLeave = (event) => {
		document.querySelector('.id' + this.props.id).classList.add('hide');
	};
	handleEscapePress = (e) => {
		e.preventDefault();

		if (e.keyCode === 27) {
			document
				.querySelector('.descId' + this.props.id)
				.classList.add('hide');
			window.removeEventListener('click', this.handleClickOutside);
			window.removeEventListener('keyup', this.handleEscapePress, false);
		}
	};

	handleClickOutside = (e) => {
		if (e.target.className === 'wrapper') {
			document
				.querySelector('.descId' + this.props.id)
				.classList.add('hide');
			window.removeEventListener('click', this.handleClickOutside);
			window.removeEventListener('keyup', this.handleEscapePress);
		}
	};
	openDescription = () => {
		document
			.querySelector('.descId' + this.props.id)
			.classList.remove('hide');
		window.addEventListener('keyup', this.handleEscapePress, false);
		window.addEventListener('click', this.handleClickOutside);
	};
	render() {
		const {
			title,
			published_at,
			id,
			is_rebound,
			rebounds_count,
			attachments_count,
			views_count,
			comments_count,
			likes_count,
			liked,
			image_link,
			desc,
			avatar,
			username,
		} = this.props;
		return (
			<Container>
				<div
					className={'img-container card' + id}
					onClick={(e) => {
						this.openDescription();
					}}>
					<div className={'overlay hide id' + id}>
						<div className='overlay-content'>
							<div className='title'>{title}</div>
							<span>
								<div className='add'>
									<span className='overlay-icon'>
										<i class='fas fa-folder-plus'></i>
									</span>
								</div>
								<div className='like'>
									<span className='overlay-icon'>
										<i class='fas fa-heart'></i>
									</span>
								</div>
							</span>
						</div>
					</div>
					<img src={image_link} alt='mig' />
				</div>
				<div className='info-container'>
					<div className='left'>
						<span className='user-icon'>
							<img src={avatar} alt='logo' />
						</span>
						<span className='user'>{username}</span>
					</div>
					<div className='right'>
						<span className='comments'>
							<span
								style={{
									color: '#ccc',
								}}>
								<i class='fas fa-comment'></i>
							</span>
							{comments_count}
						</span>
						<span className='likes'>
							<span
								style={{
									color: liked ? '#ff3dc9' : '#ccc',
								}}>
								<i class='fas fa-heart'></i>
							</span>
							{likes_count}
						</span>
					</div>
				</div>
				<ShotDetailed
					title={title}
					published_at={published_at}
					id={id}
					is_rebound={is_rebound}
					rebounds_count={rebounds_count}
					attachments_count={attachments_count}
					views_count={views_count}
					comments_count={comments_count}
					likes_count={likes_count}
					liked={liked}
					image_link={image_link}
					desc={desc}
					avatar={avatar}
					author='UIXNinjs'
				/>
			</Container>
		);
	}
}

export { ShotCard };
