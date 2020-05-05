import { types, Instance } from 'mobx-state-tree';

const shotModel = types.model('Shot', {
	id: types.number,
	title: types.string,
	view_count: types.number,
	comments_count: types.number,
	likes_count: types.number,
	liked: types.boolean,
	username: types.string,
	image_link: types.string,
	avatar: types.string,
	following: types.boolean,
	desc: types.string,
	published_at: types.string,
});

const shotsStore = types
	.model('shotModel', {
		shots: types.array(shotModel),
		fetching: false,
	})
	.views((self) => ({
		get getAllShots() {
			return self.shots;
		},
	}))
	.actions((self) => ({
		loadShotsData() {
			self.fetching = true;
			fetch('/getAllShots')
				.then((res) => res.json())
				.then((data) => this.setShotsData(data));
		},
		setShotsData(val) {
			self.shots = val;
		},
		follow(id) {
			fetch('/follow/' + id, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.msg === 'Following updated successfully!') {
						self.setFollowing(id);
					}
				});
		},
		setFollowing(id) {
			self.shots = self.shots.map((shot) => {
				if (shot.id === id) {
					shot.following = !shot.following;
				}
				return shot;
			});
		},
		likeShot(id) {
			fetch('/like/' + id, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.msg === 'Likes updated successfully!') {
						self.setLiked(id);
					}
				});
		},
		setLiked(id) {
			self.shots = self.shots.map((shot) => {
				if (shot.id === id) {
					shot.liked = !shot.liked;
					if (shot.liked) {
						self.likes_count++;
					} else {
						self.likes_count--;
					}
				}
				return shot;
			});
		},
	}));

export { shotsStore };
