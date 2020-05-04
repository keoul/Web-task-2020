import { types, Instance } from 'mobx-state-tree';
import { authStore } from './Auth';
const RootModel = types
    .model('Root', {
        authStore: authStore,
    })
    .actions(self => {

        return {

        };
    });

export { RootModel };
