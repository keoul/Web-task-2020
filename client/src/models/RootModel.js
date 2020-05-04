import { types, Instance } from 'mobx-state-tree';
import { authStore } from './Auth';
import { pageStatus } from './PageStatus';
import { shotsStore } from './ShotsModel';

const RootModel = types
	.model('Root', {
		authStore: authStore,
		pageStatus: pageStatus,
		shotsStore: shotsStore,
	})
	.actions((self) => {
		return {};
	});

export { RootModel };
