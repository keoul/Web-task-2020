import { RootModel } from './RootModel';
import { authStore } from './Auth'
//here you give the default value for your models
export const setupRootStore = () => {
    const authTree = authStore.create({
        isLoggedIn: false,
        inProgress: false,
        meta: '',
    });


    const rootTree = RootModel.create({
        authStore: authTree,
    });

    return { rootTree };
};
