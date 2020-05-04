import { types, Instance } from 'mobx-state-tree';
const pageStatus = types
	.model('PageStatus', {
		pageLoadUserSettings: true,
		userSettingsClick: false,
		editBio: false,
	})
	.views((self) => ({
		usersettingsClickStatus() {
			return self.pageLoadUserSettings
				? 'initial'
				: self.userSettingsClick
				? 'show'
				: 'hide';
		},
		editBioStatus() {
			return self.editBio;
		},
	}))
	.actions((self) => ({
		usersettingsClicked() {
			if (self.pageLoadUserSettings) {
				self.pageLoadUserSettings = false;
			}
			self.userSettingsClick = !self.userSettingsClick;
		},
		editBioClicked() {
			if (self.pageLoadUserSettings) {
				self.pageLoadUserSettings = false;
			}
			self.editBio = !self.editBio;
		},
	}));

export { pageStatus };
