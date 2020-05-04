import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100%;
	z-index: 20000;
	overflow-y: hidden;
	overflow-y: scroll;
	background-color: rgba(0, 0, 0, 0.5);
	.wrapper {
		height: fit-content;
		width: 100%;
	}

	.cross {
		position: absolute;
		right: 30px;
		top: 30px;
		cursor: pointer;
	}
`;
const InfoContainer = styled.div`
	width: 60%;
	max-width: 840px;
	margin: 100px auto;
	background-color: #fff;
	padding: 30px;
	border-radius: 10px;
	.header {
		display: grid;
		grid-template-columns: 1fr 8fr 1.2fr 1.2fr;
		grid-column-gap: 10px;
		margin-bottom: 30px;
		> img {
			border-radius: 50%;
			height: 100%;
		}
		.align {
			text-align: left;
			.title {
				font-weight: bold;
				font-size: 18px;
			}
			span {
				font-size: 15px;
				.author {
					color: #ff3548;
					cursor: pointer;
				}
			}
		}
		.button {
			text-align: center;
			font-size: 14px;
			box-sizing: border-box;
			align-self: center;
			background-color: #ccc;
			border-radius: 5px;
			padding: 10px;
			height: 70%;
			> span {
				align-self: center;
			}
		}
	}
	.shot-thumbnail {
		width: 100%;
		border-radius: 10px;
	}
	.grid-wrap {
		margin-top: 20px;
		display: grid;
		grid-template-columns: 4fr 2fr;
		grid-gap: 50px;
		font-size: 14px;
		.left {
			.count {
				font-weight: 600;
			}
		}
		.right {
			text-align: left;
			.head {
				font-weight: bold;
				margin-bottom: 10px;
			}
			.subhead {
				margin-bottom: 10px;
				color: #888;
			}
			button {
				all: unset;
				text-align: center;
				color: #fff;
				width: 90%;
				height: 40px;
				background: #ff3dc9;
				border-radius: 12px;
				cursor: pointer;
			}
			.shot-info {
				color: #888;
				margin-top: 20px;
				> div {
					margin-bottom: 20px;
				}
			}
		}
	}
`;
class ShotDetailed extends Component {
	constructor(props) {
		super(props);
	}

	closeSettings = (e) => {
		e.preventDefault();
		document.querySelector('.descId' + this.props.id).classList.add('hide');
		window.removeEventListener('click', this.handleClickOutside);
		window.removeEventListener('keyup', this.handleEscapePress, false);
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
			author,
		} = this.props;
		return (
			<Container className={'hide descId' + this.props.id}>
				<div className='wrapper'>
					<span className='cross' onClick={this.closeSettings}>
						<svg
							width='20'
							height='20'
							viewBox='0 0 20 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<g clipPath='url(#clip6)'>
								<path
									d='M1.59668 1.59668L18.403 18.4029'
									stroke='#fff'
									strokeWidth='5'
									strokeMiterlimit='10'
								/>
								<path
									d='M18.4039 1.59668L1.59766 18.403'
									stroke='#fff'
									strokeWidth='5'
									strokeMiterlimit='10'
								/>
							</g>
							<defs>
								<clipPath id='clip6'>
									<path d='M0 0H20V20H0V0Z' fill='white' />
								</clipPath>
							</defs>
						</svg>
					</span>
					<InfoContainer>
						<div className='header'>
							<img src={avatar} alt='avatar' />
							<div className='align'>
								<div className='title'>{title}</div>
								<div>
									<span>
										by{' '}
										<span className='author'>
											{author + ' '}
										</span>
										|{' '}
										<span className='author'> Follow</span>
									</span>
								</div>
							</div>
							<div className='button'>
								<span>Save</span>
							</div>
							<div className='button'>
								<span>
									<i class='fas fa-heart'></i> Like
								</span>
							</div>
						</div>
						<img
							src={image_link}
							alt='shot thumbnail'
							className='shot-thumbnail'
						/>
						<br></br>
						<hr></hr>
						<div className='grid-wrap'>
							<div className='left'>
								<div className='desc'>{desc}</div>
								<hr></hr>
								<div className='comments'>
									<div className='count'>
										{comments_count} Responses
									</div>
								</div>
							</div>
							<div className='right'>
								<div className='hire-box'>
									<div className='head'>
										Like what you see?
									</div>
									<div className='subhead'>
										This user is available for hire.
									</div>
									<button>
										<i class='fas fa-envelope'></i> Hire Me
									</button>
								</div>
								<hr />
								<div className='shot-info'>
									<div>
										<i class='fas fa-heart'></i>
										{'   '}
										{likes_count} Likes
									</div>
									<div>
										<i class='fas fa-calendar'></i>
										{'   '}
										{published_at}
									</div>
								</div>
							</div>
						</div>
					</InfoContainer>
				</div>
			</Container>
		);
	}
}

export { ShotDetailed };
