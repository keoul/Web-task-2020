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
	}));

export { shotsStore };
