import { RootModel } from './RootModel';
import { authStore } from './Auth';
import { shotsStore } from './ShotsModel';
//here you give the default value for your models
export const setupRootStore = () => {
	const authTree = authStore.create({
		isLoggedIn: true,
		inProgress: false,
		meta: '',
	});
	const shotsTree = shotsStore.create({
		shots: [],
		fetching: false,
	});
	const rootTree = RootModel.create({
		authStore: authTree,
		pageStatus: {
			pageLoadUserSettings: false,
			userSettingsClick: false,
			editBio: false,
		},
		shotsStore: shotsTree,
	});

	return { rootTree };
};
